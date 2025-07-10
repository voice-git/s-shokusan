$(window).load(function() {
  if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    // Hamburger
    $(function() {
      $('.menu').on('click', function() {
        $('.menu').toggleClass('active');
        $('.gnav').toggleClass('active');
      });
    });

    $(function() {
      $('.nav_close').on('click', function() {
        $('.menu').removeClass('active');
        $('.gnav').removeClass('active');
      });
    });
  }
});

// スティッキーナビ
var $window = $(window),
  $content = $("#main"),
  $chenge = $("#head-change"),
  topContent = $content.offset().top;

var sticky = false;

$window.on("scroll", function() {
  if ($window.scrollTop() > topContent) {
    if (sticky === false) {
      $chenge.slideDown();
      sticky = true;
    }
  } else {
    if (sticky === true) {
      $chenge.slideUp();
      sticky = false;
    }
  }
});
$window.trigger("scroll");


// スクロールトップへ戻る ここから
$(function() {
  var topBtn = $('#page-top');
  topBtn.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});







// アニメーション
$(function() {
  $('.fade_in').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).stop().addClass('fadeIn');
    } else {
      $(this).stop().removeClass('');
    }
  });

  $('.section_title').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).stop().addClass('line_anime');
    } else {
      $(this).stop().removeClass('');
    }
  });
  $('.fade_line').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).stop().addClass('fadeLine');
    } else {
      $(this).stop().removeClass('');
    }
  });
});



// 画像切り替え
$(function() {
  var $elem = $('.switch');
  var sp = '_sp.';
  var pc = '_pc.';
  var replaceWidth = 640;

  function imageSwitch() {
    var windowWidth = parseInt($(window).width());
    $elem.each(function() {
      var $this = $(this);
      if (windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });
  }
  imageSwitch();

  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 200);
  });
});


/*--------------------------------------------------------------------------*
 *
 *  SmoothScroll JavaScript Library V2
 *
 *  MIT-style license.
 *
 *  2007-2011 Kazuma Nishihata
 *  http://www.to-r.net
 *
 *--------------------------------------------------------------------------*/

new function() {

  var attr = "data-tor-smoothScroll"; //for html5 , if you can't use html5 , this value change "class"
  var attrPatt = /noSmooth/;
  var d = document; //document short cut

  /*
   *add Event
    -------------------------------------------------*/
  function addEvent(elm, listener, fn) {
    try { // IE
      elm.addEventListener(listener, fn, false);
    } catch (e) {
      elm.attachEvent(
        "on" + listener,
        function() {
          fn.apply(elm, arguments)
        }
      );
    }
  }

  /*
   *Start SmoothScroll
    -------------------------------------------------*/
  function SmoothScroll(a) {
    if (d.getElementById(a.rel.replace(/.*\#/, ""))) {
      var e = d.getElementById(a.rel.replace(/.*\#/, ""));
    } else {
      return;
    }

    //Move point
    var end = e.offsetTop
    var docHeight = d.documentElement.scrollHeight;
    var winHeight = window.innerHeight || d.documentElement.clientHeight
    if (docHeight - winHeight < end) {
      var end = docHeight - winHeight;
    }

    //Current Point
    var start = window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop || 0;


    end += -0;
    var flag = (end < start) ? "up" : "down";

    function scrollMe(start, end, flag) {
      setTimeout(
        function() {
          if (flag == "up" && start >= end) {
            start = start - (start - end) / 20 - 1;
            window.scrollTo(0, start)
            scrollMe(start, end, flag);
          } else if (flag == "down" && start <= end) {
            start = start + (end - start) / 20 + 1;
            window.scrollTo(0, start)
            scrollMe(start, end, flag);
          } else {
            scrollTo(0, end);
          }
          return;
        }, 10
      );

    }

    scrollMe(start, end, flag);

  }

  /*
   *Add SmoothScroll
    -------------------------------------------------*/
  addEvent(window, "load", function() {
    var anchors = d.getElementsByTagName("a");
    for (var i = 0, len = anchors.length; i < len; i++) {
      if (!attrPatt.test(anchors[i].getAttribute(attr)) &&
        anchors[i].href.replace(/\#[a-zA-Z0-9_]+/, "") == location.href.replace(/\#[a-zA-Z0-9_]+/, "")) {
        anchors[i].rel = anchors[i].href;
        anchors[i].href = "javascript:void(0)";
        anchors[i].onclick = function() {
          SmoothScroll(this)
        }
      }
    }
  });
}
