---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Jamming Y's Site
---


<!-- 首页欢迎语 -->
<div class="intro-text mb-10">
  <h1 class="text-3xl font-bold text-gray-900">欢迎来到我的学术博客</h1>
  <p class="mt-4 text-lg text-gray-600">
    这里记录我的研究进展、论文解读和学习笔记，欢迎交流！
  </p>
</div>

<!-- 最新文章列表（主题自带的循环逻辑，无需手动写 CSS） -->
<h2 class="text-2xl font-semibold mb-6">最新文章</h2>
{% if site.posts.size > 0 %}
  {% for post in site.posts limit: 5 %}  <!-- 显示最新 5 篇文章 -->
    <article class="mb-8">
      <!-- 文章标题 + 链接 -->
      <h3 class="text-xl font-medium">
        <a href="{{ post.url | relative_url }}" class="text-blue-600 hover:text-blue-800">
          {{ post.title }}
        </a>
      </h3>
      <!-- 文章日期、分类、阅读时间 -->
      <div class="text-sm text-gray-500 mt-2">
        {{ post.date | date: "%Y年%m月%d日" }} · 
        <span class="category">{{ post.category }}</span> · 
        阅读时间：{{ post.read_time | default: 5 }} 分钟
      </div>
      <!-- 文章摘要 -->
      <div class="mt-3 text-gray-700">
        {{ post.excerpt | strip_html | truncate: 200 }}  <!-- 截取 200 字摘要 -->
      </div>
      <!-- 「阅读全文」按钮 -->
      <a href="{{ post.url | relative_url }}" class="mt-2 inline-block text-blue-600 hover:underline">
        阅读全文 →
      </a>
    </article>
  {% endfor %}
{% else %}
  <!-- 没有文章时的提示 -->
  <p class="text-gray-500">暂无文章，快去 _posts 目录创建第一篇吧！</p>
{% endif %}