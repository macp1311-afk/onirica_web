document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Add mobile menu icon HTML
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Lightbox Logic
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioItemsLightbox = document.querySelectorAll('.portfolio-item');

    portfolioItemsLightbox.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxModal.classList.add('show');
                lightboxImg.src = img.src;
            }
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('show');
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightboxModal.classList.remove('show');
        }
    });
});

// Función para enviar pedido a WhatsApp
function enviarWhatsApp(event) {
    event.preventDefault(); // Evitar que la página se recargue

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validar que no estén vacíos
    if (!nombre || !correo || !mensaje) {
        alert("Por favor, llena todos los campos para poder enviarnos tu idea ✨.");
        return;
    }

    // Formatear el mensaje usando el número correcto de la página
    const telefono = "522297637029"; // Número de WhatsApp de Onírica
    const texto = `¡Hola Onírica Manualidades! 🌙✨\n\nSoy ${nombre}.\nMi correo de contacto es: ${correo}\n\nMe gustaría pedir lo siguiente:\n${mensaje}`;

    // Abrir WhatsApp Web / App
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    // Limpiar los campos del formulario
    document.getElementById('pedido-form').reset();
}
