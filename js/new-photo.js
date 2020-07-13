'use strict';

(function () {
  var FILE_TYPES = ['jpeg', 'jpg', 'gif', 'png'];

  var uploadImageInput = document.querySelector('#upload-file');
  var imagePreview = document.querySelector('.img-upload__preview img');

  uploadImageInput.addEventListener('change', function () {
    var file = uploadImageInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
