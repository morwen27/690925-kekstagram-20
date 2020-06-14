'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectLevelSet = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');


  var resetSettings = function () {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = effectLevelPin.style.left;

    effectLevelValue.value = '100';

    imagePreview.removeAttribute('class');
    imagePreview.removeAttribute('style');
  };

  var setEffect = function (evt) {
    resetSettings();

    imagePreview.setAttribute('class', '');
    imagePreview.classList.add('effects__preview--' + evt.target.value);

    if (evt.target.value === 'none') {
      effectLevelSet.classList.add('hidden');
    } else {
      effectLevelSet.classList.remove('hidden');
    }

  };

  var convertPinOffset = function (offset, maxUnit) {
    var effectParameter = offset * maxUnit / 100;

    return effectParameter;
  };

  var setLevelEffect = function (level) {
    var pinOffset = level;
    var currentEffect = imagePreview.className.replace(/effects__preview--/, '');

    switch (currentEffect) {
      case 'chrome':
        imagePreview.style.filter = 'grayscale(' + convertPinOffset(pinOffset, 1) + ')';
        break;
      case 'sepia':
        imagePreview.style.filter = 'sepia(' + convertPinOffset(pinOffset, 1) + ')';
        break;
      case 'marvin':
        imagePreview.style.filter = 'invert(' + convertPinOffset(pinOffset, 100) + '%)';
        break;
      case 'phobos':
        imagePreview.style.filter = 'blur(' + convertPinOffset(pinOffset, 3) + 'px)';
        break;
      case 'heat':
        imagePreview.style.filter = 'brightness(' + convertPinOffset(pinOffset, 3) + ')';
        break;
      case 'none':
        imagePreview.style.filter = 'none';
    }

    effectLevelValue.value = pinOffset;
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;
    var widthLine = effectLevelLine.getBoundingClientRect().width;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shiftX = startX - widthLine;
      var levelHue = Math.round((shiftX * 100) / widthLine);

      startX = evtMove.clientX;

      effectLevelPin.style.left = levelHue + '%';
      effectLevelDepth.style.width = effectLevelPin.style.left;

      setLevelEffect(levelHue);

      if (levelHue >= 100) {
        effectLevelPin.style.left = '100%';
        effectLevelDepth.style.width = '100%';
      } else if (levelHue <= 0) {
        effectLevelPin.style.left = '0';
        effectLevelDepth.style.width = '0';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.setEffectLevel = {
    setEffect: setEffect,
  };
})();
