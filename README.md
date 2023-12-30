# MotionScroll JS

Congrats! You can now create scroll animation with CSS keyframes easily

Version 0.1.0

# Examples

[View on demo](https://louisho5.github.io/MotionScroll/example/)

![alt thumbnail](https://raw.githubusercontent.com/louisho5/MotionScroll/main/thumbnail.gif)

## Summary

Create scroll animations easily with just a single line of code by using motionscroll.js.

* <strong>Keyframes-like animation</strong><br>
* <strong>Customize everything with CSS only knowledge</strong><br>
* <strong>Multiple layers support</strong><br>
* <strong>Super lightweight, only 4KB</strong><br>
* <strong>Minimal and ease to use</strong><br>

## Author

@louisho5

## Installation

To include the library in your code:

```js script

<script src="motionscroll.min.js"></script>

```

CDN:

```js script

<script src="https://cdn.jsdelivr.net/gh/louisho5/MotionScroll@latest/motionscroll.min.js"></script>

```

## Requirements/Browsers

Works in Edge 12+, Chrome 43+, Safari 9+, Firefox 28+.

## Code Example

**index.html**:

```html

<div class="motionscroll">
  <div data-motionscroll-to="transform: rotateY(360deg)">😻</div>
</div>

<script src="motionscroll.min.js"></script>
<script>
    new MotionScroll(".motionscroll");
</script>

```

## Parameters

There are 8 optional parameters in this library:

```js script

new MotionScroll({
  container: ".motionscroll",   // The container trigger
  layer: "[data-motionscroll-to],[data-motionscroll-animate]",   // The scroll animation will be applied to those layer inside the container
  ease: 'linear',   // CSS timing function like linear, ease, ease-in-out, cubic-bezier and etc...'
  offsetTop: 0,   // In "px" unit
  offsetBottom: 0,   // In "px" unit
  reverse: true,    // Reverse playing
  playOnce: false,    // Play only once
  override: false,    // Override all motionscroll styles
});

```

## Functions

There are 2 optional functions in this library:

```js script

var motionScroll = new MotionScroll();

/* Destroy */
motionScroll.destroy();

/* Initialize */
motionScroll.init();

```

## License

This library is under the MIT license.
