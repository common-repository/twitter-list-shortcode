var twitter_list = {
	init: function($id, $list, $user, $tweets) {
		var self = this;
		jQuery.ajax({
			url: 'https://api.twitter.com/1/lists/statuses.json?slug='+$list+'&owner_screen_name='+$user+'&per_page='+$tweets+'&include_rts=1',
			type: 'GET',
			dataType: 'jsonp',
			success: function(data) {
				var html = '', len = data.length;
				for( var i = 0; len > i; i++ ) {
					var tw = data[i];
					html += '<li><div class="tl-image"><a href="https://twitter.com/'+tw.user.screen_name+'" target="_blank"><img src="'+tw.user.profile_image_url+'" width="48" height="48" /></a></div><div class="tl-user"><a href="https://twitter.com/'+tw.user.screen_name+'" target="_blank"><strong>'+tw.user.name+'</strong> <span>@'+tw.user.screen_name+'</span></a></div><div class="tl-tweet">'+self.linkify_at_hash(self.linkify(tw.text))+'</div><div class="tl-date"><a href="https://twitter.com/'+tw.user.screen_name+'/status/'+tw.id_str+'" target="_blank">'+self.pretty_date(tw.created_at)+'</a></div></li>';
				}
				jQuery('#'+$id).html('<ul>'+html+'</ul>');
			},
			error: function(data) {
				jQuery('#'+$id).html('Sorry, could not load Twitter List');
			}
		});
	},
	pretty_date: function(time) {
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);

		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
			return;

		return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
	},
	linkify: function(text) {
			if( typeof text == 'undefined' ) {
					return false;
			}
			text = text.replace(
					/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
					function(url){
							var full_url = url;
							if (!full_url.match('^https?:\/\/')) {
									full_url = 'http://' + full_url;
							}
							return '<a href="' + full_url + '" target="_blank">' + url + '</a>';
					}
			);
			return text;
	},
	linkify_at_hash: function(text) {
		var tweet = text.replace(/(^|\s)@(\w+)/g, "$1@<a href=\"http://www.twitter.com/$2\" target=\"_blank\">$2</a>");
		return tweet.replace(/(^|\s)#(\w+)/g, "$1#<a href=\"http://search.twitter.com/search?q=%23$2\" target=\"_blank\">$2</a>");
	}
};

