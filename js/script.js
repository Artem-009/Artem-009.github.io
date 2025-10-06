if (document.body.classList.contains("homePg")) {
    document.querySelector('.js_introduction_img').addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });

    // JS for swiper
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 4,
        spaceBetween: 35,
        loop: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: { slidesPerView: 3, spaceBetween: 5 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 }
        }
    });
}
