<?php
/**
 * Plugin Name: Wrap Quote
 * Description: A pull-quote block that floats into your copy so the body text wraps around it, print-style. Float left or right, set the width, flow text above it, and add an optional card.
 * Version: 1.0.1
 * Author: Kenneth Raymond
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: wrap-quote
 *
 * No build step: the editor script is authored in plain ES (global wp.* APIs),
 * registered here with explicit dependencies so load order is correct.
 *
 * @package WrapQuote
 */

/*
 * Wrap Quote
 * Copyright (C) 2026 Kenneth Raymond
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WRAP_QUOTE_VER', '1.0.1' );

/**
 * Register scripts/styles, then the block from its block.json.
 *
 * block.json references these handles (not file: paths) so we can supply the
 * wp-* dependency array manually, which is what a no-build block needs in
 * place of the *.asset.php a build would have generated.
 */
add_action( 'init', function () {
	$dir = __DIR__ . '/block';
	$url = plugins_url( 'block', __FILE__ );

	// Version each asset by its own file mtime so edits always bust the browser
	// cache (editor script + styles). Falls back to the plugin version if the
	// file can't be stat'd.
	$ver = function ( $file ) use ( $dir ) {
		$path  = $dir . '/' . $file;
		$mtime = @filemtime( $path );
		return $mtime ? (string) $mtime : WRAP_QUOTE_VER;
	};

	wp_register_script(
		'wrap-quote-editor',
		$url . '/index.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-dom' ),
		$ver( 'index.js' ),
		true
	);

	wp_register_style(
		'wrap-quote-style',
		$url . '/style.css',
		array(),
		$ver( 'style.css' )
	);

	wp_register_style(
		'wrap-quote-editor-style',
		$url . '/editor.css',
		array( 'wrap-quote-style' ),
		$ver( 'editor.css' )
	);

	wp_set_script_translations( 'wrap-quote-editor', 'wrap-quote' );

	// Pure static block: save() emits the whole <figure><blockquote> so published
	// posts keep rendering across editor updates. No render_callback needed.
	register_block_type( $dir );
} );
