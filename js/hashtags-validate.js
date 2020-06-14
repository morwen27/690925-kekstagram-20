'use strict';

(function () {
  var hashtagsInput = document.querySelector('.text__hashtags');

  var validateHashtags = function () {
    var hashtags = hashtagsInput.value.split(' ').map(function (hashtag) {
      return hashtag.toLowerCase();
    });

    var message = '';

    if (hashtags.length > 5) {
      message = 'Количество хештегов не должно превышать 5';
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      var count = 0;

      if (hashtag[0] === '#' && hashtag.length === 1) {
        message = 'Хештег не должен состоять только из #';
      }
      if (hashtag.length > 20) {
        message = 'Хештег должен состоять не более чем из 20 символов, включая #';
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
