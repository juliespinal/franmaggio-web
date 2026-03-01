document.addEventListener("DOMContentLoaded", () => {
    document.body.style.overflow = 'hidden';
    const path = document.querySelector('#signature-path');
    const splash = document.querySelector('#splash');
    const modal = document.querySelector('#course-modal');
    const closeModalBtn = document.querySelector('#close-modal');
    const modalCta = document.querySelector('#modal-cta');
    
    // 1. Animación del Splash
    if (path) {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
    }

    // 2. Control de Tiempos
    window.addEventListener('load', () => {
        // A los 2 segundos, ocultamos el splash
        setTimeout(() => {
            if (splash) {
                splash.classList.add('splash-hidden');
            }
            document.body.style.overflow = 'auto';

            // 2 segundos DESPUÉS de que se ocultó el splash, mostramos el modal
            setTimeout(() => {
                if (modal) {
                    modal.classList.add('active');
                    // Opcional: Bloqueamos el scroll mientras el modal esté abierto
                    // para que el usuario preste atención al mensaje
                    document.body.style.overflow = 'hidden'; 
                }
            }, 2000); 

        }, 2000); // 2s de Splash
    });

    // 3. Lógica para cerrar el Modal
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            // Devolvemos el scroll a la página
            document.body.style.overflow = 'auto'; 
        }
    };

    // Cerramos si toca la X
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Cerramos si toca el botón de "Ver temario" (que ya lo lleva a la sección)
    if (modalCta) {
        modalCta.addEventListener('click', closeModal);
    }
});