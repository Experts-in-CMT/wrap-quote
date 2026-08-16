=== Wrap Quote ===
Contributors: cmtkennyb
Tags: pull quote, blockquote, quote, float, text wrap
Requires at least: 6.4
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A pull-quote block that floats into your copy so the body text wraps around it, print-style. Float it, size it, add an optional card.

== Description ==

Wrap Quote adds a Gutenberg block that sets a quote into your article the way a magazine does: floated to one side with the body text flowing around it, not stuck in a rigid column beside it.

Drop the block into a post, type your quote, and the paragraphs that follow wrap down the side and under it. Raise the vertical offset and the following paragraph flows across the top of the quote as well, so the copy runs above, around, and under it.

* **Floats into the copy.** Float left or right at the width you choose; the body text wraps beside and below, with an adjustable gap on the text side.
* **Text above the quote.** A vertical offset drops the quote into the copy so the paragraph that follows flows across its top before wrapping beside and below. A horizontal offset nudges the quote in toward the text or out toward the page edge.
* **Two looks.** The default is a clean floated quote with a prominent quotation mark, a medium-weight quote set a step larger than body copy, and an italic attribution. A **Card** style adds padding, a soft border, a shadow, and rounded corners.
* **Smart quotation marks.** Opening and closing smart quotes, with a choice of glyph (double, sans-serif, guillemets, single, or low-high) and a toggle to turn the mark off.
* **Alignment.** Set the quote, attribution, and closing mark to the left or the right.
* **Attribution.** An optional citation line under the quote for the source or speaker; it accepts simple inline HTML (em, strong, a).
* **Fully restyleable.** The standard Color, Border, Shadow, Dimensions, and Typography panels override the defaults, so the quote matches your design.
* **Responsive.** Below 600px the quote drops to full width so a narrow column never gets squeezed.

The block saves as plain HTML, so published posts keep rendering even across editor updates. There is no build step and no external dependencies.

== Installation ==

1. Upload the `wrap-quote` folder to `/wp-content/plugins/`, or install the plugin through the Plugins screen in WordPress.
2. Activate the plugin through the **Plugins** screen.
3. In the post editor, add the **Wrap Quote** block, type your quote, and type your paragraphs after it. Adjust the float, width, gaps, and offsets in the block's **Quote Wrap** panel.

== Frequently Asked Questions ==

= How do I get the text to wrap around the quote? =

Place the Wrap Quote block where you want the quote to sit, then type (or keep) the paragraphs after it. Those paragraphs flow around the floated quote automatically.

= How do I get text above the quote as well? =

Raise the **Vertical offset**. It drops the quote down into the paragraph that follows, so that paragraph flows across the top of the quote and then wraps beside and below it. On the **Card** style the vertical offset moves the card down instead, since text cannot flow over a solid card.

= Does the paragraph above the quote wrap around it too? =

No, and this is a browser rule rather than a plugin limit. A floated element only affects the text that comes after it; making earlier text wrap around an element needs CSS Exclusions, which no current browser supports. Use the **Vertical offset** to flow the following paragraph above the quote instead.

= How do I add a card, or restyle it? =

The block has no card by default. Switch to the **Card** block style to add one. From there, the standard Color, Border, Shadow, Dimensions, and Typography panels set the background, border, radius, shadow, padding, and text styling to whatever you like.

= Does it need a build step? =

No. The block is authored in plain JavaScript against the WordPress editor APIs, with no compile step, bundler, or external libraries.

= What happens on mobile? =

Below 600px the quote drops to full width with the text above and below it, so a narrow phone column never gets a squeezed float.

== Screenshots ==

1. A quote floated into an article with the body text wrapping around it.
2. A quote dropped into the copy so the text flows above, around, and under it.
3. The Quote Wrap panel: float side, display width, gaps, vertical and horizontal offsets, alignment, quote-mark glyph, and attribution.

== Changelog ==

= 1.1.0 =
* The attribution is now output as a figcaption element instead of cite, which is the correct semantics (cite is for the title of a work, not a person). Quotes published under earlier versions migrate automatically on first edit.

= 1.0.1 =
* Card style with a vertical offset now lays out correctly on phones (below 600px the card background no longer detaches from the quote).
* The decorative quote marks are hidden from screen readers, so they are no longer read aloud as "left double quotation mark" and the like.
* Dropped the opacity on the attribution line so its text keeps full contrast.
* Hardened the attribution's sanitization fallback.

= 1.0.0 =
* Initial release.
* Pull quote that floats left or right with the body text wrapping around it.
* Adjustable display width and text-side gap.
* Vertical offset that flows the following paragraph above the quote (Default style) or moves the card down (Card style), plus a horizontal offset to inset or outset the quote.
* A clean floated default look (prominent quote mark, medium-weight quote a step larger than body copy, italic attribution) with an opt-in Card style.
* Opening and closing smart quotes with a choice of glyph (double, sans-serif, guillemets, single, low-high) and an on/off toggle.
* Left or right alignment for the quote, attribution, and closing mark.
* Optional attribution line accepting simple inline HTML.
* Standard Color, Border, Shadow, Dimensions, and Typography support.
* Responsive: drops to full width below 600px.
* Static HTML save, so content survives editor updates and plugin deactivation.

== Upgrade Notice ==

= 1.1.0 =
The attribution now uses a figcaption element for correct semantics. Existing quotes update automatically on first edit.

= 1.0.1 =
Mobile layout fix for card quotes with a vertical offset, plus accessibility and security hardening.

= 1.0.0 =
Initial release.
