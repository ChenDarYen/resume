$(function(){
    //arrow swing
    function swing(){
        $('.arrow-down').toggleClass('swing-down');
        setTimeout(swing,1000);
    };
    swing();

    //scroll function
    let windowHt = $(window).height();
    let skillsPos = $('#skills').offset().top;
    $(window).scroll(function(e){
        let scrollPos = $(window).scrollTop();

        let scrollPc = scrollPos/windowHt;
        if(scrollPos>windowHt){
            $('.navbar').css('opacity',1);
        }else{
            $('.navbar').css('opacity', scrollPc);
            $('.arrow-down').css('opacity', 0.3 * (1 - scrollPc));
            $('#header').css('background-position-y', 100 * (1 + scrollPc) + '%');
        };

        //scroll show
        $('.scroll-animate').each(function(){
            let pos = $(this).offset().top;
            if(scrollPos > pos - windowHt){
                $(this).removeClass('hide translate');
            }
        })

        //bars
        let barShow = false;
        if(scrollPos > skillsPos - windowHt/3 && !barShow){
            barShow = true;
            $('#skills .bar').each(function(){
                $(this).css('width', $(this).data('progress') + '%');
            });
        }
    });

    //burger menu
    $('.show-menu').on('click', function(){
        if($(window).scrollTop()==0){
            return
        };
        $('.nav-menu').toggleClass('show');
        $('.show-menu').toggleClass('none');
    });

    //direction animate
    $('.scroll').on('click', function(e){
        e.preventDefault();
        let target = $(this).attr('href');
        let targetPos = $(target).offset().top;
        $('html, body').animate({scrollTop: targetPos}, 1000);
    })
})