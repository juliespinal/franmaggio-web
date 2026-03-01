// main.js

// Dot Navigation Highlight
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

const observerOptions = {
    // Bajamos la exigencia: solo necesita ver el 20% de la sección para activarse
    threshold: 0.2,
    // Le agregamos un margen virtual para que dispare un poquito antes
    rootMargin: "0px 0px -15% 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            dots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('href') === '#' + entry.target.id) {
                    dot.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Animación de Reveal al hacer Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Si querés que la animación pase solo una vez, dejás esto:
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 }); // Se activa cuando se ve el 20% del elemento

revealElements.forEach(el => revealObserver.observe(el));

// --- CARRUSEL AUTOMÁTICO (CROSSFADE) ---
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    // Solo activamos el intervalo si hay más de 1 foto
    if (slides.length > 1) {
        setInterval(() => {
            // Le sacamos la clase 'active' a la foto actual
            slides[currentSlide].classList.remove('active');

            // Pasamos a la siguiente (y si es la última, vuelve a 0)
            currentSlide = (currentSlide + 1) % slides.length;

            // Le ponemos la clase 'active' a la nueva foto
            slides[currentSlide].classList.add('active');
        }, 4000); // 4000 milisegundos = 4 segundos por foto
    }
});

// --- ACORDEÓN DE ARTISTAS ---
const accordions = document.querySelectorAll('.artist-item.accordion');

accordions.forEach(acc => {
    acc.addEventListener('click', function () {
        // OPCIONAL: Si querés que al abrir uno, se cierren los demás, descomentá las siguientes 3 líneas:
        // accordions.forEach(item => {
        //     if (item !== this) item.classList.remove('active');
        // });

        // Abrimos o cerramos el que clickeamos
        this.classList.toggle('active');
    });
});

const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('#nav-links li a');

if (hamburgerBtn) {
    // Abrir/Cerrar al tocar la hamburguesa
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburgerBtn.classList.toggle('toggle');

        // Evitar que el usuario haga scroll en el fondo mientras el menú está abierto
        if (navLinks.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburgerBtn.classList.remove('toggle');
            document.body.style.overflow = 'auto'; // Devolvemos el scroll
        });
    });
}

const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
// --- FORMULARIO DE CONTACTO (AJAX FormSubmit) ---
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const errorModal = document.getElementById('error-modal');
const submitBtn = document.getElementById('submit-btn');
const closeContactBtns = document.querySelectorAll('.close-contact-modal');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que la página salte a otro lado

        // Efecto visual: cambiamos el botón para que sepa que está cargando
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        const formData = new FormData(this);

        // Enviamos los datos por detrás
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Restauramos el botón
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;

                if (data.success === "true" || data.success === true) {
                    contactForm.reset(); // Limpiamos los campos
                    successModal.classList.add('active'); // Mostramos éxito
                    document.body.style.overflow = 'hidden';
                } else {
                    errorModal.classList.add('active'); // Mostramos error
                    document.body.style.overflow = 'hidden';
                }
            })
            .catch(error => {
                // Si no hay internet o falla el fetch
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                errorModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
    });
}

// Lógica para cerrar estos dos nuevos modales
closeContactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        successModal.classList.remove('active');
        errorModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Devolvemos el scroll
    });
});

// --- MODAL DE PAGOS (CURSOS) ---
const paymentModal = document.getElementById('payment-modal');
const openPaymentBtns = document.querySelectorAll('.open-payment-modal');
const closePaymentBtns = document.querySelectorAll('.close-payment-modal');

if (paymentModal) {
    // Abrir modal
    openPaymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
        });
    });

    // Cerrar modal con la X
    closePaymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Devuelve el scroll
        });
    });

    // Cerrar modal haciendo clic afuera de la cajita
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}