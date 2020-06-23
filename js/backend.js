'use strict';

(function () {

  var status = {
    OK: 200,
  };

  var load = function (onLoad, onError) {

    var URL = 'https://javascript.pages.academy/kekstagram/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === status.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();

  };

  window.backend = {
    load: load,
  };

})();
