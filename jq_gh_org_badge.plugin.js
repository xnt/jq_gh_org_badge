(function($) {
    $.fn.ghOrgBadge = function(options) {
	    var settings = $.extend({
		    target : this,
		    users : true, // Requires Lemmon Slider!!!
		    repos : true,
		    gists : true,
		    organization : 'nearsoft',
		    imgWidth : '50px'
		}, options);
	    return this.each(function() {
	        $.ajax({
	            dataType : 'jsonp',
	            url : 'https://api.github.com/orgs/' + settings.organization,
	            success : function(response) {
	                var data = response.data;
	                var orgInfo = $("<a>").attr("target", "_blank").attr("href", data.html_url)
	                    .appendTo(target);
	                orgInfo.append($("<img />").attr("width", settings.width).attr("src", data.avatar_url));
	                $("<span>").html(data.name).appendTo(target);
	                $("<p>").html("@GitHub:"
	                        + (settings.repos ? data.public_repos + " repos; "  : "")
	                        + (settings.gists ? data.public_gists + " gists " : "")
	                ).appendTo(target);
	                if(settings.users){
	                    $.ajax({
	                        dataType : 'jsonp',
	                        url : 'https://api.github.com/orgs/' + settings.organization + '/members',
	                        success : function(membersResponse) {
	                            function createControl(cssClass, innerhtml){
	                                return $("<a />").attr("href", "#").addClass(cssClass).html(innerhtml)
	                                    .after("&nbsp;|&nbsp;");
	                            }
	                            var ul = $("<ul />").appendTo(
	                                $("<div />").addClass("slider").attr("id", "slider1").appendTo(target)
	                            );
	                            var mrData = membersResponse.data;
	                            $.each(mrData,function(i, member) {
	                                $("<li >").append($("<a />").attr("target", "_blank").
	                                        attr("href", "http://github.com/" + member.login)
	                                        .append($("<img />").attr("width", "40px").attr("src", member.avatar_url)
	                                                .attr("title", member.login)
	                                        ).after("&nbsp;")).appendTo(ul);
	                            });
	                            $("<div />").addClass("controls").append("|&nbsp;")
	                            .append(createControl("prev-page", "&laquo;"))
	                            .append(createControl("prev-slide", "&lt;"))
	                            .append(createControl("next-slide", "&gt;"))
	                            .append(createControl("next-page", "&raquo;"))
	                            .appendTo(target);
	                            $('#slider1').lemmonSlider();
	                        }
	                    });
	                }
	            }
	        });
	    });
    };
})(jQuery);