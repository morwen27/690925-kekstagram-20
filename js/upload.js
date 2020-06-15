'use strict';

(function () {
  var uploadImageInput = document.querySelector('#upload-file');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var uploadedImageForm = document.querySelector('.img-upload__overlay');

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  var effectList = document.querySelector('fieldset.img-upload__effects');
  var hashtagsInput = document.querySelector('.text__hashtags');

  var uploadCancelButtonHandler = function (evt) {
    if (evt.key === 'Escape' && hashtagsInput !== document.activeElement) {
      evt.preventDefault();
      onUploadCancelButton();
    }
  };

  var onUploadCancelButton = function () {
    document.body.classList.remove('modal-open');
    uploadedImageForm.classList.add('hidden');

    uploadImageInput.value = '';

    document.removeEventListener('keydown', uploadCancelButtonHandler);
    uploadCancelButton.removeEventListener('click', onUploadCancelButton);

    scaleControlSmaller.removeEventListener('click', window.scalePreview.changeScaleValue);
    scaleControlBigger.removeEventListener('click', window.scalePreview.changeScaleValue);

    effectList.removeEventListener('change', window.setEffectLevel.setEffect);

    hashtagsInput.removeEventListener('input', window.hashtagsValidate.validateHashtags);

  };

  uploadImageInput.addEventListener('change', function () {
    document.body.classList.add('modal-open');
    uploadedImageForm.classList.remove('hidden');

    document.addEventListener('keydown', uploadCancelButtonHandler);
    uploadCancelButton.addEventListener('click', onUploadCancelButton);

    scaleControlSmaller.addEventListener('click', window.scalePreview.changeScaleValue);
    scaleControlBigger.addEventListener('click', window.scalePreview.changeScaleValue);

    effectList.addEventListener('change', window.setEffectLevel.setEffect);

    hashtagsInput.addEventListener('input', window.hashtagsValidate.validateHashtags);

  });
})();
