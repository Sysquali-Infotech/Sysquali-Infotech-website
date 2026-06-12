// Sysquali Infotech Premium Core Logic Implementation
document.addEventListener("DOMContentLoaded", () => {
    
    // Navbar Background Color Toggle on Scroll
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Responsive Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if(menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Scroll Reveal Animation Hook
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = revealElements[i].getBoundingClientRect().top;
            let elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add("active");
            }
        }
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger instantly to show above-the-fold content

    // Interactive Animated Counters
    const counters = document.querySelectorAll(".counter-value");
    const speed = 150;
    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;
            if(data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 15);
            } else {
                counter.innerText = value + "+";
            }
        };
        
        // Trigger counter animation when visible
        let observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting === true) {
                animate();
                observer.unobserve(counter);
            }
        }, { threshold: [0.5] });
        observer.observe(counter);
    });

    // Testimonials Automatic & Dot Click Carousel
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        if(slides[index]) {
            slides[index].classList.add("active");
            dots[index].classList.add("active");
        }
    };

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    if(slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Dynamic Generic Form Modal / Toast simulation
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your information has been securely submitted to Sysquali Infotech. Our specialists will reach out shortly.");
            form.reset();
        });
    });
});
