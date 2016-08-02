'use strict';

module.exports = {
  howMuchFilters: function(allReviews, reviewsBlock) {
    var myInput = reviewsBlock.getElementsByTagName('label');
    var filtersList = ['reviews-all', 'reviews-bad', 'reviews-recent', 'reviews-good', 'reviews-popular'];
    var reviewsCount = [];

    filtersList.forEach(function(filterName) {
      var count = this.getFiltered(filterName, allReviews);
      reviewsCount.push(count.length);
    }, this);

    [].forEach.call(myInput, function(filterLabel, index) {
      var newSup = document.createElement('sup');
      newSup.innerHTML = reviewsCount[index];
      filterLabel.appendChild(newSup);
    });
  },

  getFiltered: function(filter, reviews) {
    var reviewsToFilter = reviews.slice(0);

    switch (filter) {
      case 'reviews-bad':
        reviewsToFilter = reviewsToFilter.filter(function(review) {
          return review.rating < 3;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case 'reviews-recent':
        reviewsToFilter.sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        break;

      case 'reviews-good':
        reviewsToFilter = reviewsToFilter.filter(function(review) {
          return review.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case 'reviews-popular':
        reviewsToFilter.sort(function(a, b) {
          return b.usefulness - a.usefulness;
        });
        break;

      default:
        reviewsToFilter = reviews;
        break;
    }

    return reviewsToFilter;
  },

  load: function(callback, URL) {
    var LOAD_TIME = 10000;
    var reviewsContainer = document.querySelector('.reviews-list');
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      reviewsContainer.classList.remove('reviews-list-loading');
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };

    xhr.onloadstart = function() {
      reviewsContainer.classList.add('reviews-list-loading');
    };

    xhr.onerror = function() {
      reviewsContainer.classList.remove('reviews-list-loading');
      reviewsContainer.classList.add('reviews-load-failure');
    };

    xhr.timeout = LOAD_TIME;

    xhr.ontimeout = function() {
      reviewsContainer.classList.remove('reviews-list-loading');
      reviewsContainer.classList.add('reviews-load-failure');
    };

    xhr.open('GET', URL);
    xhr.send();
  },

  ratingList: ['one', 'two', 'three', 'four', 'five'],
  IMAGE_WIDTH: 120,
  IMAGE_HEIGHT: 120,

  getElement: function(data, container) {
    var templateElement = document.querySelector('template');
    var elementToClone = templateElement.content.querySelector('.review');
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;

    element.querySelector('span').className = 'review-rating-' + this.ratingList[data.rating - 1];

    container.appendChild(element);

    var reviewImage = new Image();

    reviewImage.onload = function() {
      element.querySelector('img').src = data.author.picture;
      element.querySelector('img').width = this.IMAGE_WIDTH;
      element.querySelector('img').height = this.IMAGE_HEIGHT;
    };

    reviewImage.onerror = function() {
      element.classList.add('review-load-failure');
    };

    reviewImage.src = data.author.picture;

    return element;
  }
};
