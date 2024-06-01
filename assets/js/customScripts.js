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

   // DE /EN
    const currentURL = window.location.pathname;
    const userLanguage = navigator.language || navigator.userLanguage;
    if (localStorage.getItem("language_set") == null ) {
        if (userLanguage.toLowerCase().indexOf('de') == 0 && !currentURL.startsWith("/de")) {
            document.querySelector('#language-button:not(.disabled)').click()
        }
    }
    localStorage.setItem("language_set", true);

	// ----------------- CAROUSEL HOME ------------------ //

    var totalItems = $('#carousel .item').length;
    if (totalItems > 0){
        var currentIndex = 0;
        var autoSlideTimer;

        function showItem() {
          $('#carousel .item').hide();
          $('#carousel #item' + currentIndex).fadeIn('slow');
          updateButtonStyles(currentIndex);
        }

        function updateButtonStyles(currentIndex) {
          $('#carousel_buttons .button').removeClass('orange');
          $('#carousel_buttons .button').eq(currentIndex).addClass('orange');
        }

        function startAutoSlide() {
          if(autoSlideTimer) {
            clearInterval(autoSlideTimer);
          }
          autoSlideTimer = setInterval(function() {
            currentIndex = (currentIndex + 1) % totalItems;
            showItem();
          }, 5000);
        }

        $('#carousel .item').hide();
        $('#carousel .item').first().fadeIn();
        updateButtonStyles(0);
        startAutoSlide();

        $('#carousel_buttons .button').each(function(index) {
          $(this).on('click', function() {
            currentIndex = index;
            showItem();
            startAutoSlide();
          });
        });

        $('.carousel-link .right').on('click', function() {
            if (currentIndex == totalItems-1) return;
            currentIndex++;
            showItem();
            startAutoSlide();
        });
        $('.carousel-link .left').on('click', function() {
            if (currentIndex == 0) return;
            currentIndex--;
            showItem();
            startAutoSlide();
        });

    }
});// JavaScript Document
})(jQuery);

