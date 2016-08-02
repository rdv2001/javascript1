'use strict';

(function() {
  var Gallery = require('./GalleryConstructor');
  var picturesContainer = document.querySelector('.photogallery');
  var galleryContainer = document.querySelector('.overlay-gallery');

  module.exports = new Gallery(picturesContainer, galleryContainer);

})();
