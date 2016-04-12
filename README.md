# SimpleStarRating

Easily add star ratings to your project with SimpleStarRating.

Give elements a class of `rating` and apply an instance of `SimpleStarRating` to
each rating element to convert it.

Supports `data-stars` and `data-rating` attributes on the target element to
determine how many stars are the maximum, and how many stars are initially
selected.

    <span id="myRating" class="rating" data-stars="15" data-rating="10.5"></span>
    <!-- Results in a set of 15 stars, 10.5 of them selected -->

Half stars are supported.

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

Customize the styling either by editing the variables in `_config.scss` and
recompiling the stylesheet or add styles like so:

    .rating {
        font-size: 30px; // Changes the size of the stars. Default 20px
        color: green; // Changes the color of filled stars. Default #3af
    }
