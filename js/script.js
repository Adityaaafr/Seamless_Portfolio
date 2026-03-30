const projectsData = [
    {
        id: "01",
        name: "Crypto Portfolio Tracker",
        category: "Full Stack",
        stack: "React, Node.js, Binance API",
        isFeatured: true, // "First project should be slightly larger or highlighted"
        desc: "A comprehensive dashboard to track cryptocurrency investments, monitor live prices, and analyze historical performance with deep data visualizations.",
        features: [
            "Real-time price updates via WebSocket",
            "Secure OAuth2 authentication",
            "Custom alert triggers on price dips/spikes",
            "Detailed profit/loss analytics"
        ],
        github: "#",
        demo: "#"
    },
    {
        id: "02",
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
        demo: "#"
    },
    {
        id: "03",
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
        demo: "#"
    },
    {
        id: "04",
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
        demo: "#"
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // --- Intro Gate Logic ---
    const introGate = document.getElementById('intro-gate');
    const startBtn = document.getElementById('btn-start-experience');
    const startUI = document.getElementById('intro-start-ui');
    const enterUI = document.getElementById('intro-enter-ui');
    const enterBtn = document.getElementById('btn-enter-premises');
    const introVideo = document.getElementById('intro-video');
    const burstCircle = document.querySelector('.burst-circle');

    if(introGate && introVideo) {
        // Lock scrolling entirely so user can't scroll past the intro gate!
        document.body.style.overflow = 'hidden';

        startBtn.addEventListener('click', () => {
            // Hide the 'Click to Begin' UI
            startUI.style.opacity = '0';
            setTimeout(() => { startUI.style.display = 'none'; }, 1000);
            
            // Play video with audio out loud
            introVideo.play().then(() => {
                introVideo.classList.add('playing');
            }).catch(err => {
                console.error("Browser blocked video playback:", err);
            });
        });

        // Listen for the exact moment the video finishes
        introVideo.addEventListener('ended', () => {
            // Reveal the 'Enter the premises' Button
            enterUI.style.display = 'flex';
            // Slight delay ensures display block registers before animating opacity
            setTimeout(() => { enterUI.style.opacity = '1'; }, 50); 
        });

        // The Theatrical Burst Transition
        enterBtn.addEventListener('click', () => {
             // Hide Enter button
             enterUI.style.opacity = '0';
             
             // Trigger Burst Animation Flash
             burstCircle.classList.add('active');
             
             // After a brief delay (timing the expansion), fade out the intro gate and unlock the site
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
        });
    }
    // --- End Intro Gate ---

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
                    const ratio  = Math.max(hRatio, vRatio);
                    const centerShift_x = (canvas.width - img.width * ratio) / 2;
                    const centerShift_y = (canvas.height - img.height * ratio) / 2;  
                    
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio); 
                }

                // Draw frame 0 immediately when loaded
                images[0].addEventListener('load', render);

                // GSAP scrub linking frame index to scroll progress (Top to bottom of page)
                gsap.to(sequence, {
                    frame: frameCount - 1,
                    snap: "frame",
                    ease: "none",
                    scrollTrigger: {
                        scrub: 0.5, // 0.5s smoothing
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                    },
                    onUpdate: render
                });

                // Dynamically brighten canvas exactly when projects section enters viewport
                gsap.to(canvas, {
                    opacity: 0.7,
                    scrollTrigger: {
                        trigger: ".projects-section",
                        start: "top center",
                        end: "bottom bottom",
                        scrub: true
                    }
                });
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

            // 3. About text cinematic fade up
            gsap.fromTo('.about-content p', 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".about-section",
                        start: "top 85%",
                    }
                }
            );
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