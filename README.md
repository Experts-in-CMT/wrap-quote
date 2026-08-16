# Wrap Quote

A WordPress block that sets a pull quote into your copy the way a magazine does: floated to one side with the body text wrapping around it, print-style, not locked in a rigid column beside it.

No build step, no dependencies, static-save output.

## Features

- **Floats into the copy.** Float left or right at a chosen width; body text wraps beside and below, with an adjustable text-side gap.
- **Card or plain.** A tidy card look out of the box (padding, subtle border, soft shadow, rounded corners), plus a **Plain** style that strips the chrome.
- **Fully restyleable.** Native Color, Border, Shadow, Dimensions, and Typography panels override the default card, so the quote matches your design.
- **Decorative quote mark**, toggleable on/off.
- **Attribution line** under the quote (optional).
- **Responsive.** Drops to full width below 600px.

## Installation

Copy the `wrap-quote` folder into `wp-content/plugins/` and activate it from the Plugins screen.

Requires WordPress 6.4+ and PHP 7.4+.

## Usage

1. Add the **Wrap Quote** block where you want the quote to sit.
2. Type the quote (and an optional attribution). Type or keep the paragraphs after it, they wrap around the float.
3. In the block's **Quote Wrap** panel, set the float side, display width, and text-side gap, and toggle the quote mark.
4. Restyle the card with the standard Color / Border / Shadow / Dimensions / Typography panels, or switch to the **Plain** block style.

## How it works

The block is a `<figure class="wrap-quote">` (the block root, so block-support styles land on it and it *is* the card) wrapping a `<blockquote>` and an optional `<cite>`. It floats to one side; the text-side gap is the float's margin, written inline as a `--wrap-quote-gap` custom property. The float + wrap geometry is the same engine used by [image-text-wrap](https://github.com/Experts-in-CMT/image-text-wrap), minus the shape modes (a quote is a rectangle).

Static `save()` emits plain HTML, so published posts keep rendering across editor updates and even survive the plugin being deactivated.

## Development

Plain JavaScript against the global `wp.*` editor APIs, no JSX, bundler, or compile step. Edit the files under `block/` directly:

- `block/block.json`: block metadata, attributes, supports, and styles
- `block/index.js`: editor UI and static `save()`
- `block/style.css`: front-end and shared styles (float engine, card, quote mark)
- `block/editor.css`: editor-only tweaks

`wrap-quote.php` registers the assets, versioned by file mtime.

## License

Licensed under [GPL-2.0-or-later](LICENSE).
