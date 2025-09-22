document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const secondaryNav = document.getElementById('secondaryNav');

  mobileMenuBtn.addEventListener('click', () => {
    secondaryNav.classList.toggle('hidden');
  });

  // Back to Top
  const backToTopBtn = document.getElementById('backToTop');

  window.onscroll = function () {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  };

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Carousel
  const carousel = document.getElementById('carousel');
  const carouselContainer = document.getElementById('carouselContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  const slides = carousel.children.length;
  let autoSlideInterval;
  let isPaused = false;

  function showSlide(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-blue-800', i === index); // Filled for current
      dot.classList.toggle('bg-gray-400', i !== index);
    });
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (!isPaused) {
        currentIndex = (currentIndex + 1) % slides;
        showSlide(currentIndex);
      }
    }, 5000);
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides) % slides;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides;
    showSlide(currentIndex);
  });

  // Dot click navigation
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index);
      showSlide(currentIndex);
    });
  });

  // Pause on hover
  carouselContainer.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  carouselContainer.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Initial setup
  showSlide(currentIndex);
  startAutoSlide();

  // Disclaimer
  const disclaimerBanner = document.getElementById('disclaimer');
  const closeButton = document.getElementById('closeDisclaimer');

  if (localStorage.getItem('disclaimerDismissed') === 'true') {
    disclaimerBanner.classList.add('hidden');
  }

  closeButton.addEventListener('click', () => {
    disclaimerBanner.classList.add('hidden');
    localStorage.setItem('disclaimerDismissed', 'true');
  });
});
