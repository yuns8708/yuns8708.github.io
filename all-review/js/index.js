$(function () {
    const $detailImg = $('#content_detail > .content_container > img');
    const $contentDetail = $('#content_detail');

    // 댓글 더보기 클릭
    const $show_all = $('.show_all');
    $show_all.on('click', function () {
        $contentDetail.css('display', 'block');
        $detailImg.attr('src', `${$(this).parent().parent().prev().attr('src')}`);
    });

});