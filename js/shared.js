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

	const showPrev = () => {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		updateLightboxImage(currentIndex);
	};

	const showNext = () => {
		currentIndex = (currentIndex + 1) % images.length;
		updateLightboxImage(currentIndex);
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
		showPrev();
	});

	rightArrow.addEventListener('click', (e) => {
		e.stopPropagation();
		showNext();
	});

	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) {
			lightbox.style.display = 'none';
		}
	});

	document.addEventListener('keydown', (e) => {
		if (lightbox.style.display !== 'flex') return;

		switch (e.key) {
			case 'ArrowLeft': showPrev(); break;
			case 'ArrowRight': showNext(); break;
			case 'Escape': lightbox.style.display = 'none'; break;
		}
	});

	// --- Swipe support for mobile ---
	let touchStartX = 0;
	let touchEndX = 0;

	lightbox.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].screenX;
	}, { passive: true });

	lightbox.addEventListener('touchend', (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	}, { passive: true });

	function handleSwipe() {
		const swipeThreshold = 50; // px needed to trigger swipe
		const swipeDistance = touchEndX - touchStartX;

		if (Math.abs(swipeDistance) > swipeThreshold) {
			if (swipeDistance > 0) {
				showPrev(); // swipe right
			} else {
				showNext(); // swipe left
			}
		}
	}
});
