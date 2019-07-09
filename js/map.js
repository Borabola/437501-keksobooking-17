'use strict';
(function () {
  var isCall = false;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  /**
   * Функция создает запись положения пина с учетом его размеров
   * @param {number} x
   * @param {number} y
   * @return {string}
   */
  window.getPinLocation = function (x, y) {
    return 'left:' + (x - PIN_WIDTH / 2) + 'px; top:' + (y - PIN_HEIGHT) + 'px;';
  };

  /**
   * функция берет объект объявления и создает разметку объявления
   * @param {
   * {offer:
   *   {type: string},
   * author:
   *   {avatar: string},
   * location: {
   *   x: number,
   *   y: number}
   * }} ad - объект обявления
   * @return {Node} Element DOM элемент, представляющий героя
   */
  function renderAd(ad) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinLocation = window.getPinLocation(ad.location.x, ad.location.y);
    var adElement = pinTemplate.cloneNode(true);
    adElement.setAttribute('style', pinLocation);
    adElement.children[0].setAttribute('src', ad.author.avatar);
    adElement.setAttribute('alt', ad.offer.type);
    return adElement;
  }

  /**
   * Функция добавляет сообщение об ошибке {Node} в html
   */
  window.addErrorPopup = function () {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
  };

  /**
   * Функция  Функция берет массив объектов oбъявлений, добавляет фрагмент описания героя из массива объектов
   * @param {
   * {author:
   *   {avatar: string},
   *  offer:
   *   {type: string},
   *  location: {
   *   x: number,
   *   y: number}
   * }[]} ads
   */
  window.successHandler = function (ads) {
    var divPin = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    if (!isCall) {
      for (var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        fragment.appendChild(renderAd(ad));
      }
      divPin.appendChild(fragment);
      isCall = true;
    }
  };

  window.errorHandler = function () {
    window.addErrorPopup();
  };
})();
