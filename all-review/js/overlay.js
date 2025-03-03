$(function () {
    const $contentDetail = $('#content_detail');
    const $detailImg = $('#content_detail > .content_container > img');

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
    
    // 컨텐츠 클릭 시
    const $contentImg = $('.content_container > img');
    $contentImg.on('click', function () {
        $contentDetail.css('display', 'block');
        $detailImg.attr('src', `${$(this).attr('src')}`);
    });

    // 오버레이 바깥쪽 클릭 시
    $contentDetail.on('click', function (event) {
        $(this).css('display', 'none');
    });

});