var targetItem, FlyingItem, prevScroll= 0, enableScrolling = true, isOnTop = false;

$(".ct-nav-main li").on("click", function(e){
  e.preventDefault();
  FlyingItem = $(this);
  switchActiveMenu(FlyingItem)
})


  var scrollPosition = [
    self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
  ];
  var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
  html.data('scroll-position', scrollPosition);
  html.data('previous-overflow', html.css('overflow'));
  html.css('overflow', 'hidden');

var unLockScroll = () => {
  var html = jQuery('html');
  var scrollPosition = html.data('scroll-position');
  html.css('overflow', html.data('previous-overflow'));
}


var switchActiveMenu = (FlyingItem) => {
  if(enableScrolling == true){
    enableScrolling = false;
    if($('.active').is(':last-child')){
      $('.active').css({"top": FlyingItem.offset().top+22});
    }else{
      $('.active').css({"top": FlyingItem.offset().top-4});
    }
    $('.active').next().attr("style","");
    $('.active').attr("style","").removeClass("active");
    if(FlyingItem.is(':last-child')){
      FlyingItem.addClass('active').css({"left":FlyingItem.offset().left, "margin-top": "-26px", "top": FlyingItem.offset().top-$(window).scrollTop()+22});
    }else{
      FlyingItem.addClass('active').css({"top": FlyingItem.offset().top - $(window).scrollTop() - 4});
    }
    FlyingItem.css({"position":"fixed"});
    var activMenuWidth = FlyingItem.width()+4.5;
    FlyingItem.next().css({"margin-left":activMenuWidth});
    $(".section").first().css({"margin-top":$("header").outerHeight()})
    $("header").css({"position": "fixed","width": "100%", "top":"0"});
    FlyingItem.css({
    "-webkit-transition": "all .5s ease",
    "transition": "all .5s ease"});
    var itemWidth = FlyingItem.width();

    targetItem = FlyingItem.find('a').attr("href").substring(1);
    FlyingItem.css({
      "height": itemWidth+"px",
      "line-height": itemWidth+"px",
      "margin-top": -1*(itemWidth/2)+10+"px",
      "background": "rgb(254, 15, 87)",
      "border-radius": "100%",
      "border": "2px solid rgb(255, 255, 255)"
    });
    var windowHeight = $(window).height();
    var scrollTop     = $(window).scrollTop(),
      elementOffset = $("#"+targetItem).offset().top,
      distance      = (elementOffset - scrollTop);
    if(FlyingItem.is(":first-child")){
      FlyingItem.css({
        "margin-top": "0px",
        "top": $("#"+targetItem).offset().top - (itemWidth/2)
      });
      setTimeout(function(){
        FlyingItem.css({
          "-webkit-transition": "all .3s ease",
          "transition": "all .3s ease"});
        FlyingItem.css({"box-shadow": "0px 0px 0px 0px #000"})
      },300);
    }else if(distance < $("header").outerHeight()){
      FlyingItem.css({
        "margin-top": "0px",
        "top": $("header").outerHeight()-(itemWidth/2)
      });
    }else if(distance < windowHeight){
      FlyingItem.css({
        "margin-top": "0px",
        "top": distance-(itemWidth/2)
      });
    }else{

        FlyingItem.css({
          "margin-top": "0px",
          "top": windowHeight-itemWidth-20+"px"
        });
    }

    FlyingItem.css({"box-shadow": "0px 0px 7px 2px #000"})
    setTimeout(function(){
      if (targetItem.length > 0) {
        var scroll =$("#"+targetItem).offset().top-$("header").outerHeight();
        $('html, body').animate({
          scrollTop: scroll
        }, 500);
      }
    },300);


    setTimeout(function(){
      FlyingItem.css({
        "-webkit-transition": "all .5s ease",
        "transition": "all .5s ease"});
      FlyingItem.css({"box-shadow": "0px 0px 0px 0px #000"});
      enableScrolling= true;
      prevScroll = $('body').scrollTop();
    },1000);

  }
}

//init scroll position and first active itemWidth
switchActiveMenu($('nav li:first-child'));
isOnTop= true;

var changetouch = 0;
$(window).on("touchstart",function(e){
  console.log(e);
  var elHeight = e.target.clientHeight - $(e.target).parent(".section").height();
  if($(e.target).hasClass("section") || elHeight < 0){
    e.preventDefault();
    changetouch = e.originalEvent.changedTouches[0].clientY
  }else{
    changetouch = 0
  }
});
$(window).on("touchend",function(e){
  console.log(e);
  if(changetouch !== 0){
    var clY = e.originalEvent.changedTouches[0].clientY - changetouch;
    console.log(e.target.clientHeight)
    console.log( e.target.clientHeight - $(e.target).parent(".section").height())
    e.preventDefault();
    if(clY > 0 && $("nav li.active").prev().length > 0){
      FlyingItem = $("nav li.active").prev();
      switchActiveMenu(FlyingItem);
    } else if (clY < 0 && $($("nav li.active").next()[0]).length > 0){
      FlyingItem = $($("nav li.active").next()[0]);
      switchActiveMenu(FlyingItem);
    }
  }
});

$("body").on("mousewheel",function(e){
	var sp = st = true
	if($(e.target).parent(".section").length != 0){
		var scrollTop     = $(window).scrollTop(),
		  elementOffset = $(e.target).offset().top,
		  distance      = (elementOffset - scrollTop);
		var scrollTop2     = $(window).scrollTop(),
		  elementOffset2 = $(e.target).parent(".section").offset().top,
		  distanceParent      = (elementOffset - scrollTop);

		var T = e.target.clientHeight - Math.abs(distance) - $("header").outerHeight();
		var el = $(e.target).parent(".section").children();
		var childrenHeight = 0; el.each(function(){childrenHeight = childrenHeight + $(this).height()});
		var elHeight = childrenHeight - $(e.target).parent(".section").height();
		sp = (T < $("#blueprints").outerHeight() + 10),
		st = (distanceParent - distance == 0);
	}
  
	if(enableScrolling == true){
		if(e.originalEvent.deltaY > 0  && $($("nav li.active").next()[0]).length > 0 && ($(e.target).hasClass("section") || elHeight < 0 || sp)){
		  FlyingItem = $($("nav li.active").next()[0]);
		  switchActiveMenu(FlyingItem);
		} else if (e.originalEvent.deltaY < 0 && $("nav li.active").prev().length > 0 && ($(e.target).hasClass("section") || elHeight < 0 || st)){
		  FlyingItem = $("nav li.active").prev();
		  switchActiveMenu(FlyingItem);
		}
	}
});

$(window).scroll(function(e){
  if(targetItem && isOnTop == true){
    var scrollTop     = $(window).scrollTop(),
      elementOffset = $("#"+targetItem).offset().top,
      distance      = (elementOffset - scrollTop);
    if($(window).height()-FlyingItem.width() >= distance && distance > $("header").outerHeight()){
      FlyingItem.css({
      "-webkit-transition": "all 0s ease",
      "transition": "all 0s ease"});
      FlyingItem.css({"top": distance-56})
    }
  }
});
