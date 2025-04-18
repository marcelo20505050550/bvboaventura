document.addEventListener('DOMContentLoaded', function() {
    // Elementos do carrossel
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let interval = null;
    
    // Função para mostrar um slide específico
    function showSlide(index) {
        // Remove a classe ativa de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona a classe ativa ao slide e dot atual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Atualiza o slide atual
        currentSlide = index;
    }
    
    // Função para avançar para o próximo slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }
    
    // Função para voltar para o slide anterior
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }
    
    // Inicia o carrossel automático
    function startInterval() {
        interval = setInterval(nextSlide, 15000); // Aumentado de 8000 para 15000 (8 segundos)
    }
    
    // Para o carrossel automático
    function stopInterval() {
        clearInterval(interval);
    }
    
    // Eventos de clique nos botões e dots
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopInterval();
        startInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopInterval();
        startInterval();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            showSlide(slideIndex);
            stopInterval();
            startInterval();
        });
    });
    
    // Pausa o carrossel quando o mouse está sobre ele
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', stopInterval);
    slider.addEventListener('mouseleave', startInterval);
    
    // Inicia o carrossel automático
    startInterval();
    
    // Rolagem suave para links de âncora
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adicionar rolagem suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Subtrai a altura do header
                    behavior: 'smooth'
                });
            }
        });
    });
}); 