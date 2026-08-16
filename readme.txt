=== Wrap Quote ===
Contributors: cmtkennyb
Tags: pull quote, blockquote, quote, float, text wrap
Requires at least: 6.4
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A pull-quote block that floats into your copy so the body text wraps around it, print-style. Float it, size it, style it as a card or plain.

== Description ==

Wrap Quote adds a Gutenberg block that sets a quote into your article the way a magazine does: floated to one side with the body text flowing around it, not stuck in a rigid column beside it.

Drop the block into a post, type your quote, and the paragraphs that follow wrap down the side and under it.

* **Floats into the copy.** Float left or right at the width you choose; the body text wraps beside and below, with an adjustable gap on the text side.
* **Card or plain.** Ships a tidy card look out of the box (padding, subtle border, soft shadow, rounded corners) with a **Plain** style that strips the chrome for a bare floated quote.
* **Fully restyleable.** Use the standard block panels, Color, Border, Shadow, Dimensions, and Typography, to match the quote to your design. Everything overrides the default card.
* **Decorative quote mark.** A large opening quotation mark, toggleable on or off.
* **Attribution.** An optional citation line under the quote for the source or speaker.
* **Responsive.** Below 600px the quote drops to full width so a narrow column never gets squeezed.

The block saves as plain HTML with inline styles, so published posts keep rendering even across editor updates. There is no build step and no external dependencies.

== Installation ==

1. Upload the `wrap-quote` folder to `/wp-content/plugins/`, or install the plugin through the Plugins screen in WordPress.
2. Activate the plugin through the **Plugins** screen.
3. In the post editor, add the **Wrap Quote** block, type your quote, and type your paragraphs after it. Adjust the float, width, and gap in the block's **Quote Wrap** panel.

== Frequently Asked Questions ==

= How do I get the text to wrap around the quote? =

Place the Wrap Quote block where you want the quote to sit, then type (or keep) the paragraphs after it. Those paragraphs flow around the floated quote automatically.

= Can I change how the card looks? =

Yes. The block uses the standard WordPress Color, Border, Shadow, Dimensions, and Typography panels, so you can set the background, border, radius, shadow, padding, and text styling to whatever you like. Switch to the **Plain** block style to remove the card entirely.

= Does it need a build step? =

No. The block is authored in plain JavaScript against the WordPress editor APIs, with no compile step, bundler, or external libraries.

= What happens on mobile? =

Below 600px the quote drops to full width with the text above and below it, so a narrow phone column never gets a squeezed float.

== Screenshots ==

1. A quote floated into an article with the body text wrapping around it.
2. The Quote Wrap panel: float side, display width, text-side gap, and the quote-mark toggle.

== Changelog ==

= 1.0.0 =
* Initial release.
* Pull quote that floats left or right with the body text wrapping around it.
* Adjustable display width and text-side gap.
* Card (default) and Plain block styles.
* Decorative quote-mark toggle and an optional attribution line.
* Standard Color, Border, Shadow, Dimensions, and Typography support.
* Static HTML save, so content survives editor updates and plugin deactivation.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
