$(function () {
  // page1
  const $title = $('.content-container:nth-child(2) > div > div');
  const OPACITYDURATION = 600;

  $title.animate({
    opacity: '1'
  }, OPACITYDURATION);

  const $icecreamImgs = $('.content-container:nth-child(2) > div > .title-images');
  const $macaronImgs = $('.content-container:nth-child(2) > .macaron-images');
  const $span = $('.content-container:nth-child(2) > div > span');

  window.setTimeout(function () {
    $icecreamImgs.each(function (index, item) {
      window.setTimeout(function () {
        $(item).animate({
          opacity: '1'
        }, OPACITYDURATION).addClass("active");
      }, 200 * index);
    });
  }, 400);

  window.setTimeout(function () {
    $macaronImgs.animate({
      opacity: '1'
    }, OPACITYDURATION);
  }, 1100);

  window.setTimeout(function () {
    $span.animate({
      opacity: '1',
      top: '530px'
    }, OPACITYDURATION);
  }, 1500);

  // 페이지 스크롤
  const $window = $(window);
  const $html = $('html');

  const $nav = $('nav > ol > li');
  const $bluberryIcecream = $('.content-container:nth-child(2) > div > img:nth-child(4)');

  const $page2Items = $('.content-container:nth-child(3) > div > img');
  const $page2Logos = $('.content-container:nth-child(3) > div > div > img');
  const $page2p = $('.content-container:nth-child(3) > div > p');

  const $menuItems = $('#menu-list > li');
  const $menuTitle = $('#menu-list > li > h4');

  let pageIndex = 0;
  let isScroll = true;
  window.addEventListener('wheel', function (event) {
    event.preventDefault();
  }, { passive: false });

  // 페이지 스크롤
  $window.on('wheel', function (event) {
    if ($html.is(":animated") || $bluberryIcecream.is(":animated") || $title.is(":animated") || $icecreamImgs.is(":animated") || !isScroll) return;
    if (event.originalEvent.deltaY < 0) {
      if (pageIndex <= 0) return;
      pageIndex--;
    } else if (event.originalEvent.deltaY > 0) {
      if (pageIndex >= $('.content-container').length - 1) return;
      pageIndex++;
    }
    $html.animate({
      scrollTop: pageIndex * $window.height()
    });
  });

  // 스크롤 이벤트
  $window.scroll(function () {
    // page2 중앙 이미지
    if ($(this).scrollTop() == 0) {
      $bluberryIcecream.css('transform', 'rotate(0deg)').animate({
        top: '80px',
        left: '380px'
      }, 600, function () {
        $bluberryIcecream.animate({
          top: '110px'
        });
      });
      $page2Items.css('opacity', '0');
    }

    if ($(this).scrollTop() == $('.content-container:nth-child(3)').offset().top) {
      // page2 중앙 이미지
      $bluberryIcecream.css('transform', 'rotate(20deg)').animate({
        top: '1000px',
        left: '380px'
      }, 600, function () {
        $bluberryIcecream.animate({
          top: '950px',
          left: '380px'
        });
      });

      // page2 파티클
      window.setTimeout(function () {
        $page2Items.each(function (index, item) {
          $(item).css('opacity', '1').removeClass('activePage3').addClass('activePage2');
        });
      }, 800);

      window.setTimeout(function () {
        $page2p.each(function (index, item) {
          $(item).animate({
            opacity: '1'
          });
        });
      }, 1100);

      // page2 로고
      window.setTimeout(function () {
        $page2Logos.each(function (index, item) {
          if (index == 0) {
            $(item).animate({
              opacity: '1'
            });
          } else {
            $(item).animate({
              top: '100px',
              opacity: '1'
            }, 900);
          }
        });
      }, 1100);
    }

    // page3
    if ($(this).scrollTop() == $('.content-container:nth-child(4)').offset().top) {
      
      $page2Items.each(function (index, item) {
        $(item).removeClass('activePage2').addClass('activePage3');
      });
      
    }

    if ($(this).scrollTop() > $('.content-container:nth-child(2)').offset().top + 500) {
      isScroll = false;

      window.setTimeout(function () {
        isScroll = true;
      }, 1000);
    }

    // page3 진입 시 nav의 컬러 변경
    if ($(this).scrollTop() > $('.content-container:nth-child(3)').offset().top + 500) {
      isScroll = false;

      window.setTimeout(function () {
        isScroll = true;
      }, 1000);
      $nav.addClass('color');
      // page3 메뉴리스트 슬라이드
      $menuItems.each(function (index, item) {
        $(this).animate({
          left: `${($(this).width() + 10) * index}px`
        }, 600, function () {
          $menuTitle.animate({
            marginTop: '0px'
          });
        });
      });
    } else {
      $nav.removeClass('color');
    }

    // 스크롤 시 메뉴바 .on 클래스 변경
    $nav.each(function (index) {
      changeClass(index);
    });
  });

  // 스크롤 시 메뉴바 .on 클래스 변경
  const $contentContainers = $('.content-container');
  function changeClass(index) {
    if ($window.scrollTop() == $contentContainers.eq(index).offset().top) {
      $nav.removeClass('on');
      $nav.eq(index).addClass('on');
    }
  }

  // 메뉴바 클릭 시 해당 위치로 스크롤
  const SCROLLDURATION = 300;
  let clickIndex = 0;

  $nav.each(function (index, item) {
    $(item).on('click', function () {
      // 중복 클릭 방지
      if (!$html.is(':animated')) {
        $html.animate({
          scrollTop: $contentContainers.eq(index).offset().top
        }, SCROLLDURATION);
      }
      changeClass(index);
      clickIndex = index;
      pageIndex = index;

    });
  });

  // page4 마우스 커서 효과
  const $eventLi1 = $('#event-list > li:first-child()');
  const $eventLi2 = $('#event-list > li:last-child()');
  const $cursor1 = $('#coupon-cursor');
  const $cursor2 = $('#brandstory-cursor');
  $eventLi1.on({
    mouseleave: function () {
      $cursor1.css('opacity', '0');
    },
    mouseenter: function () {
      $cursor1.css('opacity', '1');
    },
    mousemove: function (event) {
      const x = event.clientX;
      const y = event.clientY;
      $cursor1.css({
        top: y - $cursor1.height() / 2,
        left: x - $cursor1.width() / 2,
        backgroundPosition: `-${x - $cursor1.width()}px -${y - $cursor1.height()}px`
      });
    }
  });

  $eventLi2.on({
    mouseleave: function () {
      $cursor2.css('opacity', '0');
    },
    mouseenter: function () {
      $cursor2.css('opacity', '1');
    },
    mousemove: function (event) {
      const x = event.clientX;
      const y = event.clientY;
      $cursor2.css({
        top: y - $cursor2.height() / 2,
        left: x - $cursor2.width() / 2
      });
    }
  });

});