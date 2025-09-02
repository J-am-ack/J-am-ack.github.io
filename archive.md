---
layout: default  # 使用页面布局（如果没有page布局，可改为default）
title: 归档
permalink: /archive/  # 固定路径，与链接对应
---

# 文章归档

{% for post in site.posts %}
  {% assign current_year = post.date | date: "%Y" %}
  {% if current_year != previous_year %}
    <h2>{{ current_year }}</h2>
    {% assign previous_year = current_year %}
  {% endif %}
  <li>
    <a href="{{ post.url | relative_url }}">
      {{ post.date | date: "%m-%d" }} - {{ post.title }}
    </a>
  </li>
{% endfor %}