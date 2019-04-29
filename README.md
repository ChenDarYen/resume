Resume
===
資料定義
---
``data-progress``儲存skill熟練程度

滾動動畫
---
```JQuery
let windowHt = $(window).height();
let skillsPos = $('#skills').offset().top;
$(window).scroll(function(e){
    let scrollPos = $(window).scrollTop();
    let scrollPc = scrollPos/windowHt;
    if(scrollPos>windowHt){       //控制navigation淡入淡出
        $('.navbar').css('opacity',1);
    }else{
        $('.navbar').css('opacity', scrollPc);
        $('.arrow-down').css('opacity', 0.3 * (1 - scrollPc));
        $('#header').css('background-position-y', 100 * (1 + scrollPc) + '%');        //header背景圖片視差滾動
    };
    $('.scroll-animate').each(function(){       //滑動到時內容出現
        let pos = $(this).offset().top;
        if(scrollPos > pos - windowHt){
            $(this).removeClass('hide translate');
        }
    });
    let barShow = false;
    if(scrollPos > skillsPos - windowHt/3 && !barShow){       //skills量表伸縮動畫
        barShow = true;
        $('#skills .bar').each(function(){
            $(this).css('width', $(this).data('progress') + '%');
        });
    }
})
```
漢堡選單
```JQuery
$('.show-menu').on('click', function(){
    if($(window).scrollTop()==0){       //scrollTop為零時，關閉功能避免誤觸
        return
    };
    $('.nav-menu').toggleClass('show');
    $('.show-menu').toggleClass('none');
})
```
