$(document).ready(function(){


    /* Smooth scroll and Scroll spy (https://github.com/ChrisWojcik/single-page-nav) */
    $('.scroll-spy').singlePageNav({
        offset: $(".navbar-header").height(),
        filter: ':not(.external)',
        updateHash: false
    });

    /* scroll-button in header */
    // $('a[href*="#"]:not([href="#"],[class*="tab"] a)').click(function() {
    //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //         var target = $(this.hash);
    //         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //         if (target.length) {
    //             $('html,body').animate({
    //                 scrollTop: target.offset().top - $(".navbar-header").height() + 43 // 43 is .top-bar height
    //             }, 500, 'swing');
    //         }
    //     }
    // });

    /* start navigation top js */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 42) {
            if ($(window).width() >= 768) {
//              $("#home").css("margin-top",($(".navbar-header").height() + "px"));
                $("#home").addClass("pushed");
            }
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
         $("#home").removeClass("pushed");
        }
    });

    /* Hide mobile menu after click */
    $(".navbar-collapse a").click(function() {
        $(".navbar-collapse").collapse("hide");
    });


    $("body").bind("touchstart", function() {});

    /* wow */
    new WOW().init();

    /* Regulamin show/hide */
    // $("#regulamin").hide("slow");

    // $(".link-regulamin,.btn-regulamin").click(function(){
    //     $(".link-regulamin").removeClass("inactive");
    //     $(".btn-regulamin").hide();
    //     $("#regulamin").show("slow");
    // });

    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top - $(".navbar-header").height() + 43 // 43 is .top-bar height
          }, 800, function(){


          });
        } // End if
      });



    /* Formularz */
    $("#contactForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Proszę uzupełnić pola formularza");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });
    function submitForm() {
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success: function(text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    }
    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Dziękuję! Wysłano :)");
    }
    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }
    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


});

/* preloader */
$(window).load(function() {
    $(".preloader").fadeOut(900);
});


