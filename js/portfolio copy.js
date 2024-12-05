$(function () {
    const $window = $(window);
    const $header = $('header');
    const SLIDEDURATION = 500;

    const $menuList = $('#menu > ul > li');
    const $divList = [$('#cover'), $('#about'), $('.works-container'), $('#contact')];
    // const $divList = [document.querySelector("#cover"), $('#about'), $('.works-container'), $('#contact')];

    // 표지 텍스트 슬라이드 (최초 1회 실행)
    const $h2List = $('#cover > div > h2');
    const TEXTDURATION = 200;

    $h2List.each(function (index, item) {
        window.setTimeout(function () {
            $(item).animate({
                marginLeft: '0',
                opacity: '1'
            }, 1200);
        }, TEXTDURATION * index);
    });

    // 헤더 슬라이드 (최초 1회 실행)
    window.setTimeout(function () {
        $header.animate({
            top: '0',
            opacity: '1'
        }, SLIDEDURATION);
    }, TEXTDURATION * $h2List.length);

    // 스크롤 이벤트
    // const observer = new IntersectionObserver (entries => {
    //     entries.forEach(entry => {
    //         if (entry.intersectionRatio > 0) {
    //             console.log('entry');
    //         } else {
    //             console.log('bye');
    //         }
    //     });
    // });

    const io = new IntersectionObserver (function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0) {
                console.log('in');
            } else {
                console.log('out');
            }
        });
    });

    // $divList[2].each((el) => {
    //     observer.observe(el);
    // });
    // io.observe(document.querySelector('#cover'));
    // console.log(document.querySelector('#cover'));
    console.log($divList[0].get(0));
    // io.observe($divList[0].get(0));
    io.observe($divList[1].get(0));
    

    $window.scroll(function () {
        // 스크롤시 헤더 블러
        if ($(this).scrollTop() >= $('#cover > div').offset().top) {
            $header.css('backdrop-filter', 'blur(13px)');
        } else {
            $header.css('backdrop-filter', '');
        }

        // 컨텐츠 슬라이드
        // slideContent($divList[1], $divList[1].children('div:nth-child(1)'), $divList[1].children('div:nth-child(2)'), 500);
        $divList[2].each(function () {
            slideContent($(this).children(), $(this).children('img'), $(this).children('div'), 820);
        });
        slideContent($divList[3], $divList[3].children('ul'), $divList[3].children('h3'), 800);

        $menuList.each(function (index) {
            changeClass(index);
        });
    });

    // 컨텐츠 슬라이드
    // function slideContent(xRocation, item1, item2, increase) {
    //     if ($window.scrollTop() + increase >= xRocation.offset().top) {
    //         item1.animate({
    //             marginBottom: '0',
    //             opacity: '1',
    //             top: '0'
    //         }, SLIDEDURATION);
    //         window.setTimeout(function () {
    //             item2.animate({
    //                 marginBottom: '0',
    //                 opacity: '1',
    //                 bottom: '0'
    //             }, SLIDEDURATION);
    //         }, 200);
    //     }
    // }

    function slideContent(xRocation, item1, item2, increase) {
        item1.animate({
            marginBottom: '0',
            opacity: '1',
            top: '0'
        }, SLIDEDURATION);
        window.setTimeout(function () {
            item2.animate({
                marginBottom: '0',
                opacity: '1',
                bottom: '0'
            }, SLIDEDURATION);
        }, 200);
    }

    // 스크롤 시 메뉴바 .on 클래스 변경
    function changeClass(index) {
        if (!$html.is(':animated')) {
            if ($window.scrollTop() + 300 >= $divList[index].offset().top) {
                $menuList.removeClass('on');
                $menuList.eq(index).addClass('on');
            }
        }
    }

    // 메뉴바 클릭 시 해당 위치로 스크롤
    const SCROLLDURATION = 300;
    const $html = $('html');
    let clickIndex = 0;

    $menuList.each(function (index, item) {
        $(item).on('click', function () {

            // 중복 클릭 방지
            if (!$html.is(':animated') && clickIndex != index) {
                $html.animate({
                    scrollTop: $divList[index].offset().top
                }, SCROLLDURATION);

                changeClass(index);
            }
            clickIndex = index;
        });
    });

});