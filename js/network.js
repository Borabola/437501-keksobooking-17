'use strict';
(function () {
  var LOADING_TIMEOUT = 8000;
  var SAVING_TIMEOUT = 15000;
  var SUCCESS_CODE = 200;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';

  /**
   * @param {function} onSuccess
   * @param {function} onError
   */
  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);

      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = LOADING_TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  }

  /**
   * @param {data} formData
   * @param {function} onSuccess
   * @param {function} onError
   */
  function send(formData, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);

      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SAVING_TIMEOUT;

    xhr.open('POST', URL_SEND);
    xhr.send(formData);
  }

  window.network = {
    loadAd: load,
    sendAd: send
  };
})();
