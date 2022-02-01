(function($) {
// JavaScript Document
$(document).ready(function() {

    // ----------- TEAM SOCIAL MENU ----------- //

	$(".photo-footer").mouseenter(function() {
			$(".plus-btn", this).stop().animate({top:70},'fast');
	});

	$(".photo-footer").mouseleave(function() {
			$(".plus-btn", this).stop().animate({top:0},'fast');
	});
	
	// ----------- TEAM NEXT/PREV ----------- //

	var current_team_page=0;

	$(".dir-right").click(function() {
		if(!$(this).hasClass('disable-2')){
			$(".jump"+(current_team_page+1)).click();
		}
	});

	$(".dir-left").click(function() {
		if(!$(this).hasClass('disable')){
			$(".jump"+(current_team_page-1)).click();
		}
	});
    var teams = $('.team div.who');
    var total_team_members = 0
    var dotsul = '';
    teams.each(function (index) {
        total_team_members++;
        if (index===0){dotsul = '<ul class="dotsmenu">';}
        dotsul += '<li class="dots jump' + index + '" id="' + index + '"></li>';
        if (index===teams.length-1) {
            dotsul += '</ul>';
            $('.team').after(dotsul);
        }
    });


	// ----------- TEAM DOTS ----------- //

	$(".dots").click(function() {
			$(".teamshow").stop().animate({scrollLeft:pos[$(this).attr('id')]},'slow');
			$('.activo').removeClass('activo');
			$(this).addClass('activo');
			current_team_page=parseInt($(this).attr('id'),10);

            if(current_team_page===0) {
                $('.dir-left').addClass('disable');
            } else {
                $('.dir-left').removeClass('disable');
            }

			if( (current_team_page+1) < needed_pages_for_teammembers){
                $('.dir-right').removeClass('disable-2');
            } else{
                $('.dir-right').addClass('disable-2');
            }
	});

	var res= null;
	var teammembers_per_page= null;
    var needed_pages_for_teammembers = null;
	var pos= null;
	var old= null;
	recalcul();


    function team_on_resize() {
        recalcul();
        if(old!==teammembers_per_page){
            $(".jump0").click();
        }
    }
	function recalcul(){
		res=$(window).width();
		if (res > 959) {
            teammembers_per_page=4; pos=[0,900,1800];
        } else if (res > 767) {
            teammembers_per_page=3; pos=[0,780,1555];
        } else {
            teammembers_per_page=1; pos=[0, 302, 604, 903, 1204, 1507, 1782, 2085, 2385];
        }
        needed_pages_for_teammembers = Math.ceil(total_team_members / teammembers_per_page)
	}

    $(window).bind("resize", team_on_resize);

    $(".jump0").click(); // initialize

	// ----------------- EASING ANCHORS ------------------ //

	$('a[href*=#]').click(function() {

     if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

             var $target = $(this.hash);

             $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

             if ($target.length) {

                 var targetOffset = $target.offset().top;

                 $('html,body').animate({scrollTop: targetOffset-100}, 1000);

                 return false;

            }

       }

   });

   //parallax

	$(window).bind("scroll", function(){//when the user is scrolling...
		Move('.paraOn'); //move the background images in relation to the movement of the scrollbar
	});

	function Move(seccio){
		$(seccio).each(function(){
			if($(this).attr('id')==='banner'){
				$(this).css('background-position', '0 '+$(window).scrollTop()/3+'px');
			}else{
				$(this).css('background-position', '0 '+(($(window).scrollTop()+$(window).height()-$(this).attr('yPos'))/3+$(this).height())+'px');
			}
		});
	}

   //inview

   $('.parallax').bind('inview', function (event, visible) {
		if (visible === true) {
		// element is now visible in the viewport
		var offset = $(this).offset();
		$(this).addClass('paraOn').attr('yPos',offset.top);
		} else {
		// element has gone out of viewport
		$(this).removeClass('paraOn');
		}
});

});// JavaScript Document
})(jQuery);


