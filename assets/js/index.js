// Configuração da API do GitHub
const GITHUB_USER = 'LukystarWar'; // ← MUDE AQUI
const GITHUB_REPO = 'geovanafotografia'; // ← MUDE AQUI
const GITHUB_BRANCH = 'main';

// Função para buscar dados do CMS
async function loadPortfolioData() {
    try {
        // Carrega configurações gerais
        await loadSiteConfig();

        // Carrega portfólio
        await loadPortfolioItems();

        // Carrega dados da página sobre
        await loadAboutData();

        // Carrega dados de contato
        await loadContactData();

        console.log('✅ Todos os dados carregados com sucesso!');
    } catch (error) {
        console.log('ℹ️ Usando dados padrão - CMS ainda não configurado');
    }
}

// Carrega configurações gerais do site
async function loadSiteConfig() {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/_data/config.yml`);
        if (response.ok) {
            const content = await response.text();
            const config = parseYAML(content);

            // Atualiza título do site
            if (config.site_title) {
                document.querySelector('.logo h1').textContent = config.site_title;
            }

            // Atualiza slogan
            if (config.tagline) {
                document.querySelector('.logo p').textContent = config.tagline;
            }

            // Atualiza hero
            if (config.hero_image) {
                document.querySelector('.hero').style.backgroundImage =
                    `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${config.hero_image}')`;
            }

            if (config.hero_text) {
                document.querySelector('.hero-content p').textContent = config.hero_text;
            }
        }
    } catch (error) {
        console.log('Config padrão mantido');
    }
}

// Carrega itens do portfólio
async function loadPortfolioItems() {
    try {
        // Busca lista de arquivos na pasta _portfolio
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/_portfolio`);

        if (!response.ok) throw new Error('Pasta _portfolio não encontrada');

        const files = await response.json();
        const portfolioItems = [];

        // Carrega cada arquivo
        for (const file of files) {
            if (file.name.endsWith('.md')) {
                const fileResponse = await fetch(file.download_url);
                const content = await fileResponse.text();
                const item = parseMarkdownWithFrontmatter(content);
                portfolioItems.push(item);
            }
        }

        // Ordena por data (mais recente primeiro)
        portfolioItems.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Atualiza a galeria
        updateGalleryGrid(portfolioItems);

    } catch (error) {
        console.log('Mantendo galeria de exemplo');
    }
}

// Carrega dados da página sobre
async function loadAboutData() {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/_data/sobre.yml`);
        if (response.ok) {
            const content = await response.text();
            const aboutData = parseYAML(content);

            if (aboutData.title) {
                document.querySelector('.about-text h2').textContent = aboutData.title;
            }

            if (aboutData.profile_image) {
                document.querySelector('.about-image img').src = aboutData.profile_image;
            }

            if (aboutData.description) {
                // Converte markdown para HTML simples
                const htmlContent = aboutData.description
                    .split('\n\n')
                    .map(paragraph => `<p>${paragraph}</p>`)
                    .join('');
                document.querySelector('.about-text').innerHTML =
                    `<h2>${aboutData.title || 'Sobre Mim'}</h2>${htmlContent}`;
            }
        }
    } catch (error) {
        console.log('Dados sobre padrão mantidos');
    }
}

// Carrega dados de contato
async function loadContactData() {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/_data/contato.yml`);
        if (response.ok) {
            const content = await response.text();
            const contactData = parseYAML(content);

            // Atualiza WhatsApp
            if (contactData.whatsapp) {
                const whatsappLink = document.querySelector('.contact-item a[href*="wa.me"]');
                if (whatsappLink) {
                    whatsappLink.href = `https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`;
                    whatsappLink.textContent = contactData.whatsapp;
                }
            }

            // Atualiza Instagram
            if (contactData.instagram) {
                const instaLink = document.querySelector('.contact-item a[href*="instagram"]');
                if (instaLink) {
                    instaLink.href = `https://instagram.com/${contactData.instagram.replace('@', '')}`;
                    instaLink.textContent = contactData.instagram;
                }
            }

            // Atualiza Email
            if (contactData.email) {
                const emailLink = document.querySelector('.contact-item a[href*="mailto"]');
                if (emailLink) {
                    emailLink.href = `mailto:${contactData.email}`;
                    emailLink.textContent = contactData.email;
                }
            }
        }
    } catch (error) {
        console.log('Dados contato padrão mantidos');
    }
}

// Atualiza a grade de galerias
function updateGalleryGrid(portfolioItems) {
    const galleryGrid = document.querySelector('.gallery-grid');

    if (portfolioItems.length === 0) return;

    // Limpa galeria existente
    galleryGrid.innerHTML = '';

    // Cria itens da galeria
    portfolioItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const featuredImage = item.featured_image || (item.gallery && item.gallery[0]) || '';

        galleryItem.innerHTML = `
                    <img src="${featuredImage}" alt="${item.title}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 400 250\\'><rect fill=\\'%23f0f0f0\\' width=\\'400\\' height=\\'250\\'/><text x=\\'200\\' y=\\'125\\' font-family=\\'Arial\\' font-size=\\'14\\' fill=\\'%23999\\' text-anchor=\\'middle\\'>Foto do Portfólio</text></svg>'">
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                        <p>${item.description || 'Clique para ver a galeria completa'}</p>
                        <span class="category-tag">${item.category}</span>
                    </div>
                `;

        // Adiciona click para ver galeria completa
        galleryItem.addEventListener('click', () => {
            openGalleryModal(item);
        });

        galleryGrid.appendChild(galleryItem);
    });
}

// Modal para ver galeria completa
function openGalleryModal(item) {
    // Remove modal existente
    const existingModal = document.getElementById('gallery-modal');
    if (existingModal) existingModal.remove();

    // Cria modal
    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.innerHTML = `
                <div class="modal-overlay" onclick="closeGalleryModal()">
                    <div class="modal-content" onclick="event.stopPropagation()">
                        <div class="modal-header">
                            <h2>${item.title}</h2>
                            <button onclick="closeGalleryModal()" class="close-btn">&times;</button>
                        </div>
                        <div class="modal-gallery">
                            ${item.gallery ? item.gallery.map(img => `
                                <img src="${img}" alt="${item.title}" loading="lazy">
                            `).join('') : '<p>Nenhuma imagem disponível</p>'}
                        </div>
                    </div>
                </div>
            `;

    // Adiciona estilos do modal
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
                    #gallery-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 1000;
                    }
                    
                    .modal-overlay {
                        background: rgba(0,0,0,0.9);
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                    }
                    
                    .modal-content {
                        background: white;
                        border-radius: 10px;
                        max-width: 90vw;
                        max-height: 90vh;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .modal-header {
                        padding: 20px;
                        border-bottom: 1px solid #eee;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .close-btn {
                        background: none;
                        border: none;
                        font-size: 30px;
                        cursor: pointer;
                        color: var(--text-light);
                    }
                    
                    .modal-gallery {
                        padding: 20px;
                        max-height: 70vh;
                        overflow-y: auto;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                    }
                    
                    .modal-gallery img {
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: transform 0.3s ease;
                    }
                    
                    .modal-gallery img:hover {
                        transform: scale(1.05);
                    }
                `;
        document.head.appendChild(style);
    }

    document.body.appendChild(modal);
}

// Fecha modal da galeria
function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) modal.remove();
}

// Parser YAML simples
function parseYAML(content) {
    const lines = content.split('\n');
    const result = {};

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                result[key.trim()] = value;
            }
        }
    }

    return result;
}

// Parser Markdown com frontmatter
function parseMarkdownWithFrontmatter(content) {
    const parts = content.split('---');

    if (parts.length < 3) return { title: 'Sem título', content: content };

    const frontmatter = parseYAML(parts[1]);
    const body = parts.slice(2).join('---').trim();

    // Parse da galeria (lista de URLs)
    if (frontmatter.gallery) {
        try {
            // Se for uma string, tenta fazer parse como array
            if (typeof frontmatter.gallery === 'string') {
                frontmatter.gallery = frontmatter.gallery
                    .split('\n')
                    .map(line => line.trim().replace(/^- /, ''))
                    .filter(line => line && line.startsWith('http'));
            }
        } catch (e) {
            frontmatter.gallery = [];
        }
    }

    return { ...frontmatter, body };
}

// Smooth scrolling para os links do menu
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight do menu ativo
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Carrega dados quando a página carrega
document.addEventListener('DOMContentLoaded', loadPortfolioData);

// Adiciona suporte para tecla ESC no modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGalleryModal();
    }
});