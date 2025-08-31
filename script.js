document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    let currentFilteredItems = [];

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            currentFilteredItems = [];

            galleryItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.classList.remove('hide');
                    currentFilteredItems.push(item);
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Initial filter to show all images
    document.querySelector('.filter-btn[data-category="all"]').click();

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const currentItemsArray = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
            currentIndex = currentItemsArray.findIndex(element => element === item);
            
            showLightbox(item.dataset.src);
        });
    });

    // Show image in lightbox
    function showLightbox(src) {
        lightboxImage.src = src;
        lightbox.classList.add('show');
    }

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    // Navigate to next image
    nextBtn.addEventListener('click', () => {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hide)');
        if (visibleItems.length === 0) return;

        currentIndex = (currentIndex + 1) % visibleItems.length;
        const nextImageSrc = visibleItems[currentIndex].dataset.src;
        lightboxImage.src = nextImageSrc;
    });

    // Navigate to previous image
    prevBtn.addEventListener('click', () => {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hide)');
        if (visibleItems.length === 0) return;

        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        const prevImageSrc = visibleItems[currentIndex].dataset.src;
        lightboxImage.src = prevImageSrc;
    });

    // Close lightbox on outside click
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    // Keyboard navigation for lightbox (optional)
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
});