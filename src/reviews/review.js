'use strict';

var reviewsMethods = require('./reviewsMethods');

var Review = function(data, container) {

  this.data = data;
  this.element = reviewsMethods.getElement(this.data, container);

  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');

  this.onYesClick = this.onYesClick.bind(this);
  this.onNoClick = this.onNoClick.bind(this);
  this.remove = this.remove.bind(this);

  this.quizAnswerNo.addEventListener('click', this.onNoClick);
  this.quizAnswerYes.addEventListener('click', this.onYesClick);
};

Review.prototype.onYesClick = function() {
  this.quizAnswerNo.classList.remove('review-quiz-answer-active');
  this.quizAnswerYes.classList.add('review-quiz-answer-active');
};

Review.prototype.onNoClick = function() {
  this.quizAnswerYes.classList.remove('review-quiz-answer-active');
  this.quizAnswerNo.classList.add('review-quiz-answer-active');
};

Review.prototype.remove = function() {
  this.quizAnswerNo.removeEventListener('click', this.onYesClick);
  this.quizAnswerYes.removeEventListener('click', this.onNoClick);
  this.element.parentNode.removeChild(this.element);
};

module.exports = Review;
