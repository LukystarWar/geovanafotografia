// ========================================
// GEOVANA FOTOGRAFIAS - Jekyll Version
// Muito mais simples e rápido! 🚀
// ========================================

// Modal para ver galeria completa
function openGalleryModal(title, gallery) {
    // Remove modal existente se houver
    const existingModal = document.getElementById('gallery-modal');
    if (existingModal) existingModal.remove();

    // Cria o modal
    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeGalleryModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button onclick="closeGalleryModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-gallery">
                    ${gallery && gallery.length > 0 ? 
                        gallery.map(img => `
                            <img src="${img}" alt="${title}" loading="lazy" onclick="viewFullImage('${img}')">
                        `).join('') : 
                        '<p>Nenhuma imagem disponível</p>'
                    }
                </div>
            </div>
        </div>
    `;

    // Adiciona estilos do modal (só uma vez)
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
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-overlay {
                background: rgba(0,0,0,0.9);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 95vw;
                max-height: 95vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-header {
                padding: 25px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, var(--gold), var(--light-gold));
                color: white;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 1.8rem;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 35px;
                cursor: pointer;
                color: white;
                padding: 0;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            
            .close-btn:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .modal-gallery {
                padding: 25px;
                max-height: 75vh;
                overflow-y: auto;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .modal-gallery img {
                width: 100%;
                height: 250px;
                object-fit: cover;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .modal-gallery img:hover {
                transform: scale(1.03);
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .modal-content {
                    max-width: 98vw;
                    max-height: 98vh;
                    margin: 10px;
                }
                
                .modal-gallery {
                    grid-template-columns: 1fr;
                    padding: 20px;
                    gap: 15px;
                }
                
                .modal-gallery img {
                    height: 200px;
                }
                
                .modal-header {
                    padding: 20px;
                }
                
                .modal-header h2 {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Adiciona o modal ao body
    document.body.appendChild(modal);
    
    // Impede scroll da página
    document.body.style.overflow = 'hidden';
}

// Fecha o modal da galeria
function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Visualiza imagem em tela cheia
function viewFullImage(imageSrc) {
    const fullImageModal = document.createElement('div');
    fullImageModal.id = 'full-image-modal';
    fullImageModal.innerHTML = `
        <div class="full-image-overlay" onclick="closeFullImage()">
            <img src="${imageSrc}" alt="Imagem em tela cheia" onclick="event.stopPropagation()">
            <button onclick="closeFullImage()" class="full-image-close">&times;</button>
        </div>
    `;
    
    // Estilos para visualização em tela cheia
    if (!document.getElementById('full-image-styles')) {
        const style = document.createElement('style');
        style.id = 'full-image-styles';
        style.textContent = `
            #full-image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            
            .full-image-overlay {
                background: rgba(0,0,0,0.95);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .full-image-overlay img {
                max-width: 95%;
                max-height: 95%;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            
            .full-image-close {
                position: absolute;
                top: 30px;
                right: 30px;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                font-size: 40px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .full-image-close:hover {
                background: rgba(255,255,255,0.3);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(fullImageModal);
}

// Fecha visualização em tela cheia
function closeFullImage() {
    const fullImageModal = document.getElementById('full-image-modal');
    if (fullImageModal) fullImageModal.remove();
}

// Smooth scrolling para navegação
function initSmoothScrolling() {
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
}

// Destaca menu ativo conforme scroll
function initActiveMenuHighlight() {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
}

// Adiciona animações suaves aos elementos quando aparecem na tela
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos da galeria
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Event listeners globais
function initEventListeners() {
    // Tecla ESC fecha modais
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFullImage();
            closeGalleryModal();
        }
    });

    // Impede zoom no mobile ao dar double tap
    document.addEventListener('touchend', (e) => {
        const now = new Date().getTime();
        const timeSince = now - lastTouchEnd;
        if (timeSince < 300 && timeSince > 0) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    });
}

// Variável para controle de double tap
let lastTouchEnd = 0;

// Inicializa tudo quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Geovana Fotografias - Jekyll version carregada!');
    
    initSmoothScrolling();
    initActiveMenuHighlight();
    initScrollAnimations();
    initEventListeners();
    
    // Adiciona classe CSS para animações
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            nav a.active {
                color: var(--gold) !important;
                transform: translateY(-2px);
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            /* Melhoria visual nos botões de contato */
            .contact-item {
                transition: transform 0.3s ease;
            }
            
            .contact-item:hover {
                transform: translateY(-5px);
            }
        `;
        document.head.appendChild(style);
    }
});