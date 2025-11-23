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

![demonstration](/_posts/images/nerf_1.png)

#### 0.0 图形学基础

给出一个理解角度：NeRF 模型的输出可以看作某条 Ray 上面的一个点, 对这条 Ray 的所有的点做积分, 可以得到相应 Pixel 的 RGB 值。
![Ray](/_posts/images/nerf_2.png)
具体言之，先用 NeRF 找到箭头与 Volume Data (就是 3D 物体) 的若干个交点, 然后对这些交点做积分 
而这个ray是什么呢？实际上就是我们的“眼睛”或者说相机“发出”（实际是接受）的光


那么我们怎么描述这个射线呢？

除了相机/眼睛的三维位置外，我们还需要两个量来描述相机的视角，即角度：inclination 倾角 和 azimuth 方位角
![5D](/_posts/images/nerf_3.png)


而这每一条Ray都对应我们最后要渲染出来的一个像素，于是自然有：
如果你最终要生成的图片大小是 $H \times W$，, 那么就有 $H \times W$ 条 Ray 从 相机 (你的眼睛) 射出。



下面对每一条ray进行描述：
 一条 Ray 可以用它的起点 $ v_0 $和终点 $ v_d$ (这个不是真正的终点, 因为理论上 Ray 可以无限延伸) 描述

起点肯定就是相机 (你的眼睛), 
终点就是一个能够指示方向的单位向量

于是ray上任意一点就可表示为
$$P = v_0 + t * v_d $$

其中t是任意的实数,采样点也就是选不同的t










### Reference
1. [NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis](https://arxiv.org/abs/2003.08934)
2. 