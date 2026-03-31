document.addEventListener('DOMContentLoaded', () => {

    // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.achievement-card') || e.target.closest('.experience-card')) {
            cursor.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.achievement-card') || e.target.closest('.experience-card')) {
            cursor.classList.remove('hovering');
        }
    });

    // ===== GSAP SCROLL ANIMATIONS =====
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {

            // --- PANEL 0: HINDI QUOTE (Fade in centered) ---
            const quoteTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#panel-quote',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            });

            quoteTl.from('#panel-quote .quote-hindi', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out' })
                   .from('#panel-quote .quote-credit', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

            // --- PANEL 1: ABOUT ME (Fade up from center) ---
            const introTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#panel-intro',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            });

            introTl.from('#panel-intro .panel-label', { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' })
                   .from('#panel-intro .about-heading', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                   .from('#panel-intro .about-3d-object', { scale: 0.3, opacity: 0, duration: 1, ease: 'back.out(1.7)' }, '-=0.5')
                   .from('#panel-intro .panel-glow', { opacity: 0, duration: 1.2 }, '-=0.8')
                   .from('#panel-intro .bio-line', { y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }, '-=0.6');

            // --- PANEL 2: EARLY DAYS (Slide from LEFT) ---
            const earlyTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#panel-early',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });

            earlyTl.from('#panel-early .panel-label', { x: -100, opacity: 0, duration: 0.5, ease: 'power2.out' })
                   .from('#panel-early .about-heading', { x: -200, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                   .from('#panel-early .panel-glow', { opacity: 0, duration: 1.2 }, '-=0.6')
                   .from('#panel-early .bullet-item', { x: -100, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.5');

            // --- PANEL 3: LATER DAYS (Slide from RIGHT) ---
            const laterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#panel-later',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });

            laterTl.from('#panel-later .panel-label', { x: 100, opacity: 0, duration: 0.5, ease: 'power2.out' })
                   .from('#panel-later .about-heading', { x: 200, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                   .from('#panel-later .panel-glow', { opacity: 0, duration: 1.2 }, '-=0.6')
                   .from('#panel-later .bullet-item', { x: 100, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.5');

            // --- PANEL 4: EXPERIENCE (Scale up from center) ---
            const expTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#panel-experience',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });

            expTl.from('#panel-experience .panel-label', { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out' })
                 .from('#panel-experience .about-heading', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                 .from('#panel-experience .panel-glow', { opacity: 0, duration: 1 }, '-=0.5')
                 .from('#panel-experience .experience-card', { y: 80, opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.3');

            // --- PANEL 5: ACHIEVEMENTS (Cards bounce in) ---
            const achTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#panel-achievements',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            });

            achTl.from('#panel-achievements .panel-label', { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out' })
                 .from('#panel-achievements .about-heading', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                 .from('#panel-achievements .panel-glow', { opacity: 0, duration: 1.2 }, '-=0.6')
                 .from('.achievement-card', {
                     y: 100, opacity: 0, scale: 0.8,
                     duration: 0.7,
                     stagger: 0.15,
                     ease: 'back.out(1.7)'
                 }, '-=0.4');

        });

        // --- Mobile fallback ---
        mm.add("(max-width: 767px)", () => {
            gsap.utils.toArray('.about-panel').forEach(panel => {
                gsap.from(panel.querySelectorAll('.panel-label, .about-heading, .bio-line, .bullet-item, .experience-card, .achievement-card, .about-3d-object'), {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });

                gsap.from(panel.querySelector('.panel-glow'), {
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 85%',
                    }
                });
            });
        });

        window.addEventListener('load', () => ScrollTrigger.refresh());
        setTimeout(() => ScrollTrigger.refresh(), 200);
    }

    // ===== PARTICLE SYSTEM =====
    const particleCanvas = document.getElementById('about-particles');
    if (particleCanvas) {
        const pCtx = particleCanvas.getContext('2d');
        const particles = [];
        const PARTICLE_COUNT = 80;

        function resizeParticleCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        resizeParticleCanvas();
        window.addEventListener('resize', resizeParticleCanvas);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const colorRoll = Math.random();
            let color;
            if (colorRoll > 0.7) color = '#E50914';
            else if (colorRoll > 0.55) color = 'rgba(59, 130, 246, 0.6)';
            else color = 'rgba(255, 255, 255, 0.5)';

            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                size: Math.random() * 2.5 + 0.3,
                speedY: -(Math.random() * 0.3 + 0.05),
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.4 + 0.05,
                color: color
            });
        }

        function animateParticles() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX;
                if (p.y < -10) { p.y = particleCanvas.height + 10; p.x = Math.random() * particleCanvas.width; }
                if (p.x < -10) p.x = particleCanvas.width + 10;
                if (p.x > particleCanvas.width + 10) p.x = -10;

                pCtx.globalAlpha = p.opacity;
                pCtx.fillStyle = p.color;
                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                pCtx.fill();
            });
            pCtx.globalAlpha = 1;
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }
});
