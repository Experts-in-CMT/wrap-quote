/**
 * Wrap Quote — editor registration (no-build, global wp.* APIs).
 *
 * Static-save block: save() emits a <figure class="wrap-quote"> holding a
 * <blockquote> (and optional <cite>), floated with the wrap baked into inline
 * styles + classes, so already-published posts survive any editor breakage.
 *
 * The <figure> is the block root: it floats into the copy, and block-support
 * styles (color / border / shadow / spacing / typography) land on it, so it IS
 * the card. Body text placed after the block wraps around it.
 */
( function ( blocks, element, blockEditor, components, i18n ) {
	'use strict';

	var el = element.createElement;
	var Fragment = element.Fragment;
	var RawHTML = element.RawHTML;
	var __ = i18n.__;

	var useBlockProps = blockEditor.useBlockProps;
	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;

	var PanelBody = components.PanelBody;
	var SelectControl = components.SelectControl;
	var RangeControl = components.RangeControl;
	var ToggleControl = components.ToggleControl;
	var TextareaControl = components.TextareaControl;

	// Strips scripts and on* event attributes; keeps simple inline markup.
	var safeHTML = ( window.wp.dom && window.wp.dom.safeHTML )
		? window.wp.dom.safeHTML
		: function ( h ) { return h; };

	/**
	 * Build the figure's className + inline style from attributes.
	 * Used by BOTH the edit preview and save so they can never diverge.
	 */
	function quoteProps( attrs ) {
		var side = attrs.side === 'left' ? 'left' : 'right';
		var width = typeof attrs.width === 'number' ? attrs.width : 320;
		var gap = typeof attrs.gap === 'number' ? attrs.gap : 24;
		var offsetX = typeof attrs.offsetX === 'number' ? attrs.offsetX : 0;
		var offsetY = typeof attrs.offsetY === 'number' ? attrs.offsetY : 0;
		var textAlign = attrs.textAlign === 'right' ? 'right' : 'left';
		var showMark = attrs.showMark !== false;
		var markGlyph = attrs.markGlyph || 'double';

		var classes = [ 'wrap-quote', 'align-' + side ];
		if ( showMark ) {
			classes.push( 'has-quote-mark' );
			// Non-default opening-glyph style; the closing mark pairs to match.
			if ( markGlyph !== 'double' ) {
				classes.push( 'mark-' + markGlyph );
			}
		}
		// Right-aligns the quote text, attribution, and closing mark (not the
		// opening mark or the card box).
		if ( textAlign === 'right' ) {
			classes.push( 'text-right' );
		}
		// Marks the quote for the vertical-offset override (needed to beat the
		// theme's block-gap); only present when an offset is actually set.
		if ( offsetY ) {
			classes.push( 'has-voffset' );
		}

		var style = {
			width: width + 'px',
			// The text-side gap is the float's margin (set in CSS from this var).
			'--wrap-quote-gap': gap + 'px'
		};
		// Offsets emitted only when set, so an unmoved quote keeps minimal markup.
		if ( offsetX ) {
			style[ '--wrap-quote-offset-x' ] = offsetX + 'px';
		}
		if ( offsetY ) {
			style[ '--wrap-quote-offset-y' ] = offsetY + 'px';
		}

		return {
			className: classes.join( ' ' ),
			style: style
		};
	}

	function Edit( props ) {
		var attrs = props.attributes;
		var setAttributes = props.setAttributes;
		var qp = quoteProps( attrs );

		var blockProps = useBlockProps( { className: qp.className, style: qp.style } );

		var controls = el(
			InspectorControls,
			{},
			el(
				PanelBody,
				{ title: __( 'Quote Wrap', 'wrap-quote' ), initialOpen: true },
				el( SelectControl, {
					label: __( 'Float', 'wrap-quote' ),
					value: attrs.side,
					options: [
						{ label: __( 'Right (text on the left)', 'wrap-quote' ), value: 'right' },
						{ label: __( 'Left (text on the right)', 'wrap-quote' ), value: 'left' }
					],
					onChange: function ( v ) { setAttributes( { side: v === 'left' ? 'left' : 'right' } ); }
				} ),
				el( RangeControl, {
					label: __( 'Display width (px)', 'wrap-quote' ),
					value: attrs.width,
					min: 160,
					max: 640,
					step: 4,
					onChange: function ( v ) { setAttributes( { width: typeof v === 'number' ? v : 320 } ); }
				} ),
				el( RangeControl, {
					label: __( 'Text-side gap (px)', 'wrap-quote' ),
					help: __( 'Space between the quote and the wrapping text.', 'wrap-quote' ),
					value: attrs.gap,
					min: 0,
					max: 80,
					step: 2,
					onChange: function ( v ) { setAttributes( { gap: typeof v === 'number' ? v : 24 } ); }
				} ),
				el( RangeControl, {
					label: __( 'Vertical offset (px)', 'wrap-quote' ),
					help: __( 'Drops the quote into the copy so text flows above it before wrapping beside and below.', 'wrap-quote' ),
					value: attrs.offsetY,
					min: 0,
					max: 300,
					step: 4,
					onChange: function ( v ) { setAttributes( { offsetY: typeof v === 'number' ? v : 0 } ); }
				} ),
				el( RangeControl, {
					label: __( 'Horizontal offset (px)', 'wrap-quote' ),
					help: __( 'Nudge the quote in toward the text or out toward the page edge.', 'wrap-quote' ),
					value: attrs.offsetX,
					min: -100,
					max: 100,
					step: 2,
					onChange: function ( v ) { setAttributes( { offsetX: typeof v === 'number' ? v : 0 } ); }
				} ),
				el( ToggleControl, {
					label: __( 'Show quote mark', 'wrap-quote' ),
					checked: attrs.showMark !== false,
					onChange: function ( v ) { setAttributes( { showMark: !! v } ); }
				} ),
				attrs.showMark !== false
					? el( SelectControl, {
						label: __( 'Opening quote glyph', 'wrap-quote' ),
						value: attrs.markGlyph || 'double',
						options: [
							{ label: __( 'Double curly “ ”', 'wrap-quote' ), value: 'double' },
							{ label: __( 'Double, sans-serif', 'wrap-quote' ), value: 'sans' },
							{ label: __( 'Guillemets « »', 'wrap-quote' ), value: 'guillemet' },
							{ label: __( 'Single curly ‘ ’', 'wrap-quote' ), value: 'single' },
							{ label: __( 'Low-high „ “', 'wrap-quote' ), value: 'low' }
						],
						onChange: function ( v ) { setAttributes( { markGlyph: v } ); }
					} )
					: null,
				el( SelectControl, {
					label: __( 'Text alignment', 'wrap-quote' ),
					help: __( 'Aligns the quote, attribution, and closing mark. The opening mark and the card stay put.', 'wrap-quote' ),
					value: attrs.textAlign,
					options: [
						{ label: __( 'Left', 'wrap-quote' ), value: 'left' },
						{ label: __( 'Right', 'wrap-quote' ), value: 'right' }
					],
					onChange: function ( v ) { setAttributes( { textAlign: v === 'right' ? 'right' : 'left' } ); }
				} ),
				el( TextareaControl, {
					label: __( 'Attribution', 'wrap-quote' ),
					help: __( 'Shown below the quote. Accepts simple inline HTML: <em>, <strong>, <a href>.', 'wrap-quote' ),
					value: attrs.citation,
					onChange: function ( v ) { setAttributes( { citation: v } ); }
				} )
			)
		);

		var body = el(
			'figure',
			blockProps,
			el( RichText, {
				identifier: 'quote',
				tagName: 'blockquote',
				multiline: 'p',
				value: attrs.quote,
				onChange: function ( v ) { setAttributes( { quote: v } ); },
				placeholder: __( 'Write the quote…', 'wrap-quote' )
			} ),
			// Attribution is edited in the sidebar (a nested RichText inside the
			// figure doesn't reliably take focus); here it's display-only so the
			// canvas previews it. safeHTML strips scripts/on* so a stored payload
			// can't run in wp-admin, while simple inline markup still renders.
			attrs.citation && attrs.citation.length
				? el( 'cite', {}, el( RawHTML, {}, safeHTML( attrs.citation ) ) )
				: null
		);

		return el( Fragment, {}, controls, body );
	}

	function Save( props ) {
		var attrs = props.attributes;
		var qp = quoteProps( attrs );
		var blockProps = useBlockProps.save( { className: qp.className, style: qp.style } );

		return el(
			'figure',
			blockProps,
			el( RichText.Content, {
				tagName: 'blockquote',
				multiline: 'p',
				value: attrs.quote
			} ),
			// safeHTML parses + reserializes, balancing any unclosed tag typed in
			// the Attribution field. Without it an unclosed <em> escapes the
			// <figure> and italicizes/inlines the rest of the article (and breaks
			// the content max-width). Matches the edit-canvas render.
			attrs.citation && attrs.citation.length
				? el( 'cite', {}, el( RawHTML, {}, safeHTML( attrs.citation ) ) )
				: null
		);
	}

	blocks.registerBlockType( 'wrap-quote/wrap-quote', {
		edit: Edit,
		save: Save
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n );
