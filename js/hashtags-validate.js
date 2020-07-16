'use strict';

(function () {
  var MAX_HASHTAGS_QUANTITY = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagsInput = document.querySelector('.text__hashtags');

  var validateHashtags = function () {
    var hashtags = hashtagsInput.value.split(' ').map(function (hashtag) {
      return hashtag.toLowerCase();
    });

    var message = '';

    if (hashtags.length > MAX_HASHTAGS_QUANTITY) {
      message = 'Количество хештегов не должно превышать ' + MAX_HASHTAGS_QUANTITY;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      var count = 0;

      if (hashtag[0] === '#' && hashtag.length === 1) {
        message = 'Хештег не должен состоять только из #';
      }
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        message = 'Хештег должен состоять не более чем из ' + MAX_HASHTAG_LENGTH + ' символов, включая #';
      }
      if (!/^#[a-zа-я0-9]*$/.test(hashtag)) {
        message = 'Хештег должен состоять только из букв и цифр и начинаться с #';
      }
      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtag === hashtags[j]) {
          count++;
        }
      }
      if (count > 0) {
        message = 'Хештеги не должны повторяться';
      }
    }

    hashtagsInput.setCustomValidity(message);
  };

  window.hashtagsValidate = {
    validateHashtags: validateHashtags,
  };
})();
