// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (contactForm.checkValidity()) {
                // Simulate form submission
                setTimeout(function() {
                    // Show success toast
                    const toast = new bootstrap.Toast(document.getElementById('liveToast'));
                    const toastBody = document.querySelector('.toast-body');
                    toastBody.textContent = 'Message sent successfully!';
                    toast.show();
                    
                    // Reset form
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                }, 1000);
            }
            
            contactForm.classList.add('was-validated');
        }, false);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Initialize charts
    if (document.getElementById('radarChart')) {
        initRadarChart();
    }
    
    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image').style.transform = 'scale(1)';
        });
    });
    
    // Toast notification initialization
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        
        // Example of showing toast after 3 seconds
        setTimeout(function() {
            const toastBody = document.querySelector('.toast-body');
            toastBody.textContent = 'Welcome to my portfolio! Feel free to explore.';
            toast.show();
        }, 3000);
    }
});


// Add this to your main.js file or create a new file for Resume download functionality

// document.addEventListener('DOMContentLoaded', function() {
//     // Download Resume Button Functionality
//     const Download_ResumeBtn = document.getElementById('Download_Resume');
    
//     if (Download_ResumeBtn) {
//         Download_ResumeBtn.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             // Show loading state
//             const originalText = Download_ResumeBtn.innerHTML;
//             Download_ResumeBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Preparing Resume...';
//             Download_ResumeBtn.disabled = true;
            
//             // Simulate network request (replace with actual Resume download)
//             setTimeout(function() {
//                 // Reset button state
//                 Download_ResumeBtn.innerHTML = originalText;
//                 Download_ResumeBtn.disabled = false;
                
//                 // Create a temporary anchor element to trigger download
//                 const link = document.createElement('a');
//                 link.href = 'assets/ashif_resume.pdf'; // Replace with actual path to your Resume
//                 link.download = 'ashif_resume.pdf'; // Customize the filename
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
                
//                 // Show success toast
//                 const toast = new bootstrap.Toast(document.getElementById('liveToast'));
//                 const toastBody = document.querySelector('.toast-body');
//                 toastBody.textContent = 'Resume downloaded successfully!';
//                 toast.show();
                
//                 // Track download event (optional)
//                 console.log('Resume download initiated');
                
//                 // You can also use analytics here:
//                 // ga('send', 'event', 'Resume', 'download');
//             }, 1500); // Simulate network delay
//         });
        
//         // Add hover effect
//         Download_ResumeBtn.addEventListener('mouseenter', function() {
//             this.querySelector('i').classList.add('fa-bounce');
//         });
        
//         Download_ResumeBtn.addEventListener('mouseleave', function() {
//             this.querySelector('i').classList.remove('fa-bounce');
//         });
//     }
// });

// Enhanced Resume Download Functionality
document.addEventListener('DOMContentLoaded', function() {
    const Download_ResumeBtn = document.getElementById('Download_Resume');
    
    if (Download_ResumeBtn) {
        // Check if Resume is available
        function checkResumeAvailability() {
            return new Promise((resolve) => {
                // In a real scenario, you might ping the server to check file existence
                setTimeout(() => resolve(true), 500); // Simulate check
            });
        }
        
        // Initialize button state
        checkResumeAvailability().then((available) => {
            if (!available) {
                Download_ResumeBtn.disabled = true;
                Download_ResumeBtn.title = "resume currently unavailable";
                Download_ResumeBtn.querySelector('i').className = 'fas fa-exclamation-circle me-2';
            }
        });
        
        // Download handler
        async function handleResumeDownload() {
            try {
                // Show loading state
                const originalText = Download_ResumeBtn.innerHTML;
                Download_ResumeBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Preparing resume...';
                Download_ResumeBtn.disabled = true;
                
                // Check availability
                const isAvailable = await checkResumeAvailability();
                
                if (!isAvailable) {
                    throw new Error("resume not available");
                }
                
                // Simulate download delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Trigger download
                const ResumeUrl = 'assets/ashif_resume.pdf';
                const ResumeName = 'ashif_resume.pdf';
                
                // Method 1: Standard download
                const link = document.createElement('a');
                link.href = ResumeUrl;
                link.download = ResumeName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Method 2: For larger files or tracking purposes
                // window.open(ResumeUrl, '_blank');
                
                // Show success
                showToast('resume downloaded successfully!', 'success');
                
                // Analytics (optional)
                trackDownloadEvent();
                
            } catch (error) {
                console.error('Download error:', error);
                showToast('Failed to download resume. Please try again later.', 'error');
            } finally {
                // Reset button
                Download_ResumeBtn.innerHTML = '<i class="fas fa-download me-2"></i> Download Resume';
                Download_ResumeBtn.disabled = false;
            }
        }
        
        // Helper functions
        function showToast(message, type = 'success') {
            const toastEl = document.getElementById('liveToast');
            if (!toastEl) return;
            
            const toast = new bootstrap.Toast(toastEl);
            const toastBody = toastEl.querySelector('.toast-body');
            const toastHeader = toastEl.querySelector('.toast-header');
            
            // Style based on type
            if (type === 'error') {
                toastHeader.classList.add('bg-danger', 'text-white');
                toastHeader.querySelector('strong').textContent = 'Error';
            } else {
                toastHeader.classList.remove('bg-danger', 'text-white');
                toastHeader.querySelector('strong').textContent = 'Success';
            }
            
            toastBody.textContent = message;
            toast.show();
        }
        
        function trackDownloadEvent() {
            // Implement your analytics tracking here
            console.log('resume download tracked');
            // Example: ga('send', 'event', 'Resume', 'download');
        }
        
        // Event listener
        Download_ResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleResumeDownload();
        });
        
        // Animation effects
        Download_ResumeBtn.addEventListener('mouseenter', function() {
            this.querySelector('i').classList.add('fa-shake');
        });
        
        Download_ResumeBtn.addEventListener('mouseleave', function() {
            this.querySelector('i').classList.remove('fa-shake');
        });
    }
});

// Cookie Consent Logic
document.addEventListener('DOMContentLoaded', function() {
    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    // Only show if no decision made yet
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'block';
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
    });
    
    declineCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.style.display = 'none';
    });

    // Resume Download Button
    const downloadBtn = document.getElementById('Download_Resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Replace with your actual resume URL
            const resumeUrl = 'assets/ashif_resume.pdf';
            
            // Create temporary link
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Ashif_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Track download (if cookies accepted)
            if (localStorage.getItem('cookieConsent') === 'accepted') {
                console.log('Resume download tracked');
            }
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
// neeeeeeeeeeewwwwww
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-top-btn';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
//Optional Toggle button text using JS more and less project, certifications
// document.addEventListener('DOMContentLoaded', function () {
//     const toggleButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');

//     toggleButtons.forEach(btn => {
//         const target = document.querySelector(btn.getAttribute('data-bs-target'));
//         btn.addEventListener('click', () => {
//             setTimeout(() => {
//                 btn.textContent = target.classList.contains('show') ? 'View All Projects' : 'Show Less';
//             }, 300);
//         });
//     });
// });
