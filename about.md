---
layout: null
title: About
permalink: /about/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }} - {{ site.title | default: "Personal Site" }}</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    
    <!-- Custom Configuration -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3B82F6',
                        secondary: '#64748B',
                        accent: '#F97316',
                        light: '#F8FAFC',
                        dark: '#1E293B',
                        github: '#171515',
                        bilibili: '#FB7299',
                        zhihu: '#0F62FE',
                        dongqiudi: '#00B578'
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    
    <style type="text/tailwindcss">
        @layer utilities {
            .text-shadow {
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .card-hover {
                transition: all 0.3s ease;
            }
            .card-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
            .social-icon {
                transition: transform 0.3s ease;
            }
            .card-hover:hover .social-icon {
                transform: rotate(10deg);
            }
        }
    </style>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-light text-dark font-sans antialiased">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <!-- 左上角：保留原有的动态标题 -->
                <a href="{{ site.url | default: '/' }}" class="text-xl font-semibold text-primary flex items-center">
                    <i class="fa fa-home mr-2"></i>
                    <span>{{ site.title | default: "Personal Site" }}</span>
                </a>
                
                <!-- 桌面端导航：只保留Archives、Categories -->
                <div class="hidden md:flex space-x-8">
                    <a href="/archive/" class="text-secondary hover:text-primary transition-colors duration-200">
                        Archive
                    </a>
                    <a href="/categories/" class="text-secondary hover:text-primary transition-colors duration-200">
                        Categories
                    </a>
                </div>
                
                <!-- 移动端菜单按钮：修复多余的 "<" 符号 -->
                <div class="md:hidden">
                    <button id="menu-toggle" class="text-secondary hover:text-primary transition-colors">
                        <i class="fa fa-bars text-xl"></i> <!-- 之前多了一个 "<"，已删除 -->
                    </button>
                </div>
            </div>
        </div>
        
        <!-- 移动端菜单：修复未闭合的注释 -->
        <div id="mobile-menu" class="hidden md:hidden bg-white shadow-lg absolute w-full">
            <div class="container mx-auto px-4 py-3 space-y-3">
                <a href="/archive/" class="block text-secondary hover:text-primary transition-colors duration-200 py-2">
                    Archive
                </a>
                <a href="/categories/" class="block text-secondary hover:text-primary transition-colors duration-200 py-2">
                    Categories
                </a>
            </div>
        </div>
    </nav>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div class="max-w-4xl mx-auto">
            <!-- Profile Card -->
            <div class="bg-white rounded-2xl shadow-md overflow-hidden mb-12 card-hover">
                <div class="md:flex">
                    <!-- Avatar Section -->
                    <div class="md:w-1/3 bg-primary/5 flex items-center justify-center p-8">
                        <div class="relative">
                            <div class="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                               
                                <img src="/assets/avatar.jpeg" alt="Your Name" class="w-full h-full object-cover">
                            </div>
                            <div class="absolute -bottom-2 -right-2 bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                                <i class="fa fa-code"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bio Section -->
                    <div class="md:w-2/3 p-8 sm:p-10">
                        <h1 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-dark mb-4 text-shadow">
                            About Me
                        </h1>
                        <p class="text-secondary mb-6 leading-relaxed">
                            Hi there! As for the about page, I'd like to introduce myself more in-depth and in a more casual way.
                            I'm fond of playing many kinds of sports, including football, basketball, badminton, table tennis, and running.
                            I'm also a big fan of Atletico de Madrid.
                            I love music, but not such an expert.
                            To be specific, I'm passionate about Chinese pop, American/European country music, and piano pieces.
                            I like reading Chinese literature and history.
                            I enjoy travelling to different places and experiencing different cultures.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <!-- Customize your skills -->
                            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Atletico Madrid</span>
                            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Sports</span>
                            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Travelling</span>
                            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Literature</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Social Media Cards -->
            <div class="bg-white rounded-2xl shadow-md p-8 sm:p-10 mb-12 card-hover">
                <h2 class="text-2xl font-semibold mb-8 flex items-center">
                    <i class="fa fa-share-alt text-primary mr-3"></i>
                    Connect With Me
                </h2>
                <p class="text-secondary mb-8 leading-relaxed">
                    The following are some of the social media platforms I frequently use. Though I haven't posted much on them, I really enjoy connecting with others there.  
                    I'll get back to you as soon as possible.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- GitHub -->
                    <a href="https://github.com/J-am-ack" target="_blank" rel="noopener" class="flex flex-col items-center justify-center p-5 border border-gray-100 rounded-xl hover:border-github/30 transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                        <div class="w-14 h-14 rounded-full bg-github/10 flex items-center justify-center mb-4">
                            <i class="fa fa-github text-github text-2xl social-icon"></i>
                        </div>
                        <h3 class="font-medium text-dark text-center">GitHub</h3>
                        <p class="text-secondary text-sm text-center mt-1">@J-am-ack</p>
                    </a>
                    
                    <!-- Bilibili -->
                    <a href="https://space.bilibili.com/3546703625980039?spm_id_from=333.1007.0.0" target="_blank" rel="noopener" class="flex flex-col items-center justify-center p-5 border border-gray-100 rounded-xl hover:border-bilibili/30 transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                        <div class="w-14 h-14 rounded-full bg-bilibili/10 flex items-center justify-center mb-4">
                            <i class="fa fa-play-circle text-bilibili text-2xl social-icon"></i>
                        </div>
                        <h3 class="font-medium text-dark text-center">Bilibili</h3>
                        <p class="text-secondary text-sm text-center mt-1">@马德里的歌神下凡</p>
                    </a>
                    
                    <!-- Zhihu -->
                    <a href="https://www.zhihu.com/people/7-16-5-25-69" target="_blank" rel="noopener" class="flex flex-col items-center justify-center p-5 border border-gray-100 rounded-xl hover:border-zhihu/30 transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                        <div class="w-14 h-14 rounded-full bg-zhihu/10 flex items-center justify-center mb-4">
                            <i class="fa fa-question-circle text-zhihu text-2xl social-icon"></i>
                        </div>
                        <h3 class="font-medium text-dark text-center">知乎</h3>
                        <p class="text-secondary text-sm text-center mt-1">@知乎者也</p>
                    </a>
                    
                    <!-- Dongqiudi -->
                    <a href="https://www.dongqiudi.com/user/id" target="_blank" rel="noopener" class="flex flex-col items-center justify-center p-5 border border-gray-100 rounded-xl hover:border-dongqiudi/30 transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                        <div class="w-14 h-14 rounded-full bg-dongqiudi/10 flex items-center justify-center mb-4">
                            <i class="fa fa-futbol-o text-dongqiudi text-2xl social-icon"></i>
                        </div>
                        <h3 class="font-medium text-dark text-center">懂球帝</h3>
                        <p class="text-secondary text-sm text-center mt-1">@550神阵中的神锋</p>
                    </a>
                </div>
            </div>

            <!-- Jekyll Info Card -->
            <div class="bg-white rounded-2xl shadow-md p-8 sm:p-10 card-hover">
                <h2 class="text-2xl font-semibold mb-6 flex items-center">
                    <i class="fa fa-code text-primary mr-3"></i>
                    Acknowledgements: Built With Jekyll
                </h2>
                <div class="prose max-w-none text-secondary">
                    <p class="mb-4">
                        This website is built with Jekyll, a simple, blog-aware static site generator.
                        You can find out more info about customizing your Jekyll theme, as well as basic Jekyll usage documentation:
                    </p>
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-start">
                            <i class="fa fa-external-link text-primary mt-1 mr-2"></i>
                            <a href="https://jekyllrb.com/" target="_blank" rel="noopener" class="text-primary hover:underline">
                                Jekyll Official Documentation
                            </a>
                        </li>
                        <li class="flex items-start">
                            <i class="fa fa-github text-primary mt-1 mr-2"></i>
                            <a href="https://github.com/jekyll/minima" target="_blank" rel="noopener" class="text-primary hover:underline">
                                Minima Theme Source Code
                            </a>
                        </li>
                        <li class="flex items-start">
                            <i class="fa fa-github text-primary mt-1 mr-2"></i>
                            <a href="https://github.com/jekyll/jekyll" target="_blank" rel="noopener" class="text-primary hover:underline">
                                Jekyll Source Code
                            </a>
                        </li>
                    </ul>
                    <p>
                        Jekyll makes building static websites simple and powerful, perfect for personal blogs, portfolios, and small websites.
                    </p>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
                <div class="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div class="mb-6 md:mb-0">
                        <h3 class="text-xl font-semibold mb-2">{{ site.title | default: "Personal Site" }}</h3>
                        <p class="text-gray-400">© {{ "now" | date: "%Y" }} All rights reserved.</p>
                    </div>
                    <div class="flex space-x-6">
                        <!-- Social Media Icons -->
                        <a href="https://github.com/J-am-ack" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors duration-200">
                            <i class="fa fa-github text-xl"></i>
                        </a>
                        <a href="https://space.bilibili.com/3546703625980039?spm_id_from=333.1007.0.0" target="_blank" rel="noopener" class="text-gray-400 hover:text-bilibili transition-colors duration-200">
                            <i class="fa fa-play-circle text-xl"></i>
                        </a>
                        <a href="https://www.zhihu.com/people/7-16-5-25-69" target="_blank" rel="noopener" class="text-gray-400 hover:text-zhihu transition-colors duration-200">
                            <i class="fa fa-question-circle text-xl"></i>
                        </a>
                        <a href="https://www.dongqiudi.com/user/your-id" target="_blank" rel="noopener" class="text-gray-400 hover:text-dongqiudi transition-colors duration-200">
                            <i class="fa fa-futbol-o text-xl"></i>
                        </a>
                    </div>
                </div>
                <div class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>Built with <i class="fa fa-heart text-accent"></i> using Jekyll & Tailwind CSS</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        // Mobile Menu Toggle
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 10) {
                nav.classList.add('shadow');
                nav.classList.remove('shadow-sm');
            } else {
                nav.classList.remove('shadow');
                nav.classList.add('shadow-sm');
            }
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>