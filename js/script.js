document.addEventListener('DOMContentLoaded', function () {
  function isSafari() {
    return (
      ~navigator.userAgent.indexOf('Safari') &&
      navigator.userAgent.indexOf('Chrome') < 0
    );
  }

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
    document.querySelector('body').classList.add('_touch');
    document.body.style.setProperty('--mobile', `none`);
  } else {
    document.querySelector('body').classList.add('_pc');
    document.body.style.setProperty('--mobile', `block`);
  }

  //lines bg move

  const makeTimelineLines = (item, height) => {
    const timeline = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });

    timeline
      .from(item, {
        x: '-50%',
        y: -20,
      })
      .to(item, {
        x: '-50%',
        y: height + 20,
        duration: 5 + Math.random() * 6,
      });

    return timeline;
  };

  const linesArr = document.querySelectorAll('.lines');

  if (linesArr.length !== 0) {
    linesArr.forEach((linesNode) => {
      const height = linesNode.getBoundingClientRect().height;

      //for each lines element
      const lines = linesNode.querySelectorAll('.lines-line');
      if (linesArr.length !== 0) {
        lines.forEach((line) => {
          //for each line in every lines
          const item = line.querySelector('.lines-line__item');

          if (!item) {
            return;
          }

          // item.style.transform = `translate3d(-50%, ${Math.floor(
          //   Math.random() * (height + 1) + 0
          // )}px, 0)`;
          item.style.opacity = '1';

          const timeline = makeTimelineLines(item, height);
          timeline.play(5 + Math.random() * 6);
        });
      }
    });
  }

  //normal vh
  const vh = window.innerHeight * 0.01;
  document.body.style.setProperty('--vh', `${vh}px`);

  // menu global open
  const doWhenMenuOpen = () => {
    document.querySelector('.cd-panel__header').classList.add('_opened');
    document.querySelector('.menu').classList.add('_opened');
    document.querySelector('html').classList.add('_lock');
    document.querySelector('body').classList.add('_lock');
  };

  document
    .querySelector('.menu__burger')
    .addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.add('_opened');
      document.querySelector('.btn-menu-fixed').classList.add('_hide');
      doWhenMenuOpen();
    });

  document
    .querySelector('.btn-menu-fixed')
    .addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.add('_hide');
      document.querySelector('.menu__burger').classList.add('_opened');
      doWhenMenuOpen();
    });

  // menu global close
  const closeAll = (arr) => {
    if (arr.length !== 0) {
      Array.from(arr).forEach((item) => {
        item.classList.remove('_opened');
      });
    }
  };

  const doWhenMenuClose = () => {
    document.querySelector('.cd-panel__header').classList.remove('_opened');
    document.querySelector('.menu__burger').classList.remove('_opened');
    document.querySelector('.menu').classList.remove('_opened');
    document.querySelector('.btn-menu-fixed').classList.remove('_hide');
    document.querySelector('.slimmenu-submenu').classList.remove('_lock');
    document.querySelector('html').classList.remove('_lock');
    document.querySelector('body').classList.remove('_lock');

    document.querySelector('.custom-select').classList.remove('_opened');

    const arrLevel1 = document.querySelectorAll('.level1');
    const arrLevel2 = document.querySelectorAll('.level2');
    closeAll(arrLevel1);
    closeAll(arrLevel2);
  };

  document
    .querySelector('.cd-panel__close')
    .addEventListener('click', function (e) {
      e.preventDefault();
      doWhenMenuClose();
    });

  //menu level 2,3 open/close
  const sbmenusLevel = document.querySelectorAll(
    '.has-submenu, .custom-select'
  );
  Array.from(sbmenusLevel).forEach((submenu) => {
    const submenuOpen =
      submenu.classList[0] === 'custom-select'
        ? submenu.querySelector('.custom-select__additional')
        : submenu.querySelector('.has-submenu__additional');

    const submenuClose =
      submenu.classList[0] === 'custom-select'
        ? submenu.querySelector('.custom-options__back')
        : submenu.querySelector('.sub-toggle-back');

    submenuOpen.addEventListener('click', function (e) {
      e.preventDefault();
      submenu.classList.add('_opened');
      let parent;

      if (Array.from(submenu.classList).includes('level2')) {
        //console.log(1);
        parent = submenu.parentElement;
      } else {
        parent = submenu.parentElement.parentElement;
      }

      //console.log(parent.scrollTop);

      parent.scrollTop = 0;
      setTimeout(() => {
        parent.classList.add('_lock');
      }, 300);
      // parent.scrollTo({
      //   top: 0,
      //   behavior: 'smooth',
      // });
    });

    submenuClose.addEventListener('click', function (e) {
      e.preventDefault();
      submenu.classList.remove('_opened');

      if (Array.from(submenu.classList).includes('level2')) {
        parent = submenu.parentElement;
      } else {
        parent = submenu.parentElement.parentElement;
      }

      parent.classList.remove('_lock');
    });
  });

  //menu open level 3 in the desktops
  const submenuAdditionalDesk = document.querySelectorAll(
    '.has-submenu__additional__desk'
  );

  if (submenuAdditionalDesk.length !== 0) {
    Array.from(submenuAdditionalDesk).forEach((item) => {
      item.addEventListener('click', function (e) {
        if (document.body.clientWidth <= 1199) {
          return;
        }

        e.preventDefault();
        this.parentElement.classList.add('_opened');
        //$('.menu').addClass('_lock')
      });
    });
  }

  //menu anchors
  const anchors = document.querySelectorAll('header ._anchor');
  if (anchors.length !== 0) {
    Array.from(anchors).forEach((anchor) => {
      anchor.addEventListener('click', (evt) => {
        evt.preventDefault();

        const sectionClass = evt.target.dataset.anchor;
        const section = document.querySelector(sectionClass);

        if (!section) {
          return null;
        }
        const paddingTop = parseInt(
          (section.currentStyle || window.getComputedStyle(section)).paddingTop
        );

        window.scrollTo({
          top: section.offsetTop + paddingTop / 2,
          behavior: 'smooth',
        });
      });
    });
  }

  //WHEEL ROTATE
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

  function stopAnimation(idAnimation) {
    cancelAnimationFrame(idAnimation);
  }

  let lastScroll = window.scrollY;

  const wheelRotate = (delta, isFirstStep = false) => {
    if (!wheel) {
      return;
    }
    if (isMobile.any()) {
      wheel.style.transform = '';
      return;
    }

    if (isFirstStep) {
      progress.target += delta;
    }

    progress.current = lerp(progress.current, progress.target, 0.15, 0.001);
    wheel.style.transform = `rotate(${progress.current}deg)`;

    if (progress.current === progress.target) {
      stopAnimation(idAnimation);
      //}
    } else {
      wheelRotate(progress.target);
    }
  };

  addEventListener('scroll', (evt) => {
    if (isMobile.any() || !wheel) {
      return;
    }

    const wheelSection = wheel.parentElement.parentElement;
    const wheelSectionRect = wheelSection.getBoundingClientRect();
    const wheelSectionHeight = wheelSectionRect.height;

    const y = Math.min(
      Math.max(
        (-wheelSectionRect.top + window.innerHeight / 2) /
          (wheelSectionHeight * 1.2),
        0
      ),
      1
    );

    if (y === 0 || y === 1) {
      return;
    }

    const delta = window.scrollY - lastScroll;
    lastScroll = window.scrollY;

    idAnimation = window.requestAnimationFrame(() => {
      wheelRotate((delta / 360) * 50, true);
    });
  });

  //recording car move
  const recordingSection = document.querySelector('.recording');
  let progressCar = {
    current: 0,
    target: 0,
  };
  let recordingCar;
  let idAnimationRecording = null;

  if (recordingSection) {
    recordingCar = recordingSection.querySelector('.recording__img img');
  }

  const carMove = (target) => {
    if (!recordingCar || !recordingSection) {
      return;
    }
    if (isMobile.any()) {
      recordingCar.style.transform = '';
      return;
    }
    progressCar.target = target;
    progressCar.current = lerp(
      progressCar.current,
      progressCar.target,
      0.15,
      0.001
    );

    recordingCar.style.transform = `translateX(${
      25 - progressCar.current * 100 * 0.25
    }%)`;

    if (progressCar.current === progressCar.target) {
      stopAnimation(idAnimationRecording);
    } else {
      carMove(progressCar.target);
    }
  };

  addEventListener('scroll', (evt) => {
    if (isMobile.any() || !recordingSection) {
      return;
    }

    const rect = recordingSection.getBoundingClientRect();
    const startY = -1 * (rect.top - window.innerHeight / 2);
    const y = Math.min(Math.max(startY, 0), rect.height);

    idAnimationRecording = window.requestAnimationFrame(() => {
      carMove(y / rect.height);
    });
  });

  //with-image sections parallax
  const withImageSections = document.querySelectorAll('.with-image');
  const startProgress = {
    current: 0,
    target: 0,
  };
  const progresses = [];
  let idImageAnimations = [];

  const withImageAnimate = (target, image, content, index) => {
    if (!image || !content) {
      return;
    }
    if (isMobile.any()) {
      image.style.transform = '';
      content.style.transform = '';
    }

    progresses[index].target = target;
    progresses[index].current = lerp(
      progresses[index].current,
      progresses[index].target,
      0.15,
      0.001
    );

    //console.log(progresses[0].current * 100);
    image.style.transform = `translateY(${-progresses[index].current * 10}%)`;
    // content.style.transform = `translateY(${-progresses[index].current}px)`;

    if (progresses[index].current === progresses[index].target) {
      stopAnimation(idImageAnimations[index]);
    } else {
      withImageAnimate(progresses[index].target, image, content, index);
    }
  };

  if (withImageSections && !isMobile.any()) {
    Array.from(withImageSections).forEach((section, index) => {
      progresses.push(startProgress);

      const image = section.querySelector('.with-image__img');
      const content = section.querySelector('.with-image__main');

      if (image.classList.contains('_static')) {
        return;
      }

      this.addEventListener('scroll', (evt) => {
        const rect = section.getBoundingClientRect();
        const startY = -1 * (rect.top - window.innerHeight / 2);
        const y = Math.min(Math.max(startY, 0), rect.height);

        const idAnimation = window.requestAnimationFrame(() => {
          withImageAnimate(y / rect.height, image, content, index);
        });

        idImageAnimations.push(idAnimation);
      });
    });
  }

  //price carKey animation
  const priceSection = document.querySelector('.price');
  const progressPrice = {
    currentX: 0,
    targetX: 0,
    currentY: 0,
    targetY: 0,
  };
  let priceImg;
  let idAnimationPrice = null;

  const priceImgMove = (targetX, targetY) => {
    if (!priceImg || !priceSection) {
      return;
    }
    if (isMobile.any()) {
      priceImg.style.transform = '';
      return;
    }
    const imgWidth = priceImg.getBoundingClientRect().width;
    const imgHeight = priceImg.getBoundingClientRect().height;

    progressPrice.targetX = targetX;
    progressPrice.targetY = targetY;

    progressPrice.currentX = lerp(
      progressPrice.currentX,
      progressPrice.targetX,
      0.15,
      0.01
    );

    progressPrice.currentY = lerp(
      progressPrice.currentY,
      progressPrice.targetY,
      0.15,
      0.01
    );

    priceImg.style.transform = `translate3d(${-progressPrice.currentX * 10}%, ${
      -progressPrice.currentY * 10
    }%, 0)`;

    if (
      priceImg.currentX === priceImg.targetX &&
      priceImg.currentY === priceImg.targetY
    ) {
      stopAnimation(idAnimationPrice);
    } else {
      priceImgMove(progressPrice.targetX, progressPrice.targetY);
    }
  };

  if (priceSection) {
    priceImg = priceSection.querySelector('.price__img__bg img');

    priceSection.addEventListener('mousemove', (evt) => {
      if (!priceImg || isMobile.any()) {
        return;
      }
      const rect = priceSection.getBoundingClientRect();
      const startY = rect.top;
      const startX = rect.left;

      const y =
        Math.min(Math.max(evt.clientY - startY, 0), rect.height) /
        (rect.height * 2);
      const x =
        Math.min(Math.max(evt.clientX - startX, 0), rect.width) /
        (rect.width * 2);

      idAnimationPrice = window.requestAnimationFrame(() => {
        priceImgMove(x, y);
      });
    });
  }

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
        if (isSafari()) {
          const svg = item.querySelector('.faq-list__mark svg');
          if (svg) {
            svg.classList.remove('_active');
          }
        } else {
          animationsSVG[index].reverse();
        }
        animations[index].reverse();
      } else {
        if (isSafari()) {
          const svg = item.querySelector('.faq-list__mark svg');
          if (svg) {
            svg.classList.add('_active');
          }
        } else {
          animationsSVG[index].play();
        }
        animations[index].play();
      }
      parent.classList.toggle('_active');
    });
  });

  //popup
  //timelines for popup
  const makeTimelinePopup = (item) => {
    const popupInner = item.querySelector('.popup__scroll');
    if (!popupInner) {
      return;
    }

    const timelinePopup = gsap.timeline({
      defaults: { duration: 0.3, ease: 'power4.inOut' },
    });
    timelinePopup
      .to(item, { display: 'block', duration: 0.01 })
      .to(item, { opacity: 1 })
      .to(popupInner, { x: 0 });

    return timelinePopup;
  };

  const popupAnimations = {};
  const popups = document.querySelectorAll('.popup');

  if (Array.from(popups).length !== 0) {
    Array.from(popups).forEach((popup) => {
      const timeline = makeTimelinePopup(popup);
      timeline.pause();
      popupAnimations[popup.dataset.popupname] = timeline;
    });
  }

  //open popup
  const popupOpenBtns = document.querySelectorAll('.popup-open');

  const openPopup = (evt) => {
    const popupClass = evt.target.dataset.popup;
    const popup = document.querySelector(`.${popupClass}`);

    popupAnimations[popupClass].play();

    popup.classList.add('_opened');
    document.querySelector('html').classList.add('_lock');
    document.querySelector('body').classList.add('_lock');
  };

  if (popupOpenBtns) {
    Array.from(popupOpenBtns).forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();
        openPopup(evt);
      });
    });
  }

  //close popup
  const popupCloseBtns = document.querySelectorAll('.popup__close');
  const popupArr = document.querySelectorAll('.popup');

  const closePopup = (popup) => {
    popup.classList.remove('_opened');
    const popupClass = popup.dataset.popupname;
    //console.dir(popup);
    popupAnimations[popupClass].reverse();

    document.querySelector('html').classList.remove('_lock');
    document.querySelector('body').classList.remove('_lock');
  };

  if (popupCloseBtns) {
    Array.from(popupCloseBtns).forEach((item) => {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const popup = this.parentElement.parentElement.parentElement;
        closePopup(popup);
      });
    });
  }

  if (popupArr) {
    Array.from(popupArr).forEach((item) => {
      item.addEventListener('click', function (evt) {
        if (evt.target === this) {
          closePopup(this);
        }
      });
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        const popup = document.querySelector('.popup._opened');
        if (popup) {
          closePopup(popup);
        }
      }
    });
  }

  //consultation car parking animation
  const consultationSection = document.querySelector('.consultation');
  let consultationCar = null;

  const makeTimelineParking = (item) => {
    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 3, ease: 'power4.inOut' },
    });
    timeline.to(item, { x: 20, y: -50, rotation: -10 });
    timeline.to(item, { x: 20, y: 40, rotation: -35, duration: 4.5 });
    timeline.to(item, { x: -10, y: -50, rotation: -35 });
    timeline.to(item, { x: 0, y: 25, rotation: -15 });
    timeline.to(item, { x: 0, y: 0, rotation: 0 });
    // timeline.to(item, { y: 50 });

    return timeline;
  };

  if (consultationSection) {
    consultationCar = consultationSection.querySelector(
      '.consultation__img img'
    );

    if (!isMobile.any()) {
      const timeline = makeTimelineParking(consultationCar);

      window.addEventListener('scroll', () => {
        const sectionRect = consultationSection.getBoundingClientRect();
        const sectionHeight = sectionRect.height;

        let isAnimationPlay = false;

        const y = Math.min(
          Math.max(
            (-sectionRect.top + window.innerHeight / 2) / (sectionHeight * 1.2),
            0
          ),
          1
        );

        if (y > 0 && y < 1 && !isAnimationPlay) {
          timeline.play();
          isAnimationPlay = true;
          return;
        }

        timeline.pause();
        isAnimationPlay = false;
      });
    }
  }

  //comments hardcode
  const stars = document.querySelectorAll('.ec-rating-stars span');

  const makeActiveStars = (arr, activeIndex) => {
    arr.forEach((item, index) => {
      if (activeIndex >= index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  Array.from(stars).forEach((item, index, arr) => {
    item.addEventListener('click', () => {
      makeActiveStars(arr, index);
    });
  });

  //custom-form-select

  //animationFrame select-pointer
  let selectPointerAnimationId;
  const selectProgress = {
    current: 0,
    target: 0,
  };

  const selectPointerAnimate = (selectPointer, y) => {
    if (!selectPointer) {
      return;
    }
    if (isMobile.any()) {
      //console.log('mobile');
      selectPointer.style.display = 'none';
      return;
    }

    selectProgress.target = y;
    //selectProgress.current = selectProgress.target;
    selectProgress.current = lerp(
      selectProgress.current,
      selectProgress.target,
      0.15,
      0.001
    );
    selectPointer.style.transform = `translateY(${selectProgress.current}px)`;

    if (selectProgress.current === selectProgress.target) {
      cancelAnimationFrame(selectPointerAnimationId);
    } else {
      selectPointerAnimate(selectPointer, y);
    }
  };

  const selects = document.querySelectorAll('.custom-form-select');
  const selectsLength = Array.from(selects).length;

  Array.from(selects).forEach((select, index, selects) => {
    const selectOriginal = select.querySelector('select');
    const selectOriginalLength = selectOriginal.length;
    //console.log(selectOriginal, selectOriginalLength);

    /* For each element, create a new DIV that will act as the selected item: */
    const selectedItem = document.createElement('DIV');
    selectedItem.setAttribute('class', 'select-selected');
    selectedItem.innerHTML =
      selectOriginal.options[selectOriginal.selectedIndex].innerHTML;
    select.appendChild(selectedItem);

    /* For each element, create a new DIV that will contain the option list: */
    const customOptionList = document.createElement('DIV');
    customOptionList.setAttribute('class', 'select-items select-hide');

    if (document.body.clientWidth >= 1200) {
      const selectPointer = document.createElement('span');
      selectPointer.setAttribute('class', 'select-pointer');
      customOptionList.appendChild(selectPointer);

      customOptionList.addEventListener('mousemove', (evt) => {
        const rect = customOptionList.getBoundingClientRect();
        const startY = rect.top;
        const pointerCenter = selectPointer.getBoundingClientRect().height / 2;
        const y = Math.min(
          Math.max(evt.clientY - startY, pointerCenter),
          rect.height - pointerCenter
        );

        const progress = y - pointerCenter;
        //console.log(y);
        selectPointerAnimationId = window.requestAnimationFrame(() =>
          selectPointerAnimate(selectPointer, progress)
        );
      });
    }

    Array.from(selectOriginal).forEach((option, optionsIndex) => {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      const customOption = document.createElement('DIV');
      customOption.innerHTML = selectOriginal.options[optionsIndex].innerHTML;
      customOption.addEventListener('click', function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        const select = this.parentNode.parentNode.querySelector('select');
        const selectLength = select.length;
        const customSelectedItem = this.parentNode.previousSibling;

        Array.from(select).forEach(
          (optionChange, indexOptionChange, selectArr) => {
            if (selectArr[indexOptionChange].innerHTML === this.innerHTML) {
              selectArr.selectedIndex = indexOptionChange;
              customSelectedItem.innerHTML = this.innerHTML;

              const activeOptions =
                this.parentNode.querySelectorAll('.same-as-selected');
              Array.from(activeOptions).forEach((activeOption) => {
                activeOption.removeAttribute('class');
              });

              this.setAttribute('class', 'same-as-selected');
            }
          }
        );

        customSelectedItem.click();
      });
      customOptionList.appendChild(customOption);
    });

    select.appendChild(customOptionList);
    selectedItem.addEventListener('click', function (e) {
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });
  });

  function closeAllSelect(element) {
    /* A function that will close all select boxes in the document,
  except the current select box: */
    const arrNo = [];
    const selectItems = document.querySelectorAll('.select-items');
    const selectSelecteds = document.querySelectorAll('.select-selected');

    Array.from(selectSelecteds).forEach((selected, index) => {
      if (element === selected) {
        arrNo.push(index);
      } else {
        selected.classList.remove('selected-arrow-active');
      }
    });

    Array.from(selectItems).forEach((item, index) => {
      if (arrNo.indexOf(index)) {
        item.classList.add('select-hide');
      }
    });
  }

  //make table hover effect
  const tableWrappers = document.querySelectorAll('[data-line-effect]');
  let isTableEffectFinished = true;
  tableWrappers.length && !isMobile.any() ? tableEffect() : null;

  function tableEffect() {
    tableWrappers.forEach((tableWrapper) => {
      const tableRows = tableWrapper.querySelectorAll(
        '.price-list__row:not(._header)'
      );

      const effectSpeed = tableWrapper.dataset.lineEffect
        ? tableWrapper.dataset.lineEffect
        : 200;

      tableRows.length ? tableEffectItem(tableRows, effectSpeed) : null;
    });

    function tableEffectItem(tableRows, effectSpeed) {
      const effectTransition = `transition: transform ${effectSpeed}ms ease;`;
      const effectHover = `transform: translate3d(0px, 0%, 0px);`;
      const effectTop = `transform: translate3d(0px, -105%, 0px);`;
      const effectBottom = `transform: translate3d(0px, 105%, 0px);`;

      tableRows.forEach((tableRow) => {
        const innerContent = tableRow.innerHTML;
        tableRow.insertAdjacentHTML(
          'beforeend',
          `
        <div style="transform: translate3d(0px, 105%, 0px);" class="hover-table">
            <div style="transform: translate3d(0px, -105%, 0px);" class="hover-table__content">
                ${innerContent}
            </div>
        </div>
        `
        );

        tableRow.onmouseenter = tableRow.onmouseleave = tableRowActions;
      });

      function tableRowActions(e) {
        const tableRow = e.target;
        const tableRowItem = tableRow.querySelector('.hover-table');
        const tableRowContent = tableRow.querySelector('.hover-table__content');

        const tableRowHeight = tableRow.offsetHeight / 2;
        const tableRowPos =
          e.pageY - (tableRow.getBoundingClientRect().top + scrollY);

        if (!isTableEffectFinished) {
          return;
        }

        if (e.type === 'mouseenter') {
          isTableEffectFinished = false;
          tableRowItem.style.cssText =
            tableRowPos > tableRowHeight ? effectBottom : effectTop;
          tableRowContent.style.cssText =
            tableRowPos > tableRowHeight ? effectTop : effectBottom;

          setTimeout(() => {
            isTableEffectFinished = true;

            tableRowItem.style.cssText = effectHover + effectTransition;
            tableRowContent.style.cssText = effectHover + effectTransition;
          }, 5);
        }

        if (e.type === 'mouseleave') {
          setTimeout(() => {
            isTableEffectFinished = true;

            tableRowItem.style.cssText =
              tableRowPos > tableRowHeight
                ? effectBottom + effectTransition
                : effectTop + effectTransition;
            tableRowContent.style.cssText =
              tableRowPos > tableRowHeight
                ? effectTop + effectTransition
                : effectBottom + effectTransition;
          }, 2.5);
        }
      }
    }
  }

  //swipers
  let swiperBrands = new Swiper('.brands-swiper.swiper', {
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: '.brands__slider__container .swiper-button-next',
      prevEl: '.brands__slider__container .swiper-button-prev',
    },
    loopedSlides: 2,
    slidesPerView: 1,
    spaceBetween: 10,

    breakpoints: {
      768: {
        loopedSlides: 2,
        slidesPerView: 2,
        spaceBetween: 15,
      },
      899: {
        loopedSlides: 3,
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1199: {
        loopedSlides: 4,
        slidesPerView: 4,
        spaceBetween: 26,
      },
    },
  });

  let swiperComments = new Swiper('.comments-slider.swiper', {
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.comments__pagination__container',
      clickable: true,
    },
    navigation: {
      nextEl: '.comments__slider__container .swiper-button-next',
      prevEl: '.comments__slider__container .swiper-button-prev',
    },
    // autoHeight: true,
    loopedSlides: 2,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 97,

    // breakpoints: {
    //   768: {
    //     spaceBetween: 97,
    //   },
    //   899: {
    //     spaceBetween: 97,
    //   },
    //   1199: {
    //     spaceBetween: 97,
    //   },
    // },
  });

  let swiperGallery = new Swiper('.gallery-slider.swiper', {
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.gallery__slider__container .swiper-button-next',
      prevEl: '.gallery__slider__container .swiper-button-prev',
    },
    //autoHeight: true,
    loopedSlides: 2,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,

    // breakpoints: {
    //   768: {
    //     spaceBetween: 24,
    //   },
    //   899: {
    //     spaceBetween: 24,
    //   },
    //   1199: {
    //     spaceBetween: 24,
    //   },
    // },
  });
});
