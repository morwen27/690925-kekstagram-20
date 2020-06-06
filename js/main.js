'use strict';

var QUANTITY_PHOTOS = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var AUTHORS = ['Барсик', 'Мурка', 'Глашка', 'Пушок', 'Дикий и необузданный кот', 'Лапочка', 'Марсель', 'Корсик', 'Пёс'];

var getRandomNumber = function (min, max) {
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return number;
};

var generateCommentsArray = function (comments, authors) {
  var commentsArray = [];
  var quantityComments = getRandomNumber(1, comments.length);

  for (var i = 1; i <= quantityComments; i++) {
    var comment = {};

    comment.avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    comment.message = comments[getRandomNumber(0, comments.length - 1)] + ' ' + comments[getRandomNumber(0, comments.length - 1)];
    comment.name = authors[getRandomNumber(0, authors.length - 1)];

    commentsArray.push(comment);
  }

  return commentsArray;
};

var generatePhotosData = function (quantity) {
  var photosArray = [];

  for (var i = 1; i <= quantity; i++) {
    var photo = {};

    photo.url = 'photos/' + i + '.jpg';
    photo.description = '';
    photo.likes = getRandomNumber(15, 200);
    photo.comments = generateCommentsArray(COMMENTS, AUTHORS);

    photosArray.push(photo);

  }

  return photosArray;
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

var data = generatePhotosData(QUANTITY_PHOTOS);
renderOtherUsersPhotos(data);

var documentBody = document.querySelector('body');
var bigPictureContainer = document.querySelector('.big-picture');

var commentsList = bigPictureContainer.querySelectorAll('.social__comment');
var socialCommentCount = bigPictureContainer.querySelector('.social__comment-count');
var buttonCommentLoader = bigPictureContainer.querySelector('button.comments-loader');

documentBody.classList.add('modal-open');
bigPictureContainer.classList.remove('hidden');
socialCommentCount.classList.add('hidden');
buttonCommentLoader.classList.add('hidden');

bigPictureContainer.querySelector('.big-picture__img img').src = data[0].url;
bigPictureContainer.querySelector('.likes-count').textContent = data[0].likes;
bigPictureContainer.querySelector('.comments-count').textContent = data[0].comments.length;
//bigPictureContainer.querySelector('.social__caption').textContent = data[0].description;

for (var i = 0; i < commentsList.length; i++) {
  var comment = commentsList[i];

  comment.querySelector('.social__text').textContent = data[0].comments[i].message;
  comment.querySelector('.social__picture').src = data[0].comments[i].avatar;
  comment.querySelector('.social__picture').alt = data[0].comments[i].name;

  if (data[0].comments.length === 1) {
    break;
  }
}
