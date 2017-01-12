var scrollPosition = [
  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
];
var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
html.data('scroll-position', scrollPosition);
html.data('previous-overflow', html.css('overflow'));
html.css('overflow', 'hidden');
window.scrollTo(scrollPosition[0], scrollPosition[1]);
var targetCliked, FlyingItem;

$('html, body').animate({
  scrollTop: 0
}, 500);
$(".ct-nav-main li").on("click", function(e){
  e.preventDefault();
  FlyingItem = $(this);
  if($('.active').is(':last-child')){
    $('.active').css({"top": $(this).offset().top+22});
  }else{
    $('.active').css({"top": $(this).offset().top-4});
  }
  $('.active').next().attr("style","");
  $('.active').attr("style","").removeClass("active");
  if($(this).is(':last-child')){
    $(this).addClass('active').css({"left":$(this).offset().left, "margin-top": "-26px", "top": $(this).offset().top-$(window).scrollTop()+22});
  }else{
    $(this).addClass('active').css({"top": $(this).offset().top - $(window).scrollTop() - 4});
  }
  $(this).css({"position":"fixed"});
  var activMenuWidth = $(this).width()+4.5;
  $(this).next().css({"margin-left":activMenuWidth});
  $(".section").first().css({"margin-top":$("header").outerHeight()})
  $("header").css({"position": "fixed","width": "100%", "top":"0"});
  $(this).css({
  "-webkit-transition": "all .5s ease",
  "transition": "all .5s ease"});
  var itemWidth = $(this).width();

  targetCliked = $(this).find('a').attr("href").substring(1);
  $(this).css({
    "height": itemWidth+"px",
    "line-height": itemWidth+"px",
    "margin-top": -1*(itemWidth/2)+10+"px",
    "background": "rgb(254, 15, 87)",
    "border-radius": "100%",
    "border": "2px solid rgb(255, 255, 255)"
  });
  var windowHeight = $(window).height();
  var scrollTop     = $(window).scrollTop(),
    elementOffset = $("#"+targetCliked).offset().top,
    distance      = (elementOffset - scrollTop);
  if($(this).is(":first-child")){
    FlyingItem.css({
      "margin-top": "0px",
      "top": $("#"+targetCliked).offset().top - (itemWidth/2)
    });
    setTimeout(function(){
      FlyingItem.css({
        "-webkit-transition": "all .5s ease",
        "transition": "all .5s ease"});
      FlyingItem.css({"box-shadow": "0px 0px 0px 0px #000"})
    },500);
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

  $(this).css({"box-shadow": "0px 0px 7px 2px #000"})
  setTimeout(function(){
    if (targetCliked.length > 0) {
      var scroll =$("#"+targetCliked).offset().top-$("header").outerHeight();
      $('html, body').animate({
        scrollTop: scroll
      }, 1000);
    }
  },500);

  setTimeout(function(){
    FlyingItem.css({
      "-webkit-transition": "all .5s ease",
      "transition": "all .5s ease"});
    FlyingItem.css({"box-shadow": "0px 0px 0px 0px #000"})
  },1700);
})
$(window).scroll(function(){
  if(targetCliked){
    var scrollTop     = $(window).scrollTop(),
      elementOffset = $("#"+targetCliked).offset().top,
      distance      = (elementOffset - scrollTop);
    if($(window).height()-FlyingItem.width() >= distance && distance > $("header").outerHeight()){
      FlyingItem.css({
      "-webkit-transition": "all 0s ease",
      "transition": "all 0s ease"});
      FlyingItem.css({"top": distance-56})
    }
  }
})
