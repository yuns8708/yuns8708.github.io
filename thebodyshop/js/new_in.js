$(function () {
  const $window = $(window);
  let windowWidth = $window.width();
  const maxMobileWidth = 768;

  // 배너
  const $bannerItems = $('#banner-container').children();
  bannerItemSlide($bannerItems);
  const SLIDEDURATION = 700;
  // 배너 타이틀, 이미지 슬라이드
  function bannerItemSlide(items) {
    items.each(function (index, item) {
      window.setTimeout(function () {
        if (index == 1) {
          $(item).animate({
            opacity: '1',
            top: '50%'
          }, SLIDEDURATION);
        } else {
          if (windowWidth <= maxMobileWidth) {
            $(item).animate({
              opacity: '1',
              bottom: '0px'
            }, SLIDEDURATION);
          } else {
            $(item).animate({
              opacity: '1',
              bottom: '-240px'
            }, SLIDEDURATION);
          }
        }
      }, (index - 1) * 160);
    });
  }

  const $productUl = $('#product-items');
  const $productLi = $('#product-items > li');

  // 필터 선택
  const $filter = $('#filter').children();
  const $overlay = $('#overlay');
  const $overlayUl = $('#overlay > div > ul');
  // const $overlayLi = $('#overlay > div > li');
  const $closeBtn = $('#close-btn');
  const firstTexts = [];

  let filterResults = [null, null, null, null, null];

  // 필터 목록 클릭
  $filter.each((index, item) => {
    firstTexts[index] = $(item).text();
    $(item).on('click', () => {
      // 초기화 버튼
      if (index == $filter.length - 1) {
        $productLi.sort().each((liIndex, liItem) => {
          $(liItem).removeClass('hide').appendTo($productUl);
        });
        changeNum();
        $filter.each((filterIndex, filterItem) => {
          $(filterItem).text(firstTexts[filterIndex]);
        }).removeClass('on').eq(0).addClass('on');
        filterResults = [null, null, null, null, null];
        $overlayUl.children().removeClass('on');
        $overlayUl.eq(0).children(':eq(0)').addClass('on');
      } else {
        $overlay.css('display', 'block');
        $overlayUl.removeClass('on').eq(index).addClass('on');
      }

    });
  });

  $closeBtn.on('click', () => {
    $overlay.css('display', 'none');
  });

  $overlay.on('click', (event) => {
    if (event.target != event.currentTarget) return;
    $overlay.css('display', 'none');
  });

  // 오버레이 목록 클릭
  $overlayUl.each((ulIndex, item) => {
    const $overlayLi = $(item).children();
    $overlayLi.each((liIndex, item) => {
      $(item).on('click', () => {
        $overlayLi.removeClass('on');
        $(item).addClass('on');
        $overlay.css('display', 'none');
        $filter.eq(ulIndex).addClass('on').text($(item).text());

        if (ulIndex == 0) {
          // 높은가격순, 낮은가격순
          const priceList = [];
          $productLi.each((index, item) => {
            if (!priceList.includes($(item).data('price'))) {
              priceList.push($(item).data('price'));
            }
          }).removeClass('hide');
          filterResults[0] = $(item).text();

          if (liIndex == 1) {
            priceList.sort().reverse().forEach((priceItem, priceIndex) => {
              $productLi.each((liIndex, liItem) => {
                if (priceItem == $(liItem).data('price')) {
                  $productUl.append($(liItem));
                };
              });
            });
            changeNum();
          } else if (liIndex == 2) {
            priceList.sort().forEach((priceItem, priceIndex) => {
              $productLi.each((liIndex, liItem) => {
                if (priceItem == $(liItem).data('price')) {
                  $productUl.append($(liItem));
                };
              });
            });
            changeNum();
          } else {
            $productLi.sort().each((liIndex, liItem) => {
              $productUl.append($(liItem));

            });
          }
        }

        if (ulIndex == 1) {
          filterResults[1] = $(item).text();
        }

        if (ulIndex == 2) {
          if (liIndex == 4) {
            filterResults[2] = 40000;
          } else if (liIndex == 3) {
            filterResults[2] = 30000;
          } else if (liIndex == 2) {
            filterResults[2] = 20000;
          } else if (liIndex == 1) {
            filterResults[2] = 10000;
          } else {
            filterResults[2] = 1;
          }
        }

        if (ulIndex == 3) {
          filterResults[3] = $(item).text();
        }

        if (ulIndex == 4) {
          if (liIndex == 4) {
            filterResults[4] = 5;
          } else if (liIndex == 3) {
            filterResults[4] = 4;
          } else if (liIndex == 2) {
            filterResults[4] = 3;
          } else if (liIndex == 1) {
            filterResults[4] = 2;
          } else {
            filterResults[4] = 1;
          }
        }


        // 필터 적용
        let result = $productLi;
        if (filterResults[1]) {
          result = $productLi.filter((index, item) => {
            return $(item).data('feature') == filterResults[1];
          });
        }

        if (filterResults[2]) {
          if (filterResults[2] == 40000) {
            result = result.filter((index, item) => {
              return $(item).data('price') >= filterResults[2];
            });
          } else {
            result = result.filter((index, item) => {
              return $(item).data('price') >= filterResults[2];
            });
            result = result.filter((index, item) => {
              return $(item).data('price') < filterResults[2] + 10000;
            });
          }
        }

        if (filterResults[3]) {
          result = result.filter((index, item) => {
            return $(item).data('category') == filterResults[3];
          });
        }

        if (filterResults[4]) {
          result = result.filter((index, item) => {
            return $(item).data('rate') > filterResults[4] - 1;
          });
          result = result.filter((index, item) => {
            return $(item).data('rate') <= filterResults[4];
          });
        }

        $productLi.addClass('hide');
        if (result.length != 0) {
          result.each((index, item) => {
            $(item).removeClass('hide');
          });
        }
        changeNum();
      });
    });

  });

  const span = $('#product-container > p > span');
  function changeNum() {
    const listNum = $('#product-items > li:not(.hide)').length;
    span.text(`${listNum}개`);
  }

});