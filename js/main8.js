var menuBar = document.querySelector('#menu_bar');
var navLinks = document.querySelector('.nav_links');
navLinks.style.top='-450px'

menuBar.onclick = function (){
    if(navLinks.style.top == '-450px'){
        navLinks.style.top ='50px';
    }else{
        navLinks.style.top='-450px';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlide = 0;
    let isAnimating = false;

    // İlk slaytı göster
    slides[0].style.display = 'block';
    slides[0].classList.add('active');

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        let newIndex;
        if (index >= slides.length) newIndex = 0;
        else if (index < 0) newIndex = slides.length - 1;
        else newIndex = index;

        slides[currentSlide].classList.remove('active');
        slides[currentSlide].style.display = 'none';
        
        slides[newIndex].style.display = 'block';
        
        setTimeout(() => {
            slides[newIndex].classList.add('active');
            currentSlide = newIndex;
            isAnimating = false;
        }, 50);
    }

    // Ok butonları için event listener'lar
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Dokunmatik kaydırma için
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector('.slider');
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        e.preventDefault(); // Sayfanın kaymasını engellemek için
    });

    slider.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Sağa kaydırma - önceki slide
                showSlide(currentSlide - 1);
            } else {
                // Sola kaydırma - sonraki slide
                showSlide(currentSlide + 1);
            }
        }
    });

    // Otomatik geçiş
    let autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Mouse hover durumunda otomatik geçişi durdur
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    // Menü elemanlarını seç
    const hamburger = document.querySelector('.menu_bar');
    const navMenu = document.querySelector('.nav_links');
    const body = document.body;

    // Sayfa herhangi bir yerine tıklandığında
    document.addEventListener('click', function(e) {
        // Eğer menü açıksa ve tıklanan yer hamburger menü değilse
        if (navMenu && navMenu.classList.contains('active')) {
            // Eğer tıklanan yer menünün kendisi veya hamburger butonu değilse
            if (!e.target.closest('.nav_links') && !e.target.closest('.menu_bar')) {
                // Menüyü kapat
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });

    // Dokunma olayı için
    document.addEventListener('touchstart', function(e) {
        // Eğer menü açıksa ve dokunulan yer hamburger menü değilse
        if (navMenu && navMenu.classList.contains('active')) {
            // Eğer dokunulan yer menünün kendisi veya hamburger butonu değilse
            if (!e.target.closest('.nav_links') && !e.target.closest('.menu_bar')) {
                // Menüyü kapat
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                e.preventDefault(); // Sayfanın kaymasını engelle
            }
        }
    });

    // Tüm mesaj at butonları için event listener
    document.querySelectorAll('a[href="#iletisim"], a[href="#contact"], .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.contact_form').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll olayını izle
    function checkScroll() {
        const elements = document.querySelectorAll('.innerurunler_child, .kalite-kart');
        
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Eleman görünür alanda ise
            if (rect.top < windowHeight - 50 && rect.bottom > 0) {
                // Kalite kartları için daha kısa gecikme
                const delay = element.classList.contains('kalite-kart') ? 100 : 200;
                setTimeout(() => {
                    element.classList.add('animate');
                }, index * delay);
            } else {
                // Eleman görünür alandan çıktığında
              //  element.classList.remove('animate');
            }
        });
    }

    // Sayfa yüklendiğinde ve scroll olayında kontrol et
    window.addEventListener('scroll', () => {
        requestAnimationFrame(checkScroll); // Daha smooth performans için
    });
    window.addEventListener('load', checkScroll);
});

// WhatsApp mesaj gönderme fonksiyonu
function sendToWhatsApp(e) {
    e.preventDefault();
    
    // Form verilerini al
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Form kontrolü
    if (!fullname || !email || !phone || !message) {
        alert('Lütfen tüm alanları doldurunuz.');
        return false;
    }
    
    // WhatsApp mesajını oluştur
    const text = `*Yeni İletişim Formu*%0A%0A` +
                `*İsim:* ${fullname}%0A` +
                `*Email:* ${email}%0A` +
                `*Telefon:* ${phone}%0A` +
                `*Mesaj:* ${message}`;
    
    // WhatsApp linkini oluştur
    const whatsappNumber = '905336377479'; // Sitenin WhatsApp numarası
    
    // Mobil kontrol
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Mobil cihaz için WhatsApp linki
        window.location.href = `whatsapp://send?phone=${whatsappNumber}&text=${text}`;
    } else {
        // Masaüstü için WhatsApp Web linki
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    }
    
    // Formu temizle
    document.getElementById('contactForm').reset();
    
    return false;
}

// Viewport'ta elemanın görünür olup olmadığını kontrol eden fonksiyon
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll olayını yöneten fonksiyon
function handleScroll() {
    const elements = document.querySelectorAll('.innerurunler_child, .kalite-kart');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Sayfa yüklendiğinde ve kaydırma sırasında kontrol et
