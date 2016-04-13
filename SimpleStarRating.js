/**

The MIT License (MIT)

Copyright (c) 2016 Jacob Lindahl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */

var SimpleStarRating = (function () {
    function SimpleStarRating(target) {
        function attr(name, d) {
            var a = target.getAttribute(name);
            return (a ? a : d);
        }

        var max = parseInt(attr('data-stars', 5)),
            disabled = typeof target.getAttribute('disabled') != 'undefined',
            defaultRating = parseFloat(attr('data-default-rating', 0)),
            currentRating = -1,
            stars = [];

        target.style.display = 'inline-block';

        for (var s = 0; s < max; s++) {
            var n = document.createElement('span');
            n.className = 'star';
            n.addEventListener('click', starClick);
            if (s > 0)
                stars[s - 1].appendChild(n);
            else
                target.appendChild(n);

            stars.push(n);
        }

        function disable() {
            target.setAttribute('disabled', '');
            disabled = true;
        }
        this.disable = disable;

        function enable() {
            target.removeAttribute('disabled');
            disabled = false;
        }
        this.enable = enable;

        function setCurrentRating(rating) {
            currentRating = rating;
            target.setAttribute('data-rating', currentRating);
            showCurrentRating();
        }
        this.setCurrentRating = setCurrentRating;

        function setDefaultRating(rating) {
            defaultRating = rating;
            target.setAttribute('data-default-rating', defaultRating);
            showDefaultRating();
        }
        this.setDefaultRating = setDefaultRating;

        this.onrate = function (rating) {};

        target.addEventListener('mouseout', function () {
            disabled = target.getAttribute('disabled') !== null;
            if (!disabled)
                showCurrentRating();
        });

        target.addEventListener('mouseover', function () {
            disabled = target.getAttribute('disabled') !== null;
            if (!disabled)
                clearRating();
        });

        showDefaultRating();

        function showRating(r) {
            clearRating();
            for (var i = 0; i < stars.length; i++) {
                if (i >= r)
                    break;
                if (i === Math.floor(r) && i !== r)
                    stars[i].classList.add('half');
                stars[i].classList.add('active');
            }
        }

        function showCurrentRating() {
            var ratingAttr = parseFloat(attr('data-rating', 0));
            if (ratingAttr) {
                currentRating = ratingAttr;
                showRating(currentRating);
            } else {
                showDefaultRating();
            }
        }

        function showDefaultRating() {
            defaultRating = parseFloat(attr('data-default-rating', 0));
            showRating(defaultRating);
        }

        function clearRating() {
            for (var i = 0; i < stars.length; i++) {
                stars[i].classList.remove('active');
                stars[i].classList.remove('half');
            }
        }

        function starClick(e) {
            if (disabled) return;

            if (this === e.target) {
                var starClicked = stars.indexOf(e.target);
                if (starClicked !== -1) {
                    var starRating = starClicked + 1;
                    setCurrentRating(starRating);
                    if (typeof this.onrate === 'function')
                        this.onrate(currentRating);
                    var evt = new CustomEvent('rate', {
                        detail: starRating,
                    });
                    target.dispatchEvent(evt);
                }
            }
        }
    }

    return SimpleStarRating;
})();
