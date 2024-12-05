$(function () {
  const $bannerContainer = $('#banner-container');
  const $bannerLi = $bannerContainer.children('ul').children('li');
  const $bannerBtn = $('#banner-container > .banner-btn');
  const SLIDEDURATION = 700;

  const $window = $(window);
  let windowWidth = $window.width();
  const maxMobileWidth = 768;

  // 배너
  const $firstBannerItems = $(`#banner-container > ul > li:nth-child(1)`).children();
  bannerItemSlide($firstBannerItems);

  let bannerIndex = 0;
  let isClick = false;
  const $bannerIndicator = $('#banner-indicator > li');

  // 배너 자동 슬라이드
  let bannerTimer = window.setInterval(() => {
    bannerRightAnimation();
  }, 5000);

  $bannerContainer.on({
    mouseenter: () => { clearInterval(bannerTimer) },
    mouseleave: () => { bannerTimer = window.setInterval(bannerRightAnimation, 3000) }
  });

  // 배너 right
  $bannerBtn.eq(1).on('click', function () {
    bannerRightAnimation();
  });

  function bannerRightAnimation () {
    if ($bannerLi.is(":animated") || isClick) return;

    isClick = true;
    window.setTimeout(function () {
      isClick = false;
    }, SLIDEDURATION + 200);
    bannerIndex++;

    if (bannerIndex == $bannerLi.length) {
      // $(`#banner-container > ul > li:nth-child(${$bannerLi.length}`).children().removeAttr('style');
      removeStyle($bannerLi.length);
      $bannerLi.eq($bannerLi.length - 1).animate({
        opacity: '0'
      });
      bannerIndex = 0;
    }
    $bannerLi.eq(bannerIndex).animate({
      opacity: '1'
    });
    window.setTimeout(function () {
      $bannerLi.eq(bannerIndex - 1).removeAttr('style');
    }, 400);

    // 배너 타이틀, 이미지 슬라이드
    const $bannerItems = $(`#banner-container > ul > li:nth-child(${bannerIndex + 1})`).children();
    bannerItemSlide($bannerItems);
    // $(`#banner-container > ul > li:nth-child(${bannerIndex})`).children().removeAttr('style');
    removeStyle(bannerIndex);

    changeClass(bannerIndex);
  }

  // 배너 left
  $bannerBtn.eq(0).on('click', function () {
    if ($bannerLi.is(":animated") || isClick) return;

    isClick = true;
    window.setTimeout(function () {
      isClick = false;
    }, SLIDEDURATION + 200);

    if (bannerIndex == 0) {
      // $(`#banner-container > ul > li:nth-child(1)`).children().removeAttr('style');
      removeStyle(1);
      bannerIndex = $bannerLi.length;
      $bannerLi.eq(0).css('z-index', '1').animate({
        opacity: '0'
      });
      $bannerLi.eq($bannerLi.length - 1).css('opacity', '1');
      window.setTimeout(function () {
        $bannerLi.eq(0).css('z-index', '0');
      }, 400);
    }
    bannerIndex--;
    $bannerLi.eq(bannerIndex).css('opacity', '1');
    $bannerLi.eq(bannerIndex + 1).animate({
      opacity: '0'
    });

    // 배너 타이틀, 이미지 슬라이드
    const $bannerItems = $(`#banner-container > ul > li:nth-child(${bannerIndex + 1})`).children();
    bannerItemSlide($bannerItems);
    // $(`#banner-container > ul > li:nth-child(${bannerIndex + 2})`).children().removeAttr('style');
    removeStyle(bannerIndex + 2);

    changeClass(bannerIndex);
  });

  // 배너 타이틀, 이미지 슬라이드
  function bannerItemSlide(items) {
    items.each(function (index, item) {
      window.setTimeout(function () {
        if (index == 0) {
          $(item).animate({
            opacity: '1',
            top: '50%'
          }, SLIDEDURATION);
        } else {
          $(item).children().animate({
            opacity: '1',
            bottom: '0'
          }, SLIDEDURATION);
        }
      }, index * 160);
    });
  }

  // 인디케이터 클래스 변경
  function changeClass(index) {
    $bannerIndicator.removeClass('on');
    $bannerIndicator.eq(index).addClass('on');
  }

  // 스타일 제거
  function removeStyle(index) {
    $(`#banner-container > ul > li:nth-child(${index}`).children().removeAttr('style').children().removeAttr('style');
    // $(`#banner-container > ul > li:nth-child(${index}`).children('a').children().removeAttr('style');
  }

  const $productContainer = $("main > .product-container");
  // 제품리스트 스크롤 이벤트
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const $target = $(entry.target);

      if (entry.isIntersecting) {
        $target.animate({
          opacity: '1'
        }, 700);
      }
      // else {
      //   $target.animate({
      //     opacity: '0'
      //   }, 700);
      // }
    });
  });

  $productContainer.each(function (index, item) {
    io.observe(item);
  });


  // 이벤트1
  const $event1Items = $('#event1-list > li');
  const $eventContainer = $('#event1-container');
  const $event1Div = $('#event1-container > div');

  $event1Items.each((index, item) => {
    $(item).on('mouseenter', function () {
      changeEvent1(index);
    });
  });

  $window.on('resize', () => {
    windowWidth = $window.width();
    if (windowWidth == maxMobileWidth) {
      changeEvent1(0);
    }
  });

  // 모바일 버튼 클릭
  const $event1Btn = $eventContainer.children('button');
  let event1CurrentIndex = 0;
  const event1ListLength = $event1Items.length;
  $event1Btn.eq(0).on('click', () => {
    $event1Items.eq(event1CurrentIndex).css('display', 'none');
    if (event1CurrentIndex == 0) {
      $event1Items.eq(event1ListLength - 1).css('display', 'block');
      event1CurrentIndex = event1ListLength - 1;
      changeEvent1(event1CurrentIndex);
    } else {
      $event1Items.eq(event1CurrentIndex - 1).css('display', 'block');
      event1CurrentIndex--;
      changeEvent1(event1CurrentIndex);
    }
  });

  $event1Btn.eq(1).on('click', () => {
    $event1Items.eq(event1CurrentIndex).css('display', 'none');
    if (event1CurrentIndex == event1ListLength - 1) {
      $event1Items.eq(0).css('display', 'block');
      event1CurrentIndex = 0;
      changeEvent1(event1CurrentIndex);
    } else {
      $event1Items.eq(event1CurrentIndex + 1).css('display', 'block');
      event1CurrentIndex++;
      changeEvent1(event1CurrentIndex);
    }
  });

  function changeEvent1 (index) {
    $event1Div.children('h3').text($event1Items.eq(index).children().children('a').text());
    $event1Div.children('p').text($event1Items.eq(index).children().children('span').text());
    $eventContainer.css('background', `url("images/event1_bg${index + 1}.png")`);
  }

  // 제품 리스트 슬라이드
  // const productSlideWidth = 363;
  let $productLi = $("main > .product-container > div > ul > li");
  let productSlideWidth = $productLi.width();

  $window.on('resize', () => {
    // let $productLi = $("main > .product-container > div > ul > li");
    productSlideWidth = $productLi.width();
  });
  
  $productContainer.each((index, item) => {
    const $productListBtn = $(item).children('button');
    const $productUl = $(item).children('div:nth-child(2)').children();
    productSlideLeft($productListBtn.eq(0), $productUl);
    productSlideRight($productListBtn.eq(1), $productUl);
    // productSlideRight();
  });

  function productSlideLeft(target, ul) {
    target.on('click', function () {
      if (ul.is(':animated')) return;

      if (ul.children().length == 5) {
        ul.append(ul.children(':last').clone());
        window.setTimeout(() => {
          ul.children(':last').remove();
        }, 400);
      }

      ul.css('margin-left', `-${productSlideWidth}px`).children(':last').prependTo(ul);

      ul.animate({
        marginLeft: '0px'
      });
    });
  }
   function productSlideRight(target, ul) {
      // right
      target.on('click', function () {
        if (ul.is(':animated')) return;

        if (ul.children().length == 5) {
          ul.append(ul.children(':first').clone());
          window.setTimeout(() => {
            ul.children(':last').remove();
          }, 400);
        }

        ul.animate({
          marginLeft: `-${productSlideWidth}px`
        }, function () {
          $(this).removeAttr('style').children(':first').appendTo(this);
        });  
        
      });
   }

  // 이벤트2
  // const $event2Container = $('#event2-container');
  const $eventUl = $('#event2-container > ul');

  $eventUl.children().eq(0).clone().appendTo($eventUl);
  $eventUl.children().eq(2).clone().prependTo($eventUl);
  $eventUl.children().eq(2).clone().prependTo($eventUl);

  const $event2items = $('#event2-container > ul > li');
  $event2items.eq(2).children().children().addClass('on');

  let currentIndex = 2;

  $event2items.each((index, item) => {
    $(item).on('click', (event) => {
      if (currentIndex == 5 && index == 0) {
        event.preventDefault();
        slideRightEvent2($(item), index - 3, index);
      } else if (currentIndex == 0 && index == 5) {
        event.preventDefault();
        slideLeftEvent2($(item), 3, index);
      } else if (index > currentIndex) {
        event.preventDefault();
        slideRightEvent2($(item), index - 3, index);
      } else if (index < currentIndex) {
        event.preventDefault();
        slideLeftEvent2($(item), index - 2, index);
      }
    });
  });

  // 자동 슬라이드
  let event2Timer = window.setInterval(autoSlideEvent2, 3000);

  $eventUl.on({
    mouseenter: () => { clearInterval(event2Timer) },
    mouseleave: () => { event2Timer = window.setInterval(autoSlideEvent2, 3000) }
  });

  // 이벤트2 슬라이드
  const event2SlideWidth = 690;
  const event2MobileSlideWidth = 200;
  function slideRightEvent2(item, eqIndex, index) {
    if (windowWidth <= maxMobileWidth) {
      $eventUl.animate({
        marginLeft: `-${event2MobileSlideWidth}px`
      });
    } else {
      $eventUl.animate({
        marginLeft: `-${event2SlideWidth}px`
      });
    }
    $event2items.children().children().removeClass('on');
      item.children().children().addClass('on');
  
      window.setTimeout(() => {
        $event2items.eq(eqIndex).appendTo($eventUl);
        $eventUl.css('margin-left', '0');
      }, 400);
      currentIndex = index;
  }

  function slideLeftEvent2(item, eqIndex, index) {
    if (windowWidth <= maxMobileWidth) {
      $eventUl.animate({
        marginLeft: `${event2MobileSlideWidth}px`
      });
    } else {
      $eventUl.animate({
        marginLeft: `${event2SlideWidth}px`
      });
    }
    $event2items.children().children().removeClass('on');
    item.children().children().addClass('on');

    window.setTimeout(() => {
      $event2items.eq(eqIndex).prependTo($eventUl);
      $eventUl.css('margin-left', '0');
    }, 400);
    currentIndex = index;
  }

  function autoSlideEvent2() {
    if (windowWidth <= maxMobileWidth) {
      $eventUl.animate({
        marginLeft: `-${event2MobileSlideWidth}px`
      });
    } else {
      $eventUl.animate({
        marginLeft: `-${event2SlideWidth}px`
      });
    }

    $event2items.children().children().removeClass('on');
    if (currentIndex == 5) {
      $event2items.eq(0).children().children().addClass('on');
    } else {
      $event2items.eq(currentIndex + 1).children().children().addClass('on');
    }


    window.setTimeout(() => {
      if (currentIndex < 3) {
        $event2items.eq((3 + currentIndex) % 6).appendTo($eventUl);
      } else {
        $event2items.eq(currentIndex - 3).appendTo($eventUl);
      }
      $eventUl.css('margin-left', '0');
    }, 400);
    if (currentIndex == 5) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
  }

});