!function($,e,t,i,o){e.behaviors.my_custom_behavior={attach:function(e,i){$("h2.tout-header").click(function(e){$("body").toggleClass("tout-active"),$("body").removeClass("search-active menu-active login-active"),e.preventDefault()}),$("h2.search-header").click(function(e){$("body").toggleClass("search-active"),$("body").removeClass("tout-active menu-active login-active"),e.preventDefault()}),$("h2.menu-header").click(function(e){$("body").toggleClass("menu-active"),$("body").removeClass("tout-active search-active login-active"),e.preventDefault()}),$("h2.login-header").click(function(e){$("body").toggleClass("login-active"),$("body").removeClass("tout-active search-active menu-active"),e.preventDefault()}),$(".tout-close").click(function(e){$("body").removeClass("tout-active search-active login-active menu-active"),e.preventDefault()}),$("<br />").insertAfter(".node-type-issue .field-name-field-author-text"),$("<br />").insertAfter(".node-type-issue .field-name-field-content-author"),$("#comments").accordion({active:!1,collapsible:!0,header:"h2.comments__title",animate:300}),$("#comments h2.comments__title").bind("click",function(){var e=this;setTimeout(function(){theOffset=$(e).offset(),$("body,html").animate({scrollTop:theOffset.top-100})},310)}),$(t).scroll(function(){var e=$("#comments").offset().top-$(t).height();$(t).width()>1e3&&($(t).scrollTop()>e?$("#slider").animate({right:"0px"},300):$("#slider").stop(!0).animate({right:"-430px"},100))}),$("#slider .close").bind("click",function(){$(this).parent().remove()})}}}(jQuery,Drupal,this,this.document);