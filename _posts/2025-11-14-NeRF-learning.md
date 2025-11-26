---
layout: post
title:  "NeRF Learning"
date:   2025-11-14 20:00:01 +0800
categories: CV NeRF Learning SR
cover: "assets/images/default-cover.jpg"
comments: true
---


## NeRF Learning
#### 2025-11-14, updated on 2025-11-22

### Introduction

笔者将在这篇博客中记录学习NeRF以及NeRF-SR等相关知识（持续更新）的一些笔记，欢迎一起讨论~


### 0.NeRF Basic
NeRF的全称是Neural Radiance Field（神经辐射场），是一种基于神经网络的渲染方法，其主要目标任务是“新视角合成”。
它的核心思想大致可概述为用一个MLP（全连层而非卷积，加上激活层）神经网络去隐式地学习一个静态3D场景，实现复杂场景的任意新视角合成（渲染）。
NeRF使用多视角的数据进行训练，空间中目标位置具有更高的密度和更准确的颜色，促使神经网络预测一个连续性更好的场景模型。
以任意的相机位置+朝向作为输入，经过训练好的神经网络进行体渲染（Volume Rendering），就可以得到任意视角的图片。

![demonstration](/assets/post_images/nerf_1.png)

#### 0.0 图形学基础

给出一个理解角度：NeRF 模型的输出可以看作某条 Ray 上面的一个点, 对这条 Ray 的所有的点做积分, 可以得到相应 Pixel 的 RGB 值。
![Ray](/assets/post_images/nerf_2.png)
具体言之，先用 NeRF 找到箭头与 Volume Data (就是 3D 物体) 的若干个交点, 然后对这些交点做积分 
而这个ray是什么呢？实际上就是我们的“眼睛”或者说相机“发出”（实际是接受）的光


那么我们怎么描述这个射线呢？

除了相机/眼睛的三维位置外，我们还需要两个量来描述相机的视角，即角度：inclination 倾角 和 azimuth 方位角
![5D](/assets/post_images/nerf_3.png)


而这每一条Ray都对应我们最后要渲染出来的一个像素，于是自然有：
如果你最终要生成的图片大小是 $H \times W$，, 那么就有 $H \times W$ 条 Ray 从 相机 (你的眼睛) 射出。



下面对每一条ray进行描述：
 一条 Ray 可以用它的起点 $ v_0 $和终点 $ v_d$ (这个不是真正的终点, 因为理论上 Ray 可以无限延伸) 描述

起点肯定就是相机 (你的眼睛), 
终点就是一个能够指示方向的单位向量

于是ray上任意一点就可表示为
$$P = v_0 + t * v_d $$

其中t是任意的实数,采样点也就是选不同的t


那么渲染具体是怎么实现？


我们尝试看一看理解NeRF的数据集组织：
首先, 我们引入几个概念

全局坐标参考系 (World Coordinate Frame)
相机坐标参考系 (Camera Coordinate Frame)
坐标变换 (Coordinate Transformation)
投影变换 (Projection Transformation)


全局一般就是物理世界的尺度，一般不会变
相机坐标参考系, 是针对相机的某个位置而言的. 对于同一个 3D 物体,可以从不同的角度去拍它, 那么自然一旦相机的位置 (pose) 发生改变, 相机坐标参考系也会变化

那么同一个点在不同的坐标参考系下肯定是表示不同，我们需要通过“坐标变换”来构建一个映射关系
转换可以写成一个数学公式：
$$X_c = R \times (X_w - C_w)$$

R是一个3x3的旋转矩阵, C_w是相机在全局坐标系中的位置, X_w是全局坐标系下的点

![alt text](/assets/post_images/nerf_4.png)



那么我们肯定就是要在数据集里面刻画好这个四维的转换矩阵：
![alt text](/assets/post_images/nerf_4.png)

我们如果称变换前的坐标系叫做 "旧坐标系", 变换后的坐标系叫做 "新坐标系"


对于这个新的四维矩阵，我们还有一个性质必须要说明：
![矩阵中的性质](/assets/post_images/nerf_5.png)
这里面的前三列, 分别表示 新坐标系 (红的是 x 轴, 紫的是 y 轴, 黄的是 z 轴) 在旧坐标系中的方向, 最后一列 (绿色) 是 新坐标系原点在旧坐标系中的位置.



我们先画个示意图简化讨论这个问题：
P（C）是3D物体上的某个点，A是相机的位置，C'是我们希望刻画的2维的image plane上的点

![图6](/assets/post_images/nerf_6.png)


那么我们想要刻画的就是C'（xi,yi）

我们有B'A = focal length，记为f
假设相机参考系：
P：（X,Y,Z）

那么C'的坐标可以表示为：    
$$C'_x = (X/Z)\times f$$
$$C'_y = (Y/Z) \times f$$


```
if not os.path.exists('tiny_nerf_data.npz'):
  !wget http://cseweb.ucsd.edu/~viscomp/projects/LF/papers/ECCV20/nerf/tiny_nerf_data.npz

data = np.load('tiny_nerf_data.npz')
images = data['images']
poses = data['poses']
focal = data['focal']

```
这里可以看到实际代码中数据集的组织
images, 就是从各个角度拍的 2D 图片
poses, 就是代表相机的位置及角度,具体说就是我们刚才说的这个四维变换矩阵
focal, 就是前面讲过的 focal length f

那么再由我们刚才提到的特殊性质，我们自然有最后一列就是 相机位置 (在全局坐标参考系中). 然后第三列就是 相机的角度 (因为第三列是相机坐标系的 z 轴, 而相机都是沿着 z 轴拍摄的)


可视化出相机方向大概就这样：
![alt text](/assets/post_images/nerf_7.png)

最后有了以上的推导，我们就可以刻画出Ray了

我们首先引入第三个参考系：

图片坐标参考系 (Image Plane Coordinate Frame)

首先, 这个图片坐标参考系是二维的, [注意 Image Plane 的左上角的像素位置设为 (0, 0)]

其次, 他其实就是 相机坐标参考系 的退化版, 相当于 相机坐标参考系 去掉了 z 轴.

我们知道, 画一个 Ray 其实很简单, 那就是

1) 找到一个 Image Plane 上的像素点; 
2) 找到 相机 (你的眼睛) 原点; 
3) 把这两个点连线.

假设某个像素点的位置是 (i, j) , 那么他在 相机坐标参考系 中的位置是 (i - width*0.5, j - height*0.5) [因为相机坐标参考系的 z 轴正好穿过 Image Plane 的中点]


那么这个 Ray 的方向就是：

$$((i - width*0.5) / \text{focal_length}, (j - height*0.5) / \text{focal_length}, -1)$$

也是上面图6的α

注意到, 我们刚刚求出来的方向, 是在相机坐标参考系求的, 我们还要把它转到全局坐标参考系中, 那就是直接 ×转换矩阵

而Ray的原点实际上我们也讨论过了，就是转换矩阵的最后一列前三行

```
directions = torch.stack([(i - width * .5) / focal_length,
                            -(j - height * .5) / focal_length,
                            -torch.ones_like(i) 
                           ], dim=-1)  # 在相机坐标参考系中的方向

  
rays_d = torch.sum(directions[..., None, :] * c2w[:3, :3], dim=-1) # 在全局坐标参考系中的方向

  
rays_o = c2w[:3, -1].expand(rays_d.shape)                          # 在全局坐标参考系 中的 相机/Ray 原点
```


有了Ray，下一步就是采样上面的点：
NeRF 的关键在于找到 Ray 和 Volume Data (就是 3D 物体) 之间的交点, 然后对这些交点的（R,G,B,$\sigma$）做积分. 这里的 $\sigma$ 就是这个点的"透明度"）做积分.

没有3D模型的话我们不能直接找到这些点
NeRF 采用的方式是 "试"

先随机的沿着当前 Ray 采样一堆点, 然后我带入到 NeRF 中, 如果某个点的$\alpha = 0 $, 那么说明这个点不是交点, 反之就是.
> 这里感觉还是不太清晰（，为啥α是0啊，欢迎comment

$$ P = v_0 + l * v_d $$
所以我们沿着Ray找点无非是试不同的l

采样方法：
比如均匀采样 (Stratified Sampling), 就是均匀的试不同的l
另外也有一些方法, 比如在均匀采样的基础上加上一些 perturbation（扰动）.

另外, 因为我们肯定是只能采样有限个点, 那么一般会确定一个最大和最小的 near < l < far

像原 NeRF 论文中, near = 2, far = 6.





#### 0.1 原始NeRF 整体架构和做法
有了图形学原理，我们就知道了NeRF是怎么采样和利用、组织数据的，下面看下NeRF的架构和设计

这篇2020的工作实际上在网络结构上非常简单粗暴，就是全连接层
![alt text](/assets/post_images/nerf_8.png)


![alt text](/assets/post_images/nerf_9.png)



### 1 NeRF

这部分可能不会写的特别完全（NeRF后续的一些变种之类），可能还是先focus2020这一篇中提到的一些技术和主观结果，毕竟精力有限qwq）

#### 1.1 NeRF的一些trick



#### 1.2 NeRF的一些results


### Reference
1. [ Ben Mildenhall, Pratul P Srinivasan, Matthew Tancik, Jonathan T Barron, Ravi Ramamoorthi, and Ren Ng. 2020. Nerf: Representing scenes as neural radiance fields for view synthesis. In European conference on computer vision.](https://arxiv.org/abs/2003.08934)
2. 