import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.js';

const galleryElement = document.querySelector('#hero-gallery');

if (galleryElement) {
    const resizeObserver = new ResizeObserver((entries) => {
        const styles = getComputedStyle(galleryElement);
        const rowHeight = parseFloat(styles.gridAutoRows);
        const rowGap = parseFloat(styles.rowGap);

        for (const { target } of entries) {
            const height = target.getBoundingClientRect().height;
            const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
            target.style.gridRowEnd = `span ${rowSpan}`;
        }
    });

    galleryElement.querySelectorAll('.photo-gallery-item').forEach((item) => {
        resizeObserver.observe(item);
    });
}

const lightbox = new PhotoSwipeLightbox({
    gallery: '#hero-gallery',
    children: 'a',
    pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.js')
});

lightbox.init();