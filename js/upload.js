'use strict';

(function () {
  var uploadImageInput = document.querySelector('#upload-file');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var uploadedImageForm = document.querySelector('.img-upload__overlay');

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  var effectList = document.querySelector('fieldset.img-upload__effects');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  var uploadForm = document.querySelector('#upload-select-image');
  var imagePreview = document.querySelector('.img-upload__preview img');

  var uploadCancelButtonKeydownHandler = function (evt) {
    if (evt.key === window.fullscreenMode.ESC && hashtagsInput !== document.activeElement && textDescription !== document.activeElement) {
      evt.preventDefault();
      uploadCancelButtonClickHandler();
    }
  };

  var uploadCancelButtonClickHandler = function () {
    document.body.classList.remove('modal-open');
    uploadedImageForm.classList.add('hidden');

    uploadImageInput.value = '';
    imagePreview.src = '';

    uploadForm.reset();
    window.setEffectLevel.resetSettings();

    document.removeEventListener('keydown', uploadCancelButtonKeydownHandler);
    uploadCancelButton.removeEventListener('click', uploadCancelButtonClickHandler);

    scaleControlSmaller.removeEventListener('click', window.scalePreview.changeScaleValue);
    scaleControlBigger.removeEventListener('click', window.scalePreview.changeScaleValue);

    effectList.removeEventListener('change', window.setEffectLevel.setEffect);

    hashtagsInput.removeEventListener('input', window.hashtagsValidate.validateHashtags);

  };

  uploadImageInput.addEventListener('change', function () {
    document.body.classList.add('modal-open');
    uploadedImageForm.classList.remove('hidden');

    document.addEventListener('keydown', uploadCancelButtonKeydownHandler);
    uploadCancelButton.addEventListener('click', uploadCancelButtonClickHandler);

    scaleControlSmaller.addEventListener('click', window.scalePreview.changeScaleValue);
    scaleControlBigger.addEventListener('click', window.scalePreview.changeScaleValue);

    effectList.addEventListener('change', window.setEffectLevel.setEffect);

    hashtagsInput.addEventListener('input', window.hashtagsValidate.validateHashtags);

    uploadForm.addEventListener('submit', uploadImage);
  });

  var showMessage = function (about) {
    var mainBlock = document.querySelector('main');
    var messageTemplate = document.querySelector('#' + about).content.querySelector('.' + about);
    var message = messageTemplate.cloneNode(true);
    var button = message.querySelector('.' + about + '__button');

    var removeMessageHandler = function () {
      message.remove();
      window.removeEventListener('click', removeMessageHandler);
      window.removeEventListener('keydown', removeMessageHandlerOnEscape);
    };

    var removeMessageHandlerOnEscape = function (evt) {
      if (evt.key === window.fullscreenMode.ESC) {
        removeMessageHandler();
      }
    };

    mainBlock.appendChild(message);

    button.addEventListener('click', removeMessageHandler);
    window.addEventListener('keydown', removeMessageHandlerOnEscape);
    window.addEventListener('click', removeMessageHandler);
  };

  var resetUploadForm = function () {

    uploadCancelButtonClickHandler();
    window.setEffectLevel.resetSettings();
    uploadForm.removeEventListener('submit', uploadImage);
  };

  var uploadImage = function (evt) {
    window.backend.share(new FormData(uploadForm), function () {

      resetUploadForm();
      showMessage('success');

    }, function () {

      resetUploadForm();
      showMessage('error');
    });

    evt.preventDefault();
  };

})();
