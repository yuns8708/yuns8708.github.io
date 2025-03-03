$(function () {
    const $images = $('#content > .image_box > div > img');
    const $image = $('#content > .image_box > div > div');
    const $detailImg = $('#content_detail > .content_container > img');

    // 이미지갤러리 마우스 오버
    $images.each(function(index) {
        $(this).on({
            'mouseover' : function () {
            $image.eq(index).addClass('image_overlay');
            },
            'mouseout' : function () {
            $image.removeClass('image_overlay');
        }
        });
    });

    $image.each(function(index) {
        $(this).on({
            'mouseover' : function () {
            $image.eq(index).addClass('image_overlay');
            },
            'mouseout' : function () {
            $image.removeClass('image_overlay');
        }
        });
    });

    const $contentDetail = $('#content_detail');
    // 이미지 갤러리 클릭 시
    const $galleryImgs = $('.image_box > img');
    $galleryImgs.each(function () {
        $(this).on('click', function () {
            $contentDetail.css('display', 'block');
            $detailImg.attr('src', `${$(this).attr('src')}`);
        });
    });

    // 이미지 갤러리 오버레이 클릭 시
    const $galleryOverlay = $('.gallery_overlay');
    $galleryOverlay.each(function () {
        $(this).on('click', function () {
            $contentDetail.css('display', 'block');
            $detailImg.attr('src', `${$(this).prev().attr('src')}`);
        });
    });

});