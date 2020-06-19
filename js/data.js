'use strict';

(function () {

  var loadSuccessHandler = function (photos) {

    var picturesContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var element = pictureTemplate.cloneNode(true);

      element.querySelector('.picture__img').src = photos[i].url;
      element.querySelector('.picture__comments').textContent = photos[i].comments.length;
      element.querySelector('.picture__likes').textContent = photos[i].likes;

      fragment.appendChild(element);
    }

    picturesContainer.appendChild(fragment);

  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style.height = 'auto';
    node.style.position = 'absolute';
    node.style.top = '40%';
    node.style.left = '50%';
    node.style.padding = '0.5em';
    node.style.fontSize = '20px';
    node.style.borderRadius = '0.5em';
    node.style.backgroundColor = 'deepskyblue';
    node.style.color = 'black';
    node.style.transform = 'translate(-50%; -50%)';
    node.style.zIndex = '25';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

  };


  window.backend.load(loadSuccessHandler, loadErrorHandler);


})();
