// Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Skill bar animation
    const skillBars = document.querySelectorAll('.progress-bar');
    if (skillBars.length > 0) {
        const animateSkillBars = function() {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s ease-in-out';
                }, 100);
            });
        };
        
        const skillSection = document.getElementById('skills');
        if (skillSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(skillSection);
                }
            }, {threshold: 0.2});
            
            observer.observe(skillSection);
        }
    }
    
    // Project card hover animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Text animation for hero section
    const heroText = document.querySelector('.hero-section h1');
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Pulse animation for profile image
    const profileImage = document.querySelector('.profile-image-container');
    if (profileImage) {
        setInterval(() => {
            profileImage.classList.add('pulse');
            setTimeout(() => {
                profileImage.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
});

