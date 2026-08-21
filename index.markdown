---
layout: home
title: Jamming Y's Site
---

<section class="home-welcome" aria-labelledby="home-title">
  <div class="home-welcome-inner">
    <div class="home-avatar-wrap"><img class="home-avatar" src="{{ '/assets/avatar.jpeg' | relative_url }}" alt="Jam Y 的头像"></div>
    <p class="home-kicker">Welcome to my world</p>
    <h1 id="home-title">Jamming.Y’s<span class="home-title-space"> </span><br class="home-mobile-break">Site</h1>
    <p class="home-role">{{ site.role }}<span aria-hidden="true"> · </span>{{ site.affiliation }}</p>
    <div class="home-description">{{ site.description | newline_to_br }}</div>
    <div class="home-actions">
      <a class="home-action-primary" href="{{ '/blog/' | relative_url }}">Read my notes <i class="fas fa-arrow-right"></i></a>
      <a class="home-action-secondary" href="{{ '/about/' | relative_url }}">More about me</a>
    </div>
    <div class="home-contact" aria-label="联系方式">
      <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"><i class="fab fa-github"></i></a>
      <a href="mailto:{{ site.email }}" aria-label="Email" title="Email"><i class="fas fa-envelope"></i></a>
      <div class="home-contact-popover"><button type="button" aria-label="微信二维码" title="微信二维码"><i class="fab fa-weixin"></i></button><div class="home-qr"><img src="{{ '/assets/images/wechat-qr.jpg' | relative_url }}" alt="微信二维码"><span>扫码添加我的微信</span></div></div>
      <div class="home-contact-popover"><button type="button" aria-label="微信公众号二维码" title="微信公众号二维码"><i class="fas fa-newspaper"></i></button><div class="home-qr"><img src="{{ '/assets/images/wechat-official-qr.jpg' | relative_url }}" alt="微信公众号二维码"><span>扫码关注我的公众号</span></div></div>
    </div>
  </div>
</section>

<section class="home-below section-wrap" aria-labelledby="home-notes-title">
  <div class="home-below-heading"><div><p class="eyebrow">Field notes</p><h2 id="home-notes-title">Latest writing</h2></div><a class="text-link" href="{{ '/blog/' | relative_url }}">All posts <i class="fas fa-arrow-right"></i></a></div>
  <div class="latest-list glass-card">
    {% for post in site.posts limit: 3 %}
    <article class="latest-item"><time datetime="{{ post.date | date_to_xmlschema }}"><span>{{ post.date | date: '%d' }}</span>{{ post.date | date: '%b %Y' }}</time><div><p class="post-kicker">{{ post.categories | first | default: 'Notes' }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.excerpt | strip_html | truncate: 125 }}</p></div><a class="round-link" href="{{ post.url | relative_url }}" aria-label="阅读 {{ post.title }}"><i class="fas fa-arrow-right"></i></a></article>
    {% endfor %}
  </div>
</section>
