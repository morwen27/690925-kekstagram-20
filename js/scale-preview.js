'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlInput = document.querySelector('.scale__control--value');

  var testScaleButtons = function (value) {
    var minScale = 25;
    var maxScale = 100;

    scaleControlBigger.removeAttribute('disabled');
    scaleControlSmaller.removeAttribute('disabled');

    if (value === minScale) {
      scaleControlSmaller.setAttribute('disabled', '');
    } else if (value === maxScale) {
      scaleControlBigger.setAttribute('disabled', '');
    }
  };

  var changeScaleValue = function (evt) {
    var scaleControlValue = document.querySelector('.scale__control--value').value;
    var scaleStep = 25;

    scaleControlValue = parseInt(scaleControlValue, 10);

    if (evt.target === scaleControlSmaller) {
      scaleControlValue -= scaleStep;
    } else if (evt.target === scaleControlBigger) {
      scaleControlValue += scaleStep;
    }

    testScaleButtons(scaleControlValue);
    imagePreview.style = 'transform: scale(' + scaleControlValue / 100 + ')';

    scaleControlValue += '%';
    scaleControlInput.value = scaleControlValue;
  };

  window.scalePreview = {
    changeScaleValue: changeScaleValue
  };
})();
