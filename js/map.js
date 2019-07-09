'use strict';
/**
 * Модуль работы карты
 */
(function () {
  var isCall = false;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);

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

  window.removeErrorPopup = function () {
    main.removeChild(errorMessage);
  };

  /**
   * @param {Event} evt
   */
  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, window.removeErrorPopup);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  window.addErrorPopup = function () {
    main.appendChild(errorMessage);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', window.removeErrorPopup);
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
