---
layout: default
title: "Portfólio"
description: "Studio Fotográfico - Capturando momentos únicos"
---

<!-- Header -->
<header>
    <div class="container">
        <div class="logo">
            {% if site.data.site.logo %}
                <img src="{{ site.data.site.logo }}" alt="{{ site.data.site.title }}" style="max-height: 80px;">
            {% else %}
                <h1>{{ site.data.site.title | default: site.title | default: "GEOVANA FOTOGRAFIAS" }}</h1>
            {% endif %}
            <p>{{ site.data.site.tagline | default: "Studio Fotográfico" }}</p>
        </div>
    </div>
</header>

<!-- Navigation -->
<nav>
    <div class="container">
        <ul>
            <li><a href="#home">Início</a></li>
            <li><a href="#galerias">Galerias</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
        </ul>
    </div>
</nav>

<!-- Hero Section -->
<section id="home" class="hero" {% if site.data.site.hero_image %}style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('{{ site.data.site.hero_image }}')"{% endif %}>
    <div class="hero-content">
        <h2>{{ site.data.site.hero_title | default: "Capturando Momentos Únicos" }}</h2>
        <p>{{ site.data.site.hero_subtitle | default: "Transformo seus momentos especiais em memórias eternas através da fotografia" }}</p>
    </div>
</section>

<!-- Gallery Section -->
<section id="galerias" class="gallery-section">
    <div class="container">
        <div class="section-title">
            <h2>Portfólio</h2>
            <p>Alguns dos meus trabalhos mais especiais</p>
        </div>  
        <div class="gallery-grid">
            {% if site.portfolio and site.portfolio.size > 0 %}
                {% assign sorted_portfolio = site.portfolio | sort: 'date' | reverse %}
                {% for item in sorted_portfolio %}
                <div class="gallery-item" data-title="{{ item.title | escape }}" data-gallery="{{ item.gallery | jsonify | escape }}">
                    <img src="{{ item.featured_image }}" alt="{{ item.title }}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 250\'><rect fill=\'%23f0f0f0\' width=\'400\' height=\'250\'/><text x=\'200\' y=\'125\' font-family=\'Arial\' font-size=\'14\' fill=\'%23999\' text-anchor=\'middle\'>Foto do Portfólio</text></svg>'">
                    <div class="gallery-info">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.description | default: "Clique para ver a galeria completa" }}</p>
                        <span class="category-tag">{{ item.category }}</span>
                    </div>
                </div>
                {% endfor %}
            {% else %}
            <!-- Galeria de exemplo quando não há itens -->
            <div class="gallery-item">
                <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect fill='%23f0f0f0' width='400' height='250'/><text x='200' y='125' font-family='Arial' font-size='14' fill='%23999' text-anchor='middle'>Foto do Portfólio</text></svg>" alt="Casamento">
                <div class="gallery-info">
                    <h3>Casamento dos Sonhos</h3>
                    <p>Um dia inesquecível repleto de amor e emoção</p>
                    <span class="category-tag">Casamento</span>
                </div>
            </div>
            <div class="gallery-item">
                <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect fill='%23f0f0f0' width='400' height='250'/><text x='200' y='125' font-family='Arial' font-size='14' fill='%23999' text-anchor='middle'>Foto do Portfólio</text></svg>" alt="Ensaio">
                <div class="gallery-info">
                    <h3>Ensaio Romântico</h3>
                    <p>Momentos íntimos capturados com sensibilidade</p>
                    <span class="category-tag">Ensaio</span>
                </div>
            </div>
            <div class="gallery-item">
                <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect fill='%23f0f0f0' width='400' height='250'/><text x='200' y='125' font-family='Arial' font-size='14' fill='%23999' text-anchor='middle'>Foto do Portfólio</text></svg>" alt="Família">
                <div class="gallery-info">
                    <h3>Família Feliz</h3>
                    <p>Registrando a alegria e união familiar</p>
                    <span class="category-tag">Família</span>
                </div>
            </div>
            {% endif %}
        </div>
    </div>
</section>

<!-- About Section -->
<section id="sobre" class="about">
    <div class="container">
        <div class="about-content">
            <div class="about-image">
                {% if site.data.about.profile_image %}
                    <img src="{{ site.data.about.profile_image }}" alt="{{ site.data.about.title | default: 'Geovana' }}">
                {% else %}
                    <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'><circle fill='%23f0f0f0' cx='125' cy='125' r='125'/><text x='125' y='125' font-family='Arial' font-size='12' fill='%23999' text-anchor='middle'>Foto da Geovana</text></svg>" alt="Geovana">
                {% endif %}
            </div>
            <div class="about-text">
                <h2>{{ site.data.about.title | default: "Sobre Mim" }}</h2>
                    {% if site.data.about.intro %}
                        {{ site.data.about.intro | markdownify }}
                    {% endif %}
                    {% if site.data.about.specialties %}
                        {{ site.data.about.specialties | markdownify }}
                    {% endif %}
                    {% if site.data.about.philosophy %}
                        {{ site.data.about.philosophy | markdownify }}
                    {% endif %}
                    {% unless site.data.about.intro or site.data.about.specialties or site.data.about.philosophy %}
                        <p>Sou Geovana, fotógrafa apaixonada por capturar a essência dos momentos mais especiais da vida. Com anos de experiência, transformo emoções em imagens que contam histórias.</p>
                        <p>Especializo-me em casamentos, ensaios e fotografias de família, sempre buscando a naturalidade e a beleza única de cada momento.</p>
                        <p>Meu objetivo é criar um ambiente confortável onde você possa ser autêntico, permitindo que eu capture sua verdadeira essência.</p>
                    {% endunless %}
                    <!-- {% if site.data.about.experience %}
                        <p><strong>{{ site.data.about.experience }} anos de experiência</strong> capturando momentos únicos.</p>
                    {% endif %} -->
                    {% if site.data.about.location %}
                        <p><strong>Localização:</strong> {{ site.data.about.location }}</p>
                    {% endif %}
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contato" class="contact">
    <div class="container">
        <div class="section-title">
            <h2>Entre em Contato</h2>
            <p>Vamos conversar sobre seu próximo ensaio?</p>
        </div>
        <div class="contact-info">
            <div class="contact-item">
                <i class="fab fa-whatsapp"></i>
                <h3>WhatsApp</h3>
                {% if site.data.contact.whatsapp %}
                    <a href="https://wa.me/{{ site.data.contact.whatsapp | remove: '+' | remove: ' ' | remove: '-' | remove: '(' | remove: ')' }}" target="_blank">
                        {% if site.data.contact.whatsapp contains '+' %}
                            {{ site.data.contact.whatsapp }}
                        {% else %}
                            ({{ site.data.contact.whatsapp | slice: 0, 2 }}) {{ site.data.contact.whatsapp | slice: 2, 5 }}-{{ site.data.contact.whatsapp | slice: 7, 4 }}
                        {% endif %}
                    </a>
                {% else %}
                    <a href="https://wa.me/5511999999999" target="_blank">(11) 99999-9999</a>
                {% endif %}
            </div>
            <div class="contact-item">
                <i class="fab fa-instagram"></i>
                <h3>Instagram</h3>
                {% if site.data.contact.instagram %}
                    <a href="https://instagram.com/{{ site.data.contact.instagram | remove: '@' }}" target="_blank">{{ site.data.contact.instagram }}</a>
                {% else %}
                    <a href="https://instagram.com/geovanafotografias" target="_blank">@geovanafotografias</a>
                {% endif %}
            </div>  
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <h3>E-mail</h3>
                {% if site.data.contact.email %}
                    <a href="mailto:{{ site.data.contact.email }}">{{ site.data.contact.email }}</a>
                {% else %}
                    <a href="mailto:contato@geovanafotografias.com">contato@geovanafotografias.com</a>
                {% endif %}
            </div>
            {% if site.data.contact.address %}
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <h3>Endereço</h3>
                <p>{{ site.data.contact.address }}</p>
            </div>
            {% endif %}
            {% if site.data.contact.hours %}
            <div class="contact-item">
                <i class="fas fa-clock"></i>
                <h3>Horário</h3>
                <p>{{ site.data.contact.hours }}</p>
            </div>
            {% endif %}
        </div>
    </div>
</section>

<!-- Footer -->
<footer>
    <div class="container">
        <div class="social-links">
            <a href="https://instagram.com/geovanafotografias" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/5511999999999" target="_blank"><i class="fab fa-whatsapp"></i></a>
            <a href="mailto:contato@geovanafotografias.com"><i class="fas fa-envelope"></i></a>
        </div>
        <div class="copy-info">
            <p>&copy; 2025 Geovana Fotografias. Todos os direitos reservados.</p>
            <p>Desenvolvido por <a href="https://castrolabs.com.br" target="_blank">Castro Labs</a></p>
        </div>
    </div>
</footer>