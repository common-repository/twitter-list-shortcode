=== Twitter List Shortcode  ===
Contributors: mauteri79
Tags: twitter
Requires at least: 3.0.1
Tested up to: 3.4
Stable tag: 0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Creates a shortcode you can use to embed a Twitter List. 

== Description ==

An example of the shortcode looks like this: [twitter_list list="web-geeks" user="mauteri" tweets="5" height="300"]. Required fields are user (the Twitter user that created the list) and list (the name of the list created). Optional fields are tweets (default is 5) and height (setting a height may include scrollbars).

== Installation ==

1. Upload `twitter-list-shortcode` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Place `<?php add_filter('widget_text', 'do_shortcode'); ?>` in your functions.php file if you plan on adding the shortcode to a text widget.

== Changelog ==

= 0.1 =
* This is the first version of this plugin.
