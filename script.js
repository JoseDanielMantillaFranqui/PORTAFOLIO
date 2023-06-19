function menuShow() {
    let menuMobile = $('.mobile-menu');
    if (menuMobile.hasClass('open')) {
        menuMobile.slideUp().removeClass('open');
        $('.icon').attr('src', 'img/menu_white_36dp.svg');
    } else {
        menuMobile.slideDown().addClass('open');
        $('.icon').attr('src', 'img/close_white_36dp.svg');
    }
}
