// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});

// Handle Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const subject = form.querySelectorAll('input[type="text"]')[1]?.value || 'Không có chủ đề';
    const message = form.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    // Log form data (in real project, you'd send to a server)
    console.log({
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString('vi-VN')
    });
    
    // Show success message
    alert(`Cảm ơn ${name}! Tin nhắn của bạn đã được nhận. Tôi sẽ liên hệ với bạn sớm.`);
    
    // Reset form
    form.reset();
    
    // Optional: Disable button for 2 seconds after submission
    const submitBtn = form.querySelector('.btn-primary');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang gửi...';
    
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Gửi tin nhắn';
    }, 2000);
}

// Smooth scroll animation for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.project-card, .skill-category, .contact-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active nav link highlighting on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#c95fc7';
        } else {
            link.style.color = 'inherit';
        }
    });
});

// Add scroll reveal animation
window.addEventListener('load', () => {
    // Animate hero elements
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.animation = 'slideInLeft 0.8s ease forwards';
    }
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.animation = 'slideInRight 0.8s ease forwards 0.2s';
    }
});

// Add CSS animations programmatically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Prevent form from actually submitting to server
console.log('Portfolio portfolio.html script loaded successfully!');
