# Wrap Quote

A WordPress block that sets a pull quote into your copy the way a magazine does: floated to one side with the body text wrapping around it, print-style, not locked in a rigid column beside it. Raise the vertical offset and the copy flows above, around, and under it.

No build step, no dependencies, static-save output.

## Features

- **Floats into the copy.** Float left or right at a chosen width; body text wraps beside and below, with an adjustable text-side gap.
- **Text above the quote.** A vertical offset drops the quote into the copy so the following paragraph flows across its top before wrapping beside and below (on the Card style it moves the card down instead). A horizontal offset insets or outsets the quote.
- **Two looks.** A clean floated default (prominent quotation mark, medium-weight quote a step larger than body copy, italic attribution) and an opt-in **Card** style (padding, border, shadow, rounded corners).
- **Smart quotes.** Opening and closing smart quotes with a glyph choice (double, sans-serif, guillemets, single, low-high) and an on/off toggle.
- **Alignment.** Left or right for the quote, attribution, and closing mark.
- **Attribution line** under the quote (optional; accepts `em`, `strong`, `a`).
- **Fully restyleable.** Native Color, Border, Shadow, Dimensions, and Typography panels.
- **Responsive.** Drops to full width below 600px.

## Installation

Copy the `wrap-quote` folder into `wp-content/plugins/` and activate it from the Plugins screen.

Requires WordPress 6.4+ and PHP 7.4+.

## Usage

1. Add the **Wrap Quote** block where you want the quote to sit.
2. Type the quote (and an optional attribution). Type or keep the paragraphs after it; they wrap around the float.
3. In the block's **Quote Wrap** panel, set the float side, width, gaps, offsets, alignment, and the quote-mark glyph.
4. For a card, switch to the **Card** block style; restyle with the standard Color / Border / Shadow / Dimensions / Typography panels.

## How it works

The block is a `<figure class="wrap-quote">` (the block root, so block-support styles land on it) wrapping a `<blockquote>` and an optional `<figcaption>`. It floats to one side; per-instance values (width, gap, offsets) are inline `--wrap-quote-*` custom properties. The float + wrap geometry is the same engine used by [image-text-wrap](https://github.com/Experts-in-CMT/image-text-wrap); the vertical offset uses `shape-outside` (kept in the stylesheet, driven by the offset variable) so the following paragraph flows above the quote.

Because a float only affects the text after it, the paragraph *before* the quote cannot wrap around it (that would need CSS Exclusions, which no browser supports); the vertical offset flows the following paragraph above the quote instead.

Static `save()` emits plain HTML, so published posts keep rendering across editor updates and even survive the plugin being deactivated.

## Development

Plain JavaScript against the global `wp.*` editor APIs, no JSX, bundler, or compile step. Edit the files under `block/` directly:

- `block/block.json`: block metadata, attributes, supports, and styles
- `block/index.js`: editor UI and static `save()`
- `block/style.css`: front-end and shared styles (float engine, offsets, marks, card)
- `block/editor.css`: editor-only tweaks

`wrap-quote.php` registers the assets, versioned by file mtime.

## License

Licensed under [GPL-2.0-or-later](LICENSE).
