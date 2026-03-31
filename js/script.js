const projectsData = [
    {
        id: "01",
        name: "Coupon Management System",
        category: "Full Stack Web App",
        stack: "MongoDB, Express, React, Node",
        isFeatured: false,
        desc: "An internal administrative tool for generating, distributing, and tracking the usage of promotional discount codes.",
        features: [
            "Batch generation of unique codes",
            "Usage analytics graph dashboard",
            "Expiration and max-use constraints",
            "RESTful API for e-commerce integration"
        ],
        github: "#",
        demo: "#",
    },
    {
        id: "02",
        name: "Crypto Portfolio Tracker",
        category: "Full Stack",
        stack: "React, Node.js, Binance API",
        isFeatured: false,
        desc: "A comprehensive dashboard to track cryptocurrency investments, monitor live prices, and analyze historical performance with deep data visualizations.",
        features: [
            "Real-time price updates via WebSocket",
            "Secure OAuth2 authentication",
            "Custom alert triggers on price dips/spikes",
            "Detailed profit/loss analytics"
        ],
        github: "#",
        demo: "#",
    },
    {
        id: "03",
        name: "VOIP Encryption Website",
        category: "Web & Security",
        stack: "HTML, CSS, JS, PHP",
        isFeatured: false,
        desc: "A landing page and portal for secure voice-over-IP communication services with end-to-end encryption protocols.",
        features: [
            "Sleek public-facing modern UI",
            "Secure backend user registration",
            "Custom PHP routing for API requests",
            "Mobile-optimized performance"
        ],
        github: "#",
        demo: "#",
    },
    {
        id: "04",
        name: "Notify System",
        category: "Backend",
        stack: "Python, SQLAlchemy, APScheduler",
        isFeatured: false,
        desc: "A robust background service for scheduling and delivering notifications via Email and SMS based on user-defined dynamic criteria.",
        features: [
            "Cron-based job scheduling with APScheduler",
            "Database management with SQLAlchemy",
            "Retry mechanisms for failed deliveries",
            "Extensible notification channels"
        ],
        github: "#",
        demo: "#",
    },

];

document.addEventListener('DOMContentLoaded', () => {

    // --- Intro Gate Logic ---
    const introGate = document.getElementById('intro-gate');
    const startBtn = document.getElementById('btn-start-experience');
    const startUI = document.getElementById('intro-start-ui');
    const introVideo = document.getElementById('intro-video');
    const burstCircle = document.querySelector('.burst-circle');

    if (introGate && introVideo) {
        // Check if we're returning from another page (skip the intro)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('skip') === 'intro') {
            // Instantly skip the intro gate
            introGate.classList.add('hidden');
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden';

            // Clean up URL without reloading
            window.history.replaceState({}, '', window.location.pathname);

            // Refresh GSAP after layout settles
            setTimeout(() => {
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            }, 100);
        } else {
            // Normal intro gate flow
            document.body.style.overflow = 'hidden';

        startBtn.addEventListener('click', () => {
            // Hide the 'Click to Begin' UI
            startUI.style.opacity = '0';
            setTimeout(() => { startUI.style.display = 'none'; }, 1000);

            // Play video with audio out loud
            introVideo.play().then(() => {
                introVideo.classList.add('playing');
            }).catch(err => {
                console.error("Video play failed (Likely missing intro.webm):", err);
                // FALLBACK: If video is missing/404s, skip straight to loader
                showLoaderAndEnter();
            });
        });

        function showLoaderAndEnter() {
            // Reveal the automated Loader Spinner Instead of a button
            const loaderUI = document.getElementById('intro-loading-ui');
            if(loaderUI) {
                loaderUI.style.display = 'flex';
                setTimeout(() => { loaderUI.style.opacity = '1'; }, 50); 
            }

            // Automate the transition after 2.5 seconds of "loading"
            setTimeout(() => {
                // Hide Loader
                if(loaderUI) loaderUI.style.opacity = '0';

                // Trigger Burst Animation Flash
                burstCircle.classList.add('active');

                // Fade out intro gate and unlock the site
                setTimeout(() => {
                    introGate.classList.add('hidden');

                    // Restore native scrolling for the portfolio
                    document.body.style.overflow = 'auto';
                    document.body.style.overflowX = 'hidden';

                    // CRITICAL FIX: Refresh GSAP calculations since viewport layout just changed
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.refresh();
                    }
                }, 600);
            }, 2500);
        }

        // Listen for the exact moment the video finishes
        introVideo.addEventListener('ended', showLoaderAndEnter);
        } // end else (normal intro flow)
    }
    // --- End Intro Gate ---

    // --- SMX-Style Page Transition (Logo -> About Page) ---
    const logoTrigger = document.getElementById('logo-about-trigger');
    if (logoTrigger) {
        logoTrigger.addEventListener('click', (e) => {
            e.preventDefault();

            const overlay = document.getElementById('page-transition-overlay');
            const bar = document.getElementById('transition-bar');
            const percentText = document.getElementById('transition-percent');
            if (!overlay || !bar || !percentText) return;

            // Show overlay
            overlay.classList.add('active');

            // Animate loading bar from 0 to 100 over 2 seconds
            let progress = 0;
            const totalDuration = 2000; // 2 seconds
            const intervalTime = 20; // update every 20ms
            const increment = 100 / (totalDuration / intervalTime);

            const loadInterval = setInterval(() => {
                progress += increment;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadInterval);

                    // Brief pause at 100%, then navigate
                    setTimeout(() => {
                        window.location.href = 'about.html';
                    }, 400);
                }

                const rounded = Math.round(progress);
                bar.style.width = rounded + '%';
                percentText.textContent = rounded + '%';
            }, intervalTime);
        });
    }
    // --- End Page Transition ---

    // Custom Cursor
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    });

    // Using event delegation for dynamic elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-row')) {
            cursor.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project-row')) {
            cursor.classList.remove('hovering');
        }
    });

    // Render Projects
    const projectListEl = document.getElementById('project-list');

    projectsData.forEach((proj) => {
        const row = document.createElement('div');
        row.className = `project-row ${proj.isFeatured ? 'featured' : ''} fade-target`;

        let badgeHTML = proj.isFeatured ? `<div class="featured-badge">BEST WORK</div>` : '';

        row.innerHTML = `
            ${badgeHTML}
            <div class="row-left">
                <span class="project-id-tag">${proj.id}</span>
                <h3 class="project-name">${proj.name}</h3>
            </div>
            <div class="row-center">
                <span class="project-category">${proj.category}</span>
                <span class="project-stack">${proj.stack}</span>
            </div>
            <div class="row-right">
                <button class="btn btn-primary open-modal-btn" data-id="${proj.id}">
                    VIEW PROJECT
                </button>
            </div>
        `;
        projectListEl.appendChild(row);
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) {
            const pid = btn.getAttribute('data-id');
            const data = projectsData.find(p => p.id === pid);
            if (data) {
                document.getElementById('modal-title').textContent = data.name;
                document.getElementById('modal-category').textContent = data.category;
                document.getElementById('modal-desc').textContent = data.desc;
                document.getElementById('modal-stack-text').textContent = data.stack;

                const featuresList = document.getElementById('modal-features-list');
                featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent scrolling
            }
        }
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- GSAP Animations ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Responsive Match Media to save performance on small screens
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // 1. Cinematic Canvas Image Sequence Scrub
            const canvas = document.getElementById("hero-lightpass");
            if (canvas) {
                const context = canvas.getContext("2d");

                // Native canvas rendering resolution (matches 1080p standard ratio)
                canvas.width = 1920;
                canvas.height = 1080;

                const frameCount = 120;
                // Seedhe Maut frames are indexed '000' to '119'
                const currentFrame = index => (`00${index}`).slice(-3);

                const images = [];
                const sequence = { frame: 0 };

                // Preload all 120 frames directly from SMX production server
                for (let i = 0; i < frameCount; i++) {
                    const img = new Image();
                    img.src = `https://seedhemaut-smx.netlify.app/sequence/frame_${currentFrame(i)}_delay-0.066s.webp`;
                    images.push(img);
                }

                function render() {
                    const img = images[Math.round(sequence.frame)];
                    if (!img || !img.complete) return;

                    // Algorithm to mimic 'object-fit: cover' logically within the canvas
                    const hRatio = canvas.width / img.width;
                    const vRatio = canvas.height / img.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const centerShift_x = (canvas.width - img.width * ratio) / 2;
                    const centerShift_y = (canvas.height - img.height * ratio) / 2;

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                }

                // Draw frame 0 immediately when loaded
                images[0].addEventListener('load', render);

                // GSAP Master Timeline pinning the Dragon Sequence
                const masterDuration = 100;

                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".dragon-sequence-container",
                        pin: true,
                        scrub: 0.5,          // Reverted to 0.5s for smoother frame rendering
                        start: "top top",    
                        end: "+=4000px",
                    }
                });

                // 1. Scrub the dragon frames across the entire 100% duration
                masterTl.to(sequence, {
                    frame: frameCount - 1,
                    snap: "frame",
                    ease: "none",
                    duration: masterDuration,
                    onUpdate: render
                }, 0);

                // 2. Fade OUT Quote gracefully before title appears
                masterTl.to(".hero-quote", { opacity: 0, duration: masterDuration * 0.1, ease: "power1.inOut" }, masterDuration * 0.25);

                // 3. Fade IN Hero Text exactly in the MIDDLE of the scroll sequence
                masterTl.to(".hero-title", { opacity: 1, duration: masterDuration * 0.1, ease: "power1.inOut" }, masterDuration * 0.40);
                masterTl.to(".hero-subtitle", { opacity: 1, duration: masterDuration * 0.1, ease: "power1.inOut" }, masterDuration * 0.45);

                // 4. Zoom effect — text zooms separately from canvas to prevent canvas flickering
                masterTl.to(".hero-title", { scale: 1.5, duration: masterDuration * 0.4, ease: "none" }, masterDuration * 0.6);
                masterTl.to(".hero-subtitle", { scale: 1.5, duration: masterDuration * 0.4, ease: "none" }, masterDuration * 0.6);
                masterTl.to(canvas, { scale: 1.3, duration: masterDuration * 0.4, ease: "none" }, masterDuration * 0.6);
            }

            // 2. Staggered Row Reveals
            const rows = gsap.utils.toArray('.project-row');
            gsap.fromTo(rows,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".projects-section",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // 3. About section link handled via page transition — no inline GSAP needed
        });

        mm.add("(max-width: 767px)", () => {
            // Fallback for mobile (lighter animations, no heavy video parallax)
            const rows = gsap.utils.toArray('.project-row');
            gsap.fromTo(rows,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".projects-section",
                        start: "top 85%",
                    }
                }
            );
        });

        // Ensure accurate calculations after rendering and fonts load
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });

        // Immediate fallback refresh for dynamic DOM injection
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }
});