'use strict';

(function () {

  var GAP_FOR_COMMENT = 5;

  var bigPictureContainer = document.querySelector('.big-picture');
  var bigPictureButtonCancel = bigPictureContainer.querySelector('.big-picture__cancel');

  var commentsContainer = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');

  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentCountPreview = document.querySelector('.comments-count-preview');
  var buttonCommentLoader = bigPictureContainer.querySelector('button.comments-loader');


  var showMoreComments = function () {
    var hiddenComments = document.querySelectorAll('.social__comment.hidden');

    for (var i = 0; i < Math.min(GAP_FOR_COMMENT, hiddenComments.length); i++) {
      hiddenComments[i].classList.remove('hidden');
      socialCommentCountPreview.textContent++;
    }

    if (hiddenComments.length <= GAP_FOR_COMMENT) {
      buttonCommentLoader.classList.add('hidden');
    }
  };

  var showComments = function (photo) {

    var excessMarkup = document.querySelectorAll('.social__comment');
    for (var i = 0; i < excessMarkup.length; i++) {
      excessMarkup[i].remove();
    }

    socialCommentCountPreview.textContent = 5;

    for (var j = 0; j < photo.comments.length; j++) {
      var comment = commentTemplate.cloneNode(true);
      var avatar = comment.querySelector('.social__picture');

      comment.querySelector('.social__text').textContent = photo.comments[j].message;
      avatar.src = photo.comments[j].avatar;
      avatar.alt = photo.comments[j].name;

      if (j >= 5) {
        comment.classList.add('hidden');
      }

      commentsContainer.appendChild(comment);
    }

    if (photo.comments.length > 5) {
      buttonCommentLoader.classList.remove('hidden');
      socialCommentCount.classList.remove('hidden');
      buttonCommentLoader.addEventListener('click', showMoreComments);
    } else {
      buttonCommentLoader.classList.add('hidden');
      socialCommentCount.classList.add('hidden');
    }

  };

  var showPhotoDetails = function (photoSrc) {
    var photo = window.data.slice().filter(function (el) {
      return el.url === photoSrc;
    })[0];

    bigPictureContainer.classList.remove('hidden');

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

    buttonCommentLoader.removeEventListener('click', showMoreComments);
    bigPictureButtonCancel.removeEventListener('click', closeBigPhotoHandler);
    document.removeEventListener('keydown', closeBigPhotoOnKeydownHandler);
  };

  var closeBigPhotoOnKeydownHandler = function (evt) {

    if (evt.key === 'Escape') {
      closeBigPhotoHandler(evt);
    }
  };

  var changeData = function (evt) {
    var photos = document.querySelectorAll('a.picture');

    for (var i = 0; i < photos.length; i++) {
      if (evt.currentTarget.dataset.url === photos[i].dataset.url) {
        showPhotoDetails(photos[i].dataset.url);
        break;
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
