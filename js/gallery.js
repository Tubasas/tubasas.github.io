import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#hero-gallery',
    children: 'a',
    pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.js')
});

lightbox.init();