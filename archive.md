---
layout: default  
title: 归档
permalink: /archive/  # 固定路径，与链接对应
---


<style>
  .archive-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 0;
  }
  .year-section {
    margin-bottom: 2.5rem;
  }
  .year-title {
    font-size: 1.8rem;
    color: var(--primary-color, #3B82F6);
    border-bottom: 2px solid var(--primary-color, #3B82F6);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  .post-list {
    list-style: none;
    padding: 0;
  }
  .post-item {
    padding: 0.8rem 0;
    border-bottom: 1px dashed #f1f5f9;
    display: flex;
    align-items: center;
  }
  .post-date {
    color: var(--secondary-color, #64748B);
    min-width: 100px;
    font-size: 0.9rem;
  }
  .post-link {
    color: var(--dark-color, #1E293B);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .post-link:hover {
    color: var(--primary-color, #3B82F6);
    text-decoration: underline;
  }
  .no-posts {
    text-align: center;
    padding: 4rem 0;
    color: var(--secondary-color, #64748B);
  }
</style>

<div class="archive-container">
  <h1 class="text-center text-3xl font-bold mb-8">文章归档</h1>

  {% if site.posts.size > 0 %}
    {% assign previous_year = nil %}  <!-- 初始化年份变量为 nil -->
    
    {% for post in site.posts %}
      {% assign current_year = post.date | date: "%Y" %}  <!-- 获取当前文章的年份 -->
      
      <!-- 核心逻辑：只有当前年份与上一年份不同时，才显示年份标题 -->
      {% if current_year != previous_year %}
        <div class="year-section">
          <h2 class="year-title">{{ current_year }}</h2>  <!-- 显示年份 -->
          <ul class="post-list">
      {% endif %}
      
            <!-- 文章条目 -->
            <li class="post-item">
              <span class="post-date">{{ post.date | date: "%m-%d" }}</span>
              <a href="{{ post.url | relative_url }}" class="post-link">{{ post.title }}</a>
            </li>
      
      <!-- 闭合年份分组的标签 -->
      {% if current_year != previous_year %}
          </ul>
        </div>
        {% assign previous_year = current_year %}  <!-- 更新上一年份为当前年份 -->
      {% endif %}
    {% endfor %}
  {% else %}
    <div class="no-posts">
      <i class="fa fa-file-text-o text-3xl mb-2"></i>
      <p>暂无文章</p>
    </div>
  {% endif %}
</div>