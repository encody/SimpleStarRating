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
        var max = (target.getAttribute('data-stars') ?
                parseInt(target.getAttribute('data-stars')) : 5),
            disabled = false,
            currentRating = (target.getAttribute('data-rating') ?
                parseFloat(target.getAttribute('data-rating')) : 0),
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
        }

        this.setCurrentRating = setCurrentRating;

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

        showCurrentRating();

        function showCurrentRating() {
            clearRating();
            currentRating = parseFloat(target.getAttribute('data-rating')) || 0;
            for (var i = 0; i < stars.length; i++) {
                if (i >= currentRating)
                    break;
                if (i === Math.floor(currentRating) && i !== currentRating)
                    stars[i].classList.add('half');
                stars[i].classList.add('active');
            }
        }

        function clearRating() {
            for (var i = 0; i < stars.length; i++) {
                stars[i].classList.remove('active');
                stars[i].classList.remove('half');
            }
        }

        function starClick(e) {
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
