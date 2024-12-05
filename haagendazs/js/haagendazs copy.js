
    // new CircleType(document.querySelector('.content-container:nth-child(2) > div > div > h1:nth-child(1)')).radius(1000);
    // new CircleType(document.querySelector('.content-container:nth-child(2) > div > div > h1:nth-child(2)')).radius(1300);
    $(function () {
        const $loading = $('#loading');
        const $loadingDiv = $('#loading > div');
        const $loadingLogo = $('#loading > div > img');
        const $loadingTitle = $('#loading > div > h1');
        $loading.css('display', 'block');
      
        const TITLEDURATION = 600;
      
        // $loading.css('opacity', '0');
      
        // $loading.animate({
        //     backgroundPositionX: '-500px'
        // }, 2500);
      
        // 로딩 페이지
        window.setTimeout(function () {
          $loadingLogo.addClass('active').css('opacity', '1');
          window.setTimeout(function () {
            $loadingTitle.addClass('active').css('opacity', '1');
          }, TITLEDURATION);
        }, TITLEDURATION);
      
        window.setTimeout(function () {
          $loading.animate({
            backgroundPositionY: '-500px'
          }, 2500, function () {
            $loading.animate({
              opacity: '0'
      
            }, TITLEDURATION, function () {
              $loading.css('display', 'none');
            });
          });
          window.setTimeout(function () {
            $loadingDiv.animate({
              // paddingTop: '-200px'
              top: '-170px'
            }, 2500);
            $loadingTitle.animate({
              fontSize: '61px'
            }, 2500);
          }, 400);
      
      
          // window.setTimeout(function () {
          //   $loadingTitle.animate({
          //     fontSize: '35px'
          //   }, 2500);
          // }, 300);
      
        }, TITLEDURATION * 2.3);
      
      
        const $contentNavList = $('#content-nav > ul > li');
        const $contentContainer = $('#content-container');
        const $contentItems = $('#content-container > .content-items');
        const $content = $('#content-container > .content-items > div').children();
        $contentItems.each(function (index, item) {
          // $(this).on('click', function () {
          //     console.log(index);
          // });
        });
      
        // 컨텐츠 나타나기
        $content.css('opacity', '0');
        window.setTimeout(function () {
          $content.animate({
            opacity: '1'
          }, 600);
        }, TITLEDURATION * 2.3 + 3300);
      
        // 컨텐츠 슬라이드
        let currentIndex = 0;
      
        // $contentItems.eq(1).css('display', 'none');
        // $contentContainer.css('width', '200%');
      
        $contentNavList.each(function (index, item) {
          $(item).on('click', function () {
            $contentNavList.removeClass('on');
            $(this).addClass('on');
      
            if (currentIndex < index) {
              if (currentIndex + 2 == index) {
                $contentItems.eq(1).css('display', 'none');
                $contentContainer.css('width', '200%');
                $contentItems.eq(index - 1).children().animate({
                  left: `${-50}%`
                }, 600);
      
                window.setTimeout(function () {
                  $contentItems.eq(index).children().animate({
                    left: '0'
                  }, 600);
                }, 200);
      
                window.setTimeout(function () {
                  $contentContainer.animate({
                    marginLeft: `-100%`
                  });
                }, 200);
                currentIndex = index;
      
                window.setTimeout(function () {
                  $contentItems.eq(1).css('display', 'block');
                  $contentContainer.css('width', '300%');
                }, 400);
      
      
              } else {
                $contentItems.eq(index - 1).children().animate({
                  left: `${-100}%`
                }, 600);
      
                window.setTimeout(function () {
                  $contentItems.eq(index).children().animate({
                    left: '0'
                  }, 600);
                }, 200);
      
                window.setTimeout(function () {
                  $contentContainer.animate({
                    marginLeft: `${-100 * index}%`
                  });
                }, 200);
                currentIndex = index;
              }
      
            } else if (currentIndex > index) {
              $contentItems.eq(index + 1).children().animate({
                left: `${100}%`
              }, 600);
      
              window.setTimeout(function () {
                $contentItems.eq(index).children().animate({
                  left: '0'
                }, 600);
              }, 200);
      
              window.setTimeout(function () {
                $contentContainer.animate({
                  marginLeft: `${-100 * index}%`
                });
              }, 200);
              currentIndex = index;
            }
      
            // window.setTimeout(function () {
            //   $contentContainer.animate({
            //     marginLeft: `${-100 * index}%`
            //   });
            // }, 200);
            // currentIndex = index;
      
          });
        });
      
      });