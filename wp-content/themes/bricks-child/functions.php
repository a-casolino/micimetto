<?php 
/**
 * Register/enqueue custom scripts and styles
 */
add_action( 'wp_enqueue_scripts', function() {
	// Enqueue your files on the canvas & frontend, not the builder panel. Otherwise custom CSS might affect builder)
	if ( ! bricks_is_builder_main() ) {
		wp_enqueue_style( 'bricks-child', get_stylesheet_uri(), ['bricks-frontend'], filemtime( get_stylesheet_directory() . '/style.css' ) );
	}
} );

/**
 * Register custom elements
 */
add_action( 'init', function() {
  $element_files = [
    __DIR__ . '/elements/title.php',
  ];

  foreach ( $element_files as $file ) {
    \Bricks\Elements::register_element( $file );
  }
}, 11 );

/**
 * Add text strings to builder
 */
add_filter( 'bricks/builder/i18n', function( $i18n ) {
  // For element category 'custom'
  $i18n['custom'] = esc_html__( 'Custom', 'bricks' );

  return $i18n;
} );

add_filter( 'bricks/code/echo_function_names', function() {
  return [
    'get_vimeo_thumb_from_id', // function does not exist
  ];
} );

function load_custom_script() {
  // Registra lo script
  wp_register_script('custom-js', get_stylesheet_directory_uri() . '/js/custom.js', array('jquery'), '1.1', true);

  // Carica lo script
  wp_enqueue_script('custom-js');
}

add_action('wp_enqueue_scripts', 'load_custom_script');
