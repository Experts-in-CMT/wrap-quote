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
	var __ = i18n.__;

	var useBlockProps = blockEditor.useBlockProps;
	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;

	var PanelBody = components.PanelBody;
	var SelectControl = components.SelectControl;
	var RangeControl = components.RangeControl;
	var ToggleControl = components.ToggleControl;

	/**
	 * Build the figure's className + inline style from attributes.
	 * Used by BOTH the edit preview and save so they can never diverge.
	 */
	function quoteProps( attrs ) {
		var side = attrs.side === 'left' ? 'left' : 'right';
		var width = typeof attrs.width === 'number' ? attrs.width : 320;
		var gap = typeof attrs.gap === 'number' ? attrs.gap : 24;
		var showMark = attrs.showMark !== false;

		var classes = [ 'wrap-quote', 'align-' + side ];
		if ( showMark ) {
			classes.push( 'has-quote-mark' );
		}

		return {
			className: classes.join( ' ' ),
			style: {
				width: width + 'px',
				// The text-side gap is the float's margin (set in CSS from this var).
				'--wrap-quote-gap': gap + 'px'
			}
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
				el( ToggleControl, {
					label: __( 'Show quote mark', 'wrap-quote' ),
					checked: attrs.showMark !== false,
					onChange: function ( v ) { setAttributes( { showMark: !! v } ); }
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
			el( RichText, {
				identifier: 'citation',
				tagName: 'cite',
				value: attrs.citation,
				onChange: function ( v ) { setAttributes( { citation: v } ); },
				placeholder: __( 'Add attribution (optional)', 'wrap-quote' )
			} )
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
			attrs.citation && attrs.citation.length
				? el( RichText.Content, { tagName: 'cite', value: attrs.citation } )
				: null
		);
	}

	blocks.registerBlockType( 'wrap-quote/wrap-quote', {
		edit: Edit,
		save: Save
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n );
