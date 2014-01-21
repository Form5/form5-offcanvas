form5-offcanvas
===============

form5-offcanvas is a powerful jQuery plugin that enables you to use an
offcanvas sidebar on your site. Only **4KB** of minified
Javascript, along with your own styles (very basic demo styles are provided).

[Demo](http://form5.github.io/form5-offcanvas/)

## Getting started

### How to fetch form5-offcanvas?

Install with [Bower](http://bower.io): `bower install form5-offcanvas`

Clone the Github project: `git clone https://github.com/Form5/form5-offcanvas.git`

Or [download zip](https://github.com/Form5/form5-offcanvas/archive/master.zip).

### Then what?

After installation simply load the files along with other styles and scripts.
Remember that this script requires jQuery, meaning jQuery should already be
loaded before this script. We recommend using the latest stable release.

```html
<link rel="stylesheet" href="path/to/form5-offcanvas.css">
...
<script src="path/to/jquery.js"></script>
<script src="path/to/form5-offcanvas.min.js"></script>
<script>
  $(function(){
    $('offcanvas').offcanvas();
  });
</script>
```

Construct your content as demonstrated below. In case of disabled javascript,
styles should take care of downgrading your sidebar to either visible content
or what ever fits your needs. Note that the `<offcanvas>` element can be
literally anything, for example `nav` or just an old school `div`. Just make
sure to use the appropriate selector when enabling the script (check out our
[demo](http://form5.github.io/form5-offcanvas/)).

```html
<body>
  <main>
    ...
  </main>
  <offcanvas>
    ...
  </offcanvas>
</body>
```

## Advanced usage

There are a few ways to configure the scripts functionality. Here you can see
all the options with their default values, and below you can find more
detailed description for each option.

```javascript
$('offcanvas').offcanvas({
  toggle: '.toggle-canvas',
  canvas: ['main'],
  open: function(){},
  close: function(){},
  init: function(){},
  debug: false
});
```

`toggle: string (selector)` **Default: '.toggle-canvas'**

Selector for elements that should toggle the sidebar, usually some kind of
button, obviously depending on your markup.

`canvas: array (of selectors)`**Default: ['main']**

An array of elements that should be considered a part of the 'canvas', meaning
elements that should be animated to the side on toggle. Usually this should
only be the main wrapping element of your page, but sometimes we need to do
things like fixed navigation requiring an element to be outside that should
still be treated as if it were inside (this is getting way to complicated).
Basically, all elements that should be moved out of the way from our offcanvas
sidebar. **Note:** the main wrapping element should be listed first, and the
others should follow, if any.

`open: function ()` **Default: function() {}**

Optional function to be ran each time the sidebar is opened.

`close: function ()` **Default: function() {}**

Optional function to be ran each time the sidebar is closed.

`init: function ()` **Default: function() {}**

Optional function to be ran at initialization.

`debug: boolean` **Default: false**

If you are having problems and are not sure certain parts of the scripts are
actually working, you can enable this option to receive console.logs with
messages for initialization, opening, closing and destroying.

### After initialization

For js vs no-js styling, an `[alive='true']` attribute is included after
initialization. See demo styles for an idea of usage.

To toggle the offcanvas sidebar outside of the default triggers, you can
simply call the function again with no options, as demonstrated below. In a
similar manner we can explicitly open or close our sidebar by using these
helper strings.

```javascript
// Toggle sidebar
$('offcanvas').offcanvas();
// Open sidebar
$('offcanvas').offcanvas('open');
// Close sidebar
$('offcanvas').offcanvas('close');
```

Sometimes we do things we wish we hadn't, and just wanna take a step back and
rethink the situation. For those instances, we included a helper string that
enables you to simply reverse all changes made by this script.

```javascript
$('offcanvas').offcanvas('destroy');
```

After running this, you can initialize a fresh offcanvas with new options
or whatever your mind can imagine.

### Still not satisfied?

You could go all in and customize the script directly. The original can be
found in `src/form5-offcanvas.js`. To compile a minified/uglified version of
your new script you can build it again by running:

```shell
$ npm install
$ grunt build
```

If you would like to extend the core functionality of this script in a way
that could benefit others, don't hesitate to create a pull request!

## Cress

### Using [Cress](http://github.com/Form5/Cress)

If you are using our awesome CSS framework Cress, you can find a `.scss` file
using the appropriate variables in `src/form5-offcanvas.cress.scss`. That way
you have a basic offcanvas sidebar working directly with your current styles.

## Author
Written by [Benedikt D Valdez](http://github.com/benediktvaldez), developer at
[Form5](http://www.form5.is).

### Contributors
[Olafur Nielsen](http://twitter.com/olafurnielsen), co-founder at
[Form5](http://www.form5.is).
