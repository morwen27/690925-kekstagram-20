'use strict';

(function () {

  var bigPictureContainer = document.querySelector('.big-picture');
  var bigPictureButtonCancel = bigPictureContainer.querySelector('.big-picture__cancel');


  var showComments = function (photo) {
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentsContainer = document.querySelector('.social__comments');
    var commentTemplate = document.querySelector('.social__comment');

    var excessMarkup = document.querySelectorAll('.social__comment');
    for (var i = 0; i < excessMarkup.length; i++) {
      excessMarkup[i].remove();
    }

    for (var j = 0; j < Math.min(photo.comments.length, 5); j++) {
      var comment = commentTemplate.cloneNode(true);
      var avatar = comment.querySelector('.social__picture');

      comment.querySelector('.social__text').textContent = photo.comments[j].message;
      avatar.src = photo.comments[j].avatar;
      avatar.alt = photo.comments[j].name;

      commentsContainer.appendChild(comment);

    }

    socialCommentCount.classList.add('hidden');

  };

  var showPhotoDetails = function (index) {
    var photo = window.data.photoBase[index];

    var buttonCommentLoader = bigPictureContainer.querySelector('button.comments-loader');

    bigPictureContainer.classList.remove('hidden');
    buttonCommentLoader.classList.add('hidden');

    bigPictureContainer.querySelector('.big-picture__img img').src = photo.url;
    bigPictureContainer.querySelector('.likes-count').textContent = photo.likes;
    bigPictureContainer.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureContainer.querySelector('.social__caption').textContent = photo.description;


    showComments(photo);
  };

  var closeBigPhotoHandler = function (evt) {
    evt.preventDefault();

    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');

    bigPictureButtonCancel.removeEventListener('click', closeBigPhotoHandler);
    document.removeEventListener('keydown', closeBigPhotoOnKeydownHandler);
  };

  var closeBigPhotoOnKeydownHandler = function (evt) {

    if (evt.key === 'Escape') {
      closeBigPhotoHandler(evt);
    }
  };

  var changeData = function (evt) {
    var photos = document.querySelectorAll('a.picture img');

    for (var i = 0; i < photos.length; i++) {
      if (evt.target.src === photos[i].src) {
        showPhotoDetails(i);
      }
    }
  };

  var openFullscreenMode = function () {
    document.body.classList.add('modal-open');

    bigPictureButtonCancel.addEventListener('click', closeBigPhotoHandler);
    document.addEventListener('keydown', closeBigPhotoOnKeydownHandler);
  };

  var fullscreenPhotosOnClickHandler = function (evt) {
    evt.preventDefault();

    changeData(evt);
    openFullscreenMode();

  };

  var fullscreenPhotosOnKeydownHandler = function (evt) {

    if (evt.key === 'Enter') {
      fullscreenPhotosOnClickHandler(evt);
    }
  };

  window.fullscreenMode = {
    fullscreenPhotosOnClickHandler: fullscreenPhotosOnClickHandler,
    fullscreenPhotosOnKeydownHandler: fullscreenPhotosOnKeydownHandler
  };

})();
