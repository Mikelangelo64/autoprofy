$(document).ready(function(){

    const isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera mini/i)
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function(){
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            )
        }
    }

    if(isMobile.any()){
        $('body').addClass('_touch')

    }else{
        $('body').addClass('_pc')
    }

    //header dropdown menu
    // if(document.body.clientWidth >= 1200) {
    //     $('.slimmenu-submenu').slideUp(0)
    //     $('.slimmenu .has-submenu').hover(function(e){
    //         $(this).toggleClass('_active-dropdown')
    //         $(this).children('.slimmenu-submenu').slideToggle(300)
    //     })
    // } else {

    // }

    //dropdown cities
    // $('.custom-options').slideUp(0)
    // $('.menu .custom-select').hover(function(e){
    //     $(this).toggleClass('_active-dropdown')
    //     $(this).children('.custom-options').slideToggle(300)
    // })

    // menu global open
    $('.menu__burger').click(function(e) {
        e.preventDefault()
        $(this).addClass('_opened')
        $('.btn-menu-fixed').addClass('_hide')
        $('html').addClass('_lock')
        $('body').addClass('_lock')
        $('.cd-panel__header').addClass('_opened')
        $('.menu').addClass('_opened')
    })

    $('.btn-menu-fixed').click(function(e) {
        e.preventDefault()
        $(this).addClass('_hide')
        $('.menu__burger').addClass('_opened')
        $('html').addClass('_lock')
        $('body').addClass('_lock')
        $('.cd-panel__header').addClass('_opened')
        $('.menu').addClass('_opened')
    })

    // menu global close
    $('.cd-panel__close').click(function(e) {
        e.preventDefault()
        $('.cd-panel__header').removeClass('_opened')
        $('.menu__burger').removeClass('_opened')
        $('.menu').removeClass('_opened')
        $('.btn-menu-fixed').removeClass('_hide')
        $('html').removeClass('_lock')
        $('body').removeClass('_lock')

        $('.custom-select').removeClass('_opened')
        $('.level1').removeClass('_opened')
    })

    //menu open level 2
    $('.has-submenu__additional, .custom-select__additional').click(function(e) {
        e.preventDefault()
        $(this).parent().addClass('_opened')
        $('.menu').addClass('_lock')
    })

    //menu close level 2
    $('.custom-options__back').click(function(e) {
        e.preventDefault()
        $(this).parent().parent().removeClass('_opened')
        $('.menu').removeClass('_lock')
    })

    $('.sub-toggle-back').click(function(e) {
        e.preventDefault()
        $(this).parent().parent().parent().removeClass('_opened')
        $('.menu').removeClass('_lock')
    })

    //menu open level 3 in the desktops
    $('.has-submenu__additional__desk').click(function(e) {
        if(document.body.clientWidth <= 1199) {
            return
        }

        e.preventDefault()
        $(this).parent().addClass('_opened')
        //$('.menu').addClass('_lock')
    })
})