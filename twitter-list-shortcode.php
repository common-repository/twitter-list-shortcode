<?php
/*
Plugin Name: Twitter List Shortcode
Plugin URI: http://wordpress.org/extend/plugins/twitter-list-shortcode/
Description: Creates a shortcode you can use to embed a Twitter List. Use: [twitter_list list="web-geeks" user="mauteri" tweets="5" height="300"]. Required fields are user (the user that created the list) and list (the name of the list created). Optional fields are tweets (default is 5) and height (setting a height may include scrollbars).
Author: Mike Auteri
Version: 0.1
Author URI: http://mikeauteri.com/
*/

wp_enqueue_script( 'twitter_list', plugins_url().'/twitter-list-shortcode/twitter-list-shortcode.js', array( 'jquery' ), false);
wp_enqueue_style( 'twitter_list', plugins_url().'/twitter-list-shortcode/twitter-list-shortcode.css', array(), 'all' );

function twitter_list_shortcode( $atts ) {
	extract( shortcode_atts( array(
		'user' => '',
		'list' => '',
		'height' => '',
		'tweets' => '5'
	), $atts ) );

	if( empty( $atts['user'] ) || empty( $atts['list'] ) )
		return;

	$id = 'twitter-list-' . rand(5, 15);
	$list = esc_attr( $atts['list'] );
	$user = esc_attr( $atts['user'] );
	$tweets = esc_attr( $atts['tweets'] );
	$height = esc_attr( $atts['height'] );
	$fixed_height = '';

	if( !empty( $height ) ) {
		$fixed_height = 'height:'.$height.'px;overflow-y:scroll;';
	}

	ob_start();
	?>


		<div id="<?php echo $id; ?>" class="twitter-list-shortcode" style="<?php echo $fixed_height; ?>">
		<img src="<?php echo plugins_url(); ?>/twitter-list-shortcode/ajax-loader.gif" width="16" height="16" />
	</div>
	
	<script type="text/javascript">
		jQuery(function() {
			twitter_list.init(<?php echo '"'.$id.'", "'.$list.'", "'.$user.'", "'.$tweets.'"' ?>);
		});
	</script>
	<?php
	return ob_get_clean();
}

add_shortcode('twitter_list', 'twitter_list_shortcode');
