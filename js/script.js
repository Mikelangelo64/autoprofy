$(document).ready(function () {
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  if (isMobile.any()) {
    $('body').addClass('_touch');
  } else {
    $('body').addClass('_pc');
  }

  //normal vh
  const vh = window.innerHeight * 0.01;
  document.body.style.setProperty('--vh', `${vh}px`);

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
  $('.menu__burger').click(function (e) {
    e.preventDefault();
    $(this).addClass('_opened');
    $('.btn-menu-fixed').addClass('_hide');
    $('html').addClass('_lock');
    $('body').addClass('_lock');
    $('.cd-panel__header').addClass('_opened');
    $('.menu').addClass('_opened');
  });

  $('.btn-menu-fixed').click(function (e) {
    e.preventDefault();
    $(this).addClass('_hide');
    $('.menu__burger').addClass('_opened');
    $('html').addClass('_lock');
    $('body').addClass('_lock');
    $('.cd-panel__header').addClass('_opened');
    $('.menu').addClass('_opened');
  });

  // menu global close
  $('.cd-panel__close').click(function (e) {
    e.preventDefault();
    $('.cd-panel__header').removeClass('_opened');
    $('.menu__burger').removeClass('_opened');
    $('.menu').removeClass('_opened');
    $('.btn-menu-fixed').removeClass('_hide');
    $('html').removeClass('_lock');
    $('body').removeClass('_lock');

    $('.custom-select').removeClass('_opened');
    $('.level1').removeClass('_opened');
  });

  //menu open level 2
  $('.has-submenu__additional, .custom-select__additional').click(function (e) {
    e.preventDefault();
    $(this).parent().addClass('_opened');
    $('.menu').addClass('_lock');
  });

  //menu close level 2
  $('.custom-options__back').click(function (e) {
    e.preventDefault();
    $(this).parent().parent().removeClass('_opened');
    $('.menu').removeClass('_lock');
  });

  $('.sub-toggle-back').click(function (e) {
    e.preventDefault();
    $(this).parent().parent().parent().removeClass('_opened');
    $('.menu').removeClass('_lock');
  });

  //menu open level 3 in the desktops
  $('.has-submenu__additional__desk').click(function (e) {
    if (document.body.clientWidth <= 1199) {
      return;
    }

    e.preventDefault();
    $(this).parent().addClass('_opened');
    //$('.menu').addClass('_lock')
  });

  const wheel = document.querySelector('._wheel img');
  //let progress = 0
  let progress = {
    current: 0,
    target: 0,
  };

  function lerp(current, target, ease, approximationLeft = 0.001) {
    const val = current * (1 - ease) + target * ease;
    const diff = Math.abs(target - val);
    if (diff <= approximationLeft) {
      return target;
    }
    return val;
  }

  let idAnimation = null;

  function stopAnimation() {
    cancelAnimationFrame(idAnimation);
  }

  let lastScroll = window.scrollY;
  let ticking = false;

  const wheelRotate = (delta) => {
    if (!wheel) {
      return;
    }
    if (isMobile.any()) {
      wheel.style.transform = '';
    }

    progress.target += delta;
    progress.current = lerp(progress.current, progress.target, 0.15, 2);
    wheel.style.transform = `rotate(${progress.current}deg)`;

    if (progress.current === progress.target) {
      stopAnimation(idAnimation);
    }
    // } else {
    //     wheelRotate(0)
    // }
  };

  addEventListener('scroll', (evt) => {
    if (isMobile.any()) {
      return;
    }

    const delta = window.scrollY - lastScroll;
    lastScroll = window.scrollY;

    //if(!ticking) {
    idAnimation = window.requestAnimationFrame(() => {
      wheelRotate((delta / 360) * 50);
      //ticking = false;
    });

    //     ticking = true;
    // }
  });
});

//FAQ
const faqBtns = document.querySelectorAll('.faq-list__summary');
const faqSVG = document.querySelectorAll('.faq-list__mark svg path');
const faqDetails = document.querySelectorAll('.faq-list__details');
const animations = [];
const animationsSVG = [];

const makeTimeline = (item) => {
  const timelineFaq = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power4.inOut' },
  });
  timelineFaq.to(item, { height: 'auto' }).to(item, { opacity: 1 }, '<0.3');

  return timelineFaq;
};

const makeTimelineSVG = (item) => {
  const timelineFaq = gsap.timeline({
    defaults: { duration: 0.15 },
  });
  timelineFaq
    .to(item, { d: 'path("M8 1.5 L8 8.5 L8 1.5")' })
    .to(item, { d: 'path("M15 8 L8 1.5 L1 8")' }, '>0.15');

  return timelineFaq;
};

if (Array.from(faqSVG).length !== 0) {
  Array.from(faqSVG).forEach((item) => {
    const itemAnimation = makeTimelineSVG(item);
    itemAnimation.pause();
    animationsSVG.push(itemAnimation);
  });
}

if (Array.from(faqDetails).length !== 0) {
  Array.from(faqDetails).forEach((item) => {
    const itemAnimation = makeTimeline(item);
    itemAnimation.pause();
    animations.push(itemAnimation);
  });
}

faqBtns.forEach((item, index) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    const parent = item.parentElement.parentElement;
    if (!parent) {
      return;
    }

    if (Array.from(parent.classList).includes('_active', 0)) {
      animationsSVG[index].reverse();
      animations[index].reverse();
    } else {
      animationsSVG[index].play();
      animations[index].play();
    }
    parent.classList.toggle('_active');
  });
});

//swipers
let swiperBrands = new Swiper('.brands-swiper.swiper', {
  // autoplay: {
  //   delay: 4500,
  //   disableOnInteraction: false,
  // },
  navigation: {
    nextEl: '.brands__slider__container .swiper-button-next',
    prevEl: '.brands__slider__container .swiper-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    899: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 26,
    },
  },
});
