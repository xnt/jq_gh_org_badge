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
					var orgInfo = "<a target='_blank' href='"
						+ data.html_url
						+ "'><img width='"+ settings.imgWidth +"' src='"
						+ data.avatar_url
						+ "' /></a> <span>" + data.name
						+ "</span>" + "<p>@GitHub: " 
						+ ( settings.repos ? data.public_repos + " repos; "  : "") 
						+ (settings.gists ? data.public_gists + " gists " : "") 
						+ "</p>";
					if(settings.users){
						$.ajax({
							dataType : 'jsonp',
							url : 'https://api.github.com/orgs/' + settings.organization + '/members',
							success : function(membersResponse) {
								orgInfo += "<div id='slider1' class='slider'><ul>";
								var mrData = membersResponse.data;
								$.each(mrData,function(i, member) {
									orgInfo += "<li><a target='_blank' href='http://github.com/"
										+ member.login
										+ "'><img width='40px' src='"
										+ member.avatar_url
										+ "' title='"
										+ member.login
										+ "' /></a></li>";
								});
								orgInfo += "</div><div class='controls'> "
									+ "<a href='#' class='prev-page'>&laquo;</a> | "
									+ "<a href='#' class='prev-slide'>&lt;</a> | "
									+ "<a href='#' class='next-slide'>&gt;</a> | "
									+ "<a href='#' class='next-page'>&raquo;</a>"
									+ "</div>";
								$("#target").html(orgInfo);
								$('#slider1').lemmonSlider();
							}
						});
					}
				}
			});
		});
	};
})(jQuery);