/**
 * ChipIQ Website - Main JavaScript
 * Handles navigation, scroll effects, and interactive features
 */

(function() {
  'use strict';

  // DOM Elements
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const contactForm = document.querySelector('.contact-form');

  /**
   * Navigation Scroll Effect
   * Adds/removes class based on scroll position
   */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /**
   * Mobile Menu Toggle
   * Opens/closes mobile navigation
   */
  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Close Mobile Menu
   * Closes mobile navigation when clicking outside or on a link
   */
  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Smooth Scroll to Section
   * Handles smooth scrolling for anchor links
   */
  function smoothScrollToSection(e) {
    const href = this.getAttribute('href');
    
    // Only handle internal anchor links
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        closeMobileMenu();
      }
    }
  }

  /**
   * Scroll to Top Button
   * Shows/hides scroll-to-top button based on scroll position
   */
  function handleScrollTopButton() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  /**
   * Scroll to Top
   * Smoothly scrolls to the top of the page
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Handle Contact Form Submission
   * Validates and submits the contact form
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message')
    };
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    console.log('Form data:', data);
    
    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
  }

  /**
   * Animate Elements on Scroll
   * Adds animation classes to elements when they come into view
   */
  function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .solution-card, .doc-card, .blog-card, .step');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Highlight Active Navigation Link
   * Updates active nav link based on scroll position
   */
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /**
   * Initialize Particle Effect (Optional Enhancement)
   * Creates a subtle particle effect in the hero section
   */
  function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create a canvas for particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = 'rgba(220, 234, 247, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    // Only initialize particles on larger screens
    if (window.innerWidth > 768) {
      initParticles();
      animateParticles();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    });
  }

  /**
   * Maintain Scroll Position on Resize
   * Keeps the current section in view when layout changes
   */
  let currentSection = null;
  let resizeTimeout = null;
  
  function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 50;
    
    for (const section of sections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return section;
      }
    }
    return null;
  }
  
  function handleResize() {
    // Store the current section before resize completes
    if (!resizeTimeout) {
      currentSection = getCurrentSection();
    }
    
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
      // After resize is complete, scroll back to the same section
      if (currentSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = currentSection.offsetTop - navHeight;
        
        // Use instant scroll (no smooth behavior) to avoid jarring effect
        window.scrollTo({
          top: targetPosition,
          behavior: 'instant'
        });
      }
      
      resizeTimeout = null;
      currentSection = null;
    }, 150);
  }

  /**
   * Debounce Function
   * Limits the rate at which a function can fire
   */
  function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Initialize All Event Listeners
   */
  function init() {
    // Navbar scroll effect
    window.addEventListener('scroll', debounce(() => {
      handleNavbarScroll();
      handleScrollTopButton();
      highlightActiveSection();
    }, 10));
    
    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll for all anchor links (not just nav links)
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(link => {
      link.addEventListener('click', smoothScrollToSection);
    });
    
    // Scroll to top button
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Contact form submission
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    });
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Initialize particle effect
    initParticleEffect();
    
    // Handle window resize to maintain scroll position
    window.addEventListener('resize', handleResize);
    
    // Initial calls
    handleNavbarScroll();
    handleScrollTopButton();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();