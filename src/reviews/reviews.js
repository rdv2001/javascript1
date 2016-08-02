'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsMore = document.querySelector('.reviews-controls-more');
var PAGE_SIZE = 3;
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
var pageNumber = 0;

var reviewMethods = require('./reviewsMethods');
var Review = require('./review');

var reviews = [];
var filteredReviews = [];
var drawnReviews = [];

reviewsMore.classList.remove('invisible');

var setFiltersEnabled = function() {
  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.name === 'reviews') {
      setFilterEnabled(evt.target.id);
    }
  });
};

var setFilterEnabled = function(filter) {
  var currentFilter = document.getElementById(filter);
  currentFilter.setAttribute('checked', true);
  localStorage.setItem('lastFilter', filter);

  reviewsMore.classList.remove('invisible');
  filteredReviews = reviewMethods.getFiltered(filter, reviews);
  pageNumber = 0;
  drawReviews(filteredReviews, pageNumber, true);
};

var drawReviews = function(reviewsToFilter, page, replace) {
  if (replace) {
    drawnReviews.forEach(function(review) {
      review.remove();
    });
    drawnReviews = [];
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviewsToFilter.slice(from, to).forEach(function(review) {
    drawnReviews.push(new Review(review, reviewsContainer));
  });
};

var showMoreReviews = function() {
  reviewsMore.addEventListener('click', function() {
    pageNumber++;
    drawReviews(filteredReviews, pageNumber);
    if ((pageNumber + 1) === (Math.ceil(filteredReviews.length / PAGE_SIZE))) {
      reviewsMore.classList.add('invisible');
    }
  });
};

reviewMethods.load(function(loadedReviews) {
  reviews = loadedReviews;
  reviewMethods.howMuchFilters(reviews, reviewsFilter);
  setFiltersEnabled();

  var lastFilter = localStorage.getItem('lastFilter');
  if (lastFilter) {
    setFilterEnabled(lastFilter);
  } else {
    setFilterEnabled();
  }

  showMoreReviews();
}, REVIEWS_LOAD_URL);
