'use strict';

(function () {

  var showComments = function () {
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentsContainer = document.querySelector('.social__comments');
    var commentTemplate = document.querySelector('.social__comment');

    var excessMarkup = document.querySelectorAll('.social__comment');
    for (var i = 0; i < excessMarkup.length; i++) {
      excessMarkup[i].remove();
    }

    for (var j = 0; j < window.data.data[0].comments.length; j++) {
      var comment = commentTemplate.cloneNode(true);
      var avatar = comment.querySelector('.social__picture');

      comment.querySelector('.social__text').textContent = window.data.data[0].comments[j].message;
      avatar.src = window.data.data[0].comments[j].avatar;
      avatar.alt = window.data.data[0].comments[j].name;

      commentsContainer.appendChild(comment);

    }

    socialCommentCount.classList.add('hidden');

  };

  var showPhotoDetails = function () {
    var bigPictureContainer = document.querySelector('.big-picture');
    var buttonCommentLoader = bigPictureContainer.querySelector('button.comments-loader');

    bigPictureContainer.classList.remove('hidden');
    buttonCommentLoader.classList.add('hidden');

    bigPictureContainer.querySelector('.big-picture__img img').src = window.data.data[0].url;
    bigPictureContainer.querySelector('.likes-count').textContent = window.data.data[0].likes;
    bigPictureContainer.querySelector('.comments-count').textContent = window.data.data[0].comments.length;
    bigPictureContainer.querySelector('.social__caption').textContent = window.data.data[0].description;

    showComments();
  };

  var onFullscreenMode = function () {
    document.body.classList.add('modal-open');

    showPhotoDetails();
  };

  onFullscreenMode();
})();
