---
layout: default  # 使用页面布局（若你没有`page`布局，可替换为`default`或`home`）
title: 分类
permalink: /categories/  # 固定访问路径，与导航栏链接对应
---

<!-- 分类页面样式（确保与博客整体风格统一） -->
<style>
  .categories-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 0;
  }
  .category-item {
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .category-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color, #3B82F6); /* 继承主色调 */
  }
  .category-count {
    background-color: var(--primary-color, #3B82F6);
    color: white;
    font-size: 0.85rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
  }
  .category-posts {
    list-style: none;
    padding: 0;
  }
  .category-post-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;
    border-bottom: 1px dashed #f1f5f9;
  }
  .category-post-link {
    color: var(--dark-color, #1E293B);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .category-post-link:hover {
    color: var(--primary-color, #3B82F6);
    text-decoration: underline;
  }
  .category-post-date {
    font-size: 0.85rem;
    color: var(--secondary-color, #64748B);
  }
  .no-categories {
    text-align: center;
    padding: 4rem 0;
    color: var(--secondary-color, #64748B);
  }
</style>

<div class="categories-container">
  <!-- 分类标题 -->
  <h1 class="text-center text-3xl font-bold mb-8">文章分类</h1>

  <!-- 遍历所有分类（按分类名排序） -->
  {% assign sorted_categories = site.categories | sort %}
  {% if sorted_categories.size > 0 %}
    {% for category in sorted_categories %}
      <!-- 分类名（category[0] 是分类名，category[1] 是该分类下的所有文章） -->
      {% assign category_name = category[0] %}
      {% assign category_posts = category[1] %}

      <div class="category-item">
        <!-- 分类头部（名称 + 文章数量） -->
        <div class="category-header">
          <h2 class="category-name">{{ category_name }}</h2>
          <span class="category-count">{{ category_posts.size }} 篇</span>
        </div>

        <!-- 分类下的文章列表 -->
        <ul class="category-posts">
          {% for post in category_posts reversed %}  <!-- reversed：按时间倒序（最新在前） -->
            <li class="category-post-item">
              <a href="{{ post.url | relative_url }}" class="category-post-link">
                {{ post.title }}
              </a>
              <span class="category-post-date">
                {{ post.date | date: "%Y-%m-%d" }}
              </span>
            </li>
          {% endfor %}
        </ul>
      </div>
    {% endfor %}
  {% else %}
    <!-- 无分类时显示 -->
    <div class="no-categories">
      <i class="fa fa-folder-open-o text-3xl mb-2"></i>
      <p>暂无分类</p>
      <p class="mt-2">可以在文章 Front Matter 中添加 <code>categories: 分类名</code> 创建分类</p>
    </div>
  {% endif %}
</div>