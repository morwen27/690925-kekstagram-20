'use strict';

(function () {

  var renderData = window.debounce.debounceEffect(function (data) {

    var picturesContainer = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var element = pictureTemplate.cloneNode(true);
      var photo = element.querySelector('.picture__img');

      element.setAttribute('data-url', data[i].url);
      photo.src = data[i].url;

      element.addEventListener('click', window.fullscreenMode.fullscreenPhotosOnClickHandler);
      element.addEventListener('keydown', window.fullscreenMode.fullscreenPhotosOnKeydownHandler);

      element.querySelector('.picture__comments').textContent = data[i].comments.length;
      element.querySelector('.picture__likes').textContent = data[i].likes;

      fragment.appendChild(element);
    }

    picturesContainer.appendChild(fragment);
    filterData();
  });

  var filterData = function () {
    var QUANTITY_RANDOM_PHOTOS = 10;

    var filters = document.querySelector('.img-filters');
    var filterButtons = document.querySelectorAll('.img-filters__form button');

    filters.classList.remove('img-filters--inactive');

    var resetPhotos = function () {
      var allPhoto = document.querySelectorAll('a.picture');

      for (var i = 0; i < allPhoto.length; i++) {
        allPhoto[i].remove();
      }
    };

    var changeClassFilterButtons = function (evt) {
      for (var i = 0; i < filterButtons.length; i++) {
        if (filterButtons[i] !== evt.target) {
          filterButtons[i].classList.remove('img-filters__button--active');
        }
      }

      evt.target.classList.toggle('img-filters__button--active');
    };

    var showRandomPhotos = window.debounce.debounceEffect(function () {

      var newData = window.data
        .slice()
        .sort(function () {
          return Math.random() - 0.5;
        })
        .slice(0, QUANTITY_RANDOM_PHOTOS);

      renderData(newData);

    });

    var showDiscussedPhotos = window.debounce.debounceEffect(function () {
      var newData = window.data
        .slice()
        .sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });

      renderData(newData);
    });

    var getFilterHandler = function (evt) {
      evt.preventDefault();

      resetPhotos();

      var buttonsId = evt.target.id;

      switch (buttonsId) {
        case 'filter-random':
          showRandomPhotos();
          break;
        case 'filter-discussed':
          showDiscussedPhotos();
          break;
        case 'filter-default':
          renderData(window.data);
          break;
      }

      changeClassFilterButtons(evt);
    };

    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', getFilterHandler);
    }

  };

  var loadSuccessHandler = function (photos) {
    window.data = photos;
    window.defaultData = photos;
    window.dataLength = window.data.length;

    renderData(photos);
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.classList.add('errorMessage');
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);

  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);


})();
