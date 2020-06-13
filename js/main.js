'use strict';

var QUANTITY_PHOTOS = 25;
var SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var AUTHORS = ['Барсик', 'Мурка', 'Глашка', 'Пушок', 'Дикий и необузданный кот', 'Лапочка', 'Марсель', 'Корсик', 'Пёс'];

var documentBody = document.querySelector('body');

var getRandomNumber = function (begin, end) {
  var number = Math.floor(Math.random() * (end - begin + 1)) + begin;

  return number;
};

var generateComments = function () {
  var comments = [];
  var quantityComments = getRandomNumber(1, SENTENCES.length);

  for (var i = 1; i <= quantityComments; i++) {
    var comment = {};
    var quantitySentences = getRandomNumber(1, 2);

    comment.avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';

    comment.message = SENTENCES[getRandomNumber(0, SENTENCES.length - 1)];

    if (quantitySentences > 1) {
      comment.message += ' ' + SENTENCES[getRandomNumber(0, SENTENCES.length - 1)];
    }

    comment.name = AUTHORS[getRandomNumber(0, AUTHORS.length - 1)];

    comments.push(comment);
  }

  return comments;
};

var generatePhotosData = function () {
  var photos = [];

  for (var i = 1; i <= QUANTITY_PHOTOS; i++) {
    var photo = {};

    photo.url = 'photos/' + i + '.jpg';
    photo.description = 'Такой красоты человечество никогда раньше не видело. Не согласны - отписывайтесь';
    photo.likes = getRandomNumber(15, 200);
    photo.comments = generateComments();

    photos.push(photo);

  }

  return photos;
};

var renderOtherUsersPhotos = function (data) {

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var element = pictureTemplate.cloneNode(true);

    element.querySelector('.picture__img').src = data[i].url;
    element.querySelector('.picture__comments').textContent = data[i].comments.length;
    element.querySelector('.picture__likes').textContent = data[i].likes;

    fragment.appendChild(element);
  }

  picturesContainer.appendChild(fragment);

};

var data = generatePhotosData();

renderOtherUsersPhotos(data);

var showComments = function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsContainer = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');

  var excessMarkup = document.querySelectorAll('.social__comment');
  for (var i = 0; i < excessMarkup.length; i++) {
    excessMarkup[i].remove();
  }

  for (var j = 0; j < data[0].comments.length; j++) {
    var comment = commentTemplate.cloneNode(true);
    var avatar = comment.querySelector('.social__picture');

    comment.querySelector('.social__text').textContent = data[0].comments[j].message;
    avatar.src = data[0].comments[j].avatar;
    avatar.alt = data[0].comments[j].name;

    commentsContainer.appendChild(comment);

  }

  socialCommentCount.classList.add('hidden');

};

var showPhotoDetails = function () {
  var bigPictureContainer = document.querySelector('.big-picture');
  var buttonCommentLoader = bigPictureContainer.querySelector('button.comments-loader');

  bigPictureContainer.classList.remove('hidden');
  buttonCommentLoader.classList.add('hidden');

  bigPictureContainer.querySelector('.big-picture__img img').src = data[0].url;
  bigPictureContainer.querySelector('.likes-count').textContent = data[0].likes;
  bigPictureContainer.querySelector('.comments-count').textContent = data[0].comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = data[0].description;

  showComments();
};

var onFullscreenMode = function () {
  documentBody.classList.add('modal-open');

  showPhotoDetails();
};

//onFullscreenMode();


var uploadImageInput = document.querySelector('#upload-file');
var uploadCancelButton = document.querySelector('#upload-cancel');
var uploadedImageForm = document.querySelector('.img-upload__overlay');

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlInput = document.querySelector('.scale__control--value');
var imagePreview = document.querySelector('.img-upload__preview img');

var effectList = document.querySelector('fieldset.img-upload__effects');
var effectLevelSet = document.querySelector('.img-upload__effect-level');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');

var hashtagsInput = document.querySelector('.text__hashtags');

var uploadCancelButtonHandler = function (evt) {
  if (evt.key === 'Escape' && hashtagsInput !== document.activeElement) {
    evt.preventDefault();
    onUploadCancelButton();
  }
};

var onUploadCancelButton = function () {
  documentBody.classList.remove('modal-open');
  uploadedImageForm.classList.add('hidden');

  uploadImageInput.value = '';

  document.removeEventListener('keydown', uploadCancelButtonHandler);
  uploadCancelButton.removeEventListener('click', onUploadCancelButton);

  scaleControlSmaller.removeEventListener('click', changeScaleValue);
  scaleControlBigger.removeEventListener('click', changeScaleValue);

  effectList.removeEventListener('change', setEffect);
  effectLevelPin.removeEventListener('mouseup', setLevelEffect);

  hashtagsInput.removeEventListener('input', validateHashtags);

};

uploadImageInput.addEventListener('change', function () {
  documentBody.classList.add('modal-open');
  uploadedImageForm.classList.remove('hidden');

  document.addEventListener('keydown', uploadCancelButtonHandler);
  uploadCancelButton.addEventListener('click', onUploadCancelButton);

  scaleControlSmaller.addEventListener('click', changeScaleValue);
  scaleControlBigger.addEventListener('click', changeScaleValue);

  effectList.addEventListener('change', setEffect);
  effectLevelPin.addEventListener('mouseup', setLevelEffect);

  hashtagsInput.addEventListener('input', validateHashtags);

});

var changeScaleValue = function (evt) {
  var scaleControlValue = document.querySelector('.scale__control--value').value;
  var scaleStep = 25;

  scaleControlValue = +scaleControlValue.replace(/%/, '');

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

var resetSettings = function () {
  effectLevelPin.style.left = '100%';
  effectLevelDepth.style.width = effectLevelPin.style.left;

  effectLevelValue.value = 0;

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

var setLevelEffect = function () {
  var pinOffset = Math.round((effectLevelPin.offsetLeft * 100) / effectLevelLine.offsetWidth);
  var currentEffect = imagePreview.className.replace(/effects__preview--/, '');

  switch (currentEffect) {
    case 'chrome':
      imagePreview.style.filter = 'greyscale(' + convertPinOffset(pinOffset, 1) + ')';
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
  effectLevelDepth.style.width = pinOffset + '%';
};


var validateHashtags = function () {
  var hashtagsString = hashtagsInput.value;
  var hashtagsArray = hashtagsString.split(' ');
  var hashtags = hashtagsArray.map(function (hashtag) {
    return hashtag.toLowerCase();
  });

  var message = '';
  var regEx = /^#[a-zа-я0-9]*$/;

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
    if (!regEx.test(hashtag)) {
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
