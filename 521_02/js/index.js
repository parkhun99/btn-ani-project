$(document).ready(function() {
    $('.start_btn').on('click touchstart', function(evnet) {
        evnet.preventDefault(); event.stopPropagation();

        $('.popup_box').hide();
        $('.page').removeClass('on');
        $('.page2').addClass('on');
    });

    $('.click_img').on('click touchstart', function(event) {
        event.preventDefault(); event.stopPropagation();

        var dataIndex = $(this).data('index');

        switch(dataIndex) {
            case 1:
                $('.page2').removeClass('on');
                $('.page3').addClass('on');
            break;
            case 2:
                $('.warning_dim').show();
            break;
        }
    });

    $('.popup_close3').on('click touchstart', function(event) {
        event.preventDefault(); event.stopPropagation();

        $('.warning_dim').hide();
    });

   
    $('.popup_btn2').on('click touchstart', function(event) {
        event.preventDefault(); event.stopPropagation();

        $(this).hide();
        $('.p_popup').css({display: 'flex'});
    });
    $('.p_close').on('click touchstart', function(event) {
        event.preventDefault(); event.stopPropagation();

        $('.popup_btn2').show();
        $('.p_popup').hide();
    });

    $('.popup_btn').on('click touchstart', function(event) {
        event.preventDefault(); event.stopPropagation();

        $(this).hide();
        $('.popup_section').show();
    });
    $('.popup_close').on('click touchstart', function(event) {
        event.preventDefault(); event.stopPropagation();

        $('.popup_btn').show();
        $('.popup_section').hide();
    });
}); 