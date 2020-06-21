'use strict';

(function () {

  var loadSuccessHandler = function (photos) {

    var picturesContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var element = pictureTemplate.cloneNode(true);

      element.querySelector('.picture__img').src = photos[i].url;
      element.querySelector('.picture__img').setAttribute('tabindex', i);

      element.querySelector('.picture__img').addEventListener('click', window.fullscreenMode.fullscreenPhotosOnClickHandler);
      element.querySelector('.picture__img').addEventListener('keydown', window.fullscreenMode.fullscreenPhotosOnKeydownHandler);

      element.querySelector('.picture__comments').textContent = photos[i].comments.length;
      element.querySelector('.picture__likes').textContent = photos[i].likes;

      fragment.appendChild(element);
    }

    picturesContainer.appendChild(fragment);

    window.data = {
      photoBase: photos,
    };

  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.classList.add('errorMessage');
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);

  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);


})();
