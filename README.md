# SimpleStarRating

Easily add star ratings to your project with SimpleStarRating.

Give elements a class of `rating` and apply an instance of `SimpleStarRating` to
each rating element to convert it.

## HTML

Supports `data-stars` and `data-default-rating` attributes on the target element
to determine how many stars are displayed, and how many stars are initially
selected.

    <span id="myRating" class="rating" data-stars="15" data-default-rating="10.5"></span>
    <!-- Results in a set of 15 stars, 10.5 of them selected -->

Half stars are supported.

Every time the rating is changed, the attribute `data-rating` will be
added/updated with the new rating. For example, after clicking on the fourth
star in the example above, the element would look like this:

    <span id="myRating" class="rating" data-stars="15" data-default-rating="10.5" data-rating="4"></span>
    <!-- data-rating attribute added with the value of 4 -->

The presence of the `disabled` attribute disables all interactivity.

    <span id="myRating" class="rating" data-stars="15" data-default-rating="10.5" disabled></span>
    <!-- Only displays a rating; the user may not select a new one -->

## JavaScript

Initialize a new instance of `SimpleStarRating` with the target element as the
only parameter:

    var r = new SimpleStarRating(document.getElementById('myRating'));

Events supported:

    r.onrate = function (rating) {
        // Called whenever the SimpleStarRating is clicked
    };

<!-- -->

    document.getElementById('myRating').addEventListener('rate', function (e) {
        // e.detail contains the rating
    });

A `SimpleStarRating` instance also has these methods:

 - `disable` Disables the rating from being changed
 - `enable` Reenables interactivity
 - `setCurrentRating` Changes the current (user-selected) rating (`data-rating`)
    and displays it
 - `setDefaultRating` Changes the default rating (`data-default-rating`) and
    displays it

## CSS


`.rating`'s are given a display of `inline-block`.

Customize the styling either by editing the variables in `_config.scss` and
recompiling the stylesheet or add styles like so:

    .rating {
        font-size: 30px; // Changes the size of the stars. Default 20px
        color: green; // Changes the color of filled stars. Default #3af
    }
