$(function () {
    const $loading = $('#loading');
    const $loadingDiv = $loading.children();
    const $loadingLogo = $loadingDiv.children('img');
    const $loadingTitle = $loadingDiv.children('h1');

    const TITLEDURATION = 600;
    const TITLESLIDEDURATION = 2500;

    // 로딩 타이틀, 로고 나타나기
    window.setTimeout(function () {
      $loadingLogo.addClass('active').css('opacity', '1');
      window.setTimeout(function () {
        $loadingTitle.addClass('active').css('opacity', '1');
      }, 400);
    }, TITLEDURATION);


    window.setTimeout(function () {
      // 로딩 배경 애니메이션
      $loading.animate({
        backgroundPositionY: '-700px'
      }, TITLESLIDEDURATION, function () {
        $(this).animate({
          opacity: '0'
        }, TITLEDURATION, function () {
          $(this).css('display', 'none');
        });
      });

      // 로딩 타이틀 애니메이션
      $loadingDiv.animate({
        top: '-176.5px'
      }, TITLESLIDEDURATION);
      
      $loadingTitle.animate({
        fontSize: '60px'
      }, TITLESLIDEDURATION);
    }, TITLEDURATION * 2.7);
    
    const $contentContainer = $('#content-container');
    const $contentItems = $contentContainer.children();
    const $content = $contentItems.children();
    const $contentNavList = $('#content-nav > ul > li');

    // 컨텐츠 나타나기
    window.setTimeout(function () {
      $content.animate({
        opacity: '1'
      }, 500);
    }, TITLEDURATION * 1.5 + 3500);

    let currentIndex = 0;
    $contentNavList.each(function (index, item) {
        $(item).on('click', function () {
            // nav 클릭시 클래스 변경
            $contentNavList.removeClass('on');
            $(this).addClass('on');

            // 컨텐츠 슬라이드
            if (currentIndex < index) {
                slideAnimation(index - 1, index, -100);
            } else if (currentIndex > index) {
                slideAnimation(index + 1, index, 100);
            }

            // 배경 슬라이드
            window.setTimeout(function () {
                $contentContainer.animate({
                    marginLeft: `${-100 * index}%`
                });
            }, 200);
            currentIndex = index;
        });
    });

    // 컨텐츠 슬라이드
    const SLIDEDURATION = 600;
    function slideAnimation (index1, index2, position) {
        $contentItems.eq(index1).children().animate({
          left: `${position}%`
      }, SLIDEDURATION);
      window.setTimeout(function () {
          $contentItems.eq(index2).children().animate({
              left: '0'
          }, SLIDEDURATION);
      }, 350);
    }

});