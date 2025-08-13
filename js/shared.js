document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.gallery-link img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

  let currentIndex = 0;

  const updateLightboxImage = (index) => {
    lightboxImg.src = images[index].src;
    currentIndex = index;
  };

  images.forEach((img, index) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      lightbox.style.display = 'flex';
      updateLightboxImage(index);
    });
  });

  leftArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage(currentIndex);
  });

  rightArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage(currentIndex);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;

    switch (e.key) {
      case 'ArrowLeft':
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage(currentIndex);
        break;
      case 'ArrowRight':
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage(currentIndex);
        break;
      case 'Escape':
        lightbox.style.display = 'none';
        break;
    }
  });
});
