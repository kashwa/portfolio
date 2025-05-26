// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('section');
const skillLevels = document.querySelectorAll('.skill-level');
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

// Navigation Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  
  // Update icon
  const themeIcon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = themeToggle.querySelector('i');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  
  // Initialize skill bars with animation
  setTimeout(() => {
    skillLevels.forEach(level => {
      level.style.width = level.style.width;
    });
  }, 500);
});

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
  
  // Reveal elements on scroll
  revealOnScroll();
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header
        behavior: 'smooth'
      });
    }
  });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const scrollPosition = window.scrollY;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
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

// Reveal elements on scroll
function revealOnScroll() {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Form validation
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields');
      return;
    }
    
    // Submit the form - FormSubmit.co is used for email forwarding
    this.submit();
    
    // Reset form after submission
    contactForm.reset();
  });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Trigger fade-in animations
  document.querySelectorAll('.fade-in').forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('active');
    }, 200 * index);
  });
  
  // Check for scroll position on load to reveal elements
  revealOnScroll();
  updateActiveNavLink();
});