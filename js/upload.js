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

  var uploadCancelButtonKeydownHandler = function (evt) {
    if (evt.key === 'Escape' && hashtagsInput !== document.activeElement && textDescription !== document.activeElement) {
      evt.preventDefault();
      uploadCancelButtonClickHandler();
    }
  };

  var uploadCancelButtonClickHandler = function () {
    document.body.classList.remove('modal-open');
    uploadedImageForm.classList.add('hidden');

    uploadImageInput.value = '';

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

  });
})();
