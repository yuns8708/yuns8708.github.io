$(function () {
  const $window = $(window);
  let windowWidth = $window.width();
  const maxMobileWidth = 768;
  const $html = $('html');

    // 네비게이션 메뉴
    const $gnbMenu = $('#gnb-menu');
    const $gnbMenuLi = $gnbMenu.children('li');
    const $subMenu = $gnbMenuLi.children('.sub-menu');
  
    // 모바일 네비게이션
    if (windowWidth <= maxMobileWidth) {
      $gnbMenuLi.each((index, item) => {
        $(item).on('click', (event) => {
          console.log(index);
          if ($(item).css('background-size') == '11px') {
            $(item).css({
              background: 'url("images/right_icon.png") no-repeat 3px 3px',
              backgroundSize: '6px'
            });
            console.log('asdf');
          } else {
            $(item).css({
              background: 'url("images/down_icon.png") no-repeat 0px 6px',
              backgroundSize: '11px'
            });
          }
          event.preventDefault();
          $subMenu.eq(index).toggle();
          const $subMenuLi = $(item).children().children();
          $subMenuLi.each((index, item) => {
            $(item).on('click', (event) => {
              event.stopPropagation();
            });
          });
        });
      });
    } else {
      $gnbMenuLi.each((index, item) => {
        $(item).on({
          mouseenter: () => {
            $subMenu.eq(index).css('display', 'flex');
          },
          mouseleave: () => {
            $subMenu.css('display', 'none');
          }
        });
      });
    }
  
    const $menuBtn = $('#menu-btn');
    $menuBtn.on('click', () => {
        if ($gnbMenu.is(':animated')) return;
        window.setTimeout(() => {
            $menuBtn.toggleClass('on');
        }, 120);
        
        if ($menuBtn.hasClass('on')) {
            $gnbMenu.animate({
              marginLeft: '-300px'
            });
        } else {
            $gnbMenu.animate({
              marginLeft: '0'
            });
        }
    });

    // 맨 위로 버튼
    const $topBtn = $('#top');
    $topBtn.on('click', () => {
      if ($html.is(':animated')) return;
      $html.animate({
        scrollTop: 0
      }, 700);
    });

    // 
    const $event2Container = $('#event2-container');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const $target = $(entry.target);
  
        if ($event2Container.isIntersecting) {
          $target.animate({
            opacity: '1'
          }, 700);
        } else {
          $target.animate({
            opacity: '0'
          }, 700);
        }
      });
    });

    $window.scroll(function () {
      if ($(this).scrollTop() >= 500) {
          $topBtn.css('opacity', '1');
      } else {
          $topBtn.css('opacity', '0');
      }
    });

    // io.observe($topBtn);
    // 장바구니 버튼
    const $cartBtnMain = $('main>.product-container>div:nth-child(2)>ul>li>div>button.cart-btn');
    const $cartOverlay = $('#cart-overlay');
    const $cartBtnList1 = $cartOverlay.children('div:nth-child(2)').children();
    const $cartBtnList2 = $cartOverlay.children('div:nth-child(3)').children();
    const $confirmBtn = $cartBtnList1.first();
    const $denyBtn = $cartBtnList1.last();

    // const $closeBtn
    $cartBtnMain.on('click', () => {
      $cartOverlay.css('display', 'block');
    });

    $confirmBtn.on('click', () => {
      $cartOverlay.children('p').text('장바구니에 추가되었습니다.');
      $cartBtnList1.removeClass('on');
      $cartBtnList2.addClass('on');
    });

    $denyBtn.on('click', () => {
      $cartOverlay.css('display', 'none');
    });

    $cartBtnList2.on('click', () => {
      $cartOverlay.children('p').text('장바구니에 추가하시겠습니까?');
      $cartOverlay.css('display', 'none');
      $cartBtnList1.addClass('on');
      $cartBtnList2.removeClass('on');
    });

    // 서브페이지
    const $cartBtnSub = $('#product-items>li>div>button.cart-btn');
    $cartBtnSub.on('click', (event) => {
      // event.stopPropagation();
      console.log('aa');
      $cartOverlay.css('display', 'block');
    });

    // 찜하기 버튼
    const $likeBtn = $('main>.product-container>div:nth-child(2)>ul>li>div>button.like-btn');
    const $likeBtnSub = $('#product-items>li>div>button.like-btn');

    $likeBtn.each((index, item) => {
      let isLiked = false;
      $(item).on('click', () => {
        if (isLiked) {
          $(item).css({
            background: 'url("images/icon_heart.png") no-repeat center',
            backgroundSize: '25px'
          });
          isLiked = false;
        } else {
          $(item).css({
            background: 'url("images/icon_heart_solid.png") no-repeat center',
            backgroundSize: '25px'
          });
          isLiked = true;
        }
      });
    });

    $likeBtnSub.each((index, item) => {
      let isLiked = false;
      $(item).on('click', () => {
        if (isLiked) {
          $(item).css({
            background: 'url("images/icon_heart.png") no-repeat center',
            backgroundSize: '25px'
          });
          isLiked = false;
        } else {
          $(item).css({
            background: 'url("images/icon_heart_solid.png") no-repeat center',
            backgroundSize: '25px'
          });
          isLiked = true;
        }
      });
    });

});