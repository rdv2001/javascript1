'use strict';

var Gallery = function(picturesContainer, galleryContainer) {

  this.hostUrl = location.origin;
  this.ESCAPE = 27;
  this.galleryPictures = picturesContainer.querySelectorAll('img');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.closeBtn = document.querySelector('.overlay-gallery-close');
  this.currentImage = new Image();
  this.galleryContainer = galleryContainer;

  this.currentNumber = 0;

  this.pictures = [];

  this.hashChange = this.hashChange.bind(this);
  this.pageReady = this.pageReady.bind(this);
  this.picturesContainerClick = this.picturesContainerClick.bind(this);
  this.fillPictures = this.fillPictures.bind(this);
  this.showGallery = this.showGallery.bind(this);
  this.showPicture = this.showPicture.bind(this);
  this.setHash = this.setHash.bind(this);
  this.changePicNumber = this.changePicNumber.bind(this);
  this.hideGallery = this.hideGallery.bind(this);
  this.checkControlBounds = this.checkControlBounds.bind(this);
  this.clickEscape = this.clickEscape.bind(this);
  this.switchRight = this.switchRight.bind(this);
  this.switchLeft = this.switchLeft.bind(this);

  this.fillPictures(this.galleryPictures);

  picturesContainer.addEventListener('click', this.picturesContainerClick);
  window.addEventListener('hashchange', this.hashChange);
  document.addEventListener('DOMContentLoaded', this.pageReady);
};

Gallery.prototype.hashChange = function() {
  var hashContent = location.hash.match(/#photo\/(\S+)/);
  if (hashContent) {
    this.showGallery(this.pictures.indexOf(hashContent[1]));
  }
};

Gallery.prototype.pageReady = function() {
  var hashContent = location.hash.match(/#photo\/(\S+)/);
  if (hashContent) {
    this.showGallery(null, hashContent[1]);
  }
};

Gallery.prototype.picturesContainerClick = function(evt) {
  evt.preventDefault();
  this.setHash(evt.target.getAttribute('src'));
};

Gallery.prototype.fillPictures = function(pics) {
  pics.forEach(function(picture) {
    this.pictures.push(picture['src']);
  }, this);

  this.pictures = this.pictures.map(function(picturesUrl) {
    var symbolsToDelete = this.hostUrl + '/';
    return picturesUrl.substr(symbolsToDelete.length);
  }, this);
};

Gallery.prototype.showGallery = function(number, picUrl) {
  this.galleryContainer.classList.remove('invisible');

  this.currentNumber = (picUrl) ? (this.pictures.indexOf(picUrl)) : number;
  this.showPicture(number, picUrl);
  this.checkControlBounds(number);

  this.closeBtn.addEventListener('click', this.hideGallery);
  this.controlRight.addEventListener('click', this.switchRight);
  this.controlLeft.addEventListener('click', this.switchLeft);
  window.addEventListener('keyup', this.clickEscape);
};

Gallery.prototype.showPicture = function(picNumber, picUrl) {
  var preview = document.querySelector('.overlay-gallery-preview');
  if (picUrl) {
    this.currentImage.setAttribute('src', picUrl);
    preview.appendChild(this.currentImage);
  } else {
    this.currentImage.setAttribute('src', this.pictures[this.currentNumber]);
    preview.appendChild(this.currentImage);
  }

  this.changePicNumber();
};

Gallery.prototype.setHash = function(myUrl) {
  location.hash = (myUrl) ? ('#photo/' + myUrl) : '';
};

Gallery.prototype.changePicNumber = function() {
  var previewCurrentNumber = document.querySelector('.preview-number-current');
  var previewTotalNumber = document.querySelector('.preview-number-total');
  previewCurrentNumber.innerHTML = this.currentNumber + 1;
  previewTotalNumber.innerHTML = this.pictures.length;
};

Gallery.prototype.hideGallery = function() {
  this.galleryContainer.classList.add('invisible');

  this.setHash();
  this.currentNumber = 0;

  this.closeBtn.removeEventListener('click', this.hideGallery);
  this.controlRight.removeEventListener('click', this.switchRight);
  this.controlLeft.removeEventListener('click', this.switchLeft);
  window.removeEventListener('keyup', this.clickEscape);
};

Gallery.prototype.checkControlBounds = function(index) {
  if (index === this.pictures.length - 1) {
    this.controlRight.classList.add('invisible');
  } else {
    this.controlRight.classList.remove('invisible');
  }

  if (index === 0) {
    this.controlLeft.classList.add('invisible');
  } else {
    this.controlLeft.classList.remove('invisible');
  }
};

Gallery.prototype.clickEscape = function(evt) {
  if (evt.keyCode === this.ESCAPE) {
    this.hideGallery();
  }
};

Gallery.prototype.switchLeft = function() {
  this.currentNumber--;
  this.checkControlBounds(this.currentNumber);
  this.setHash(this.pictures[this.currentNumber]);
};

Gallery.prototype.switchRight = function() {
  this.currentNumber++;
  this.checkControlBounds(this.currentNumber);
  this.setHash(this.pictures[this.currentNumber]);
};

module.exports = Gallery;
