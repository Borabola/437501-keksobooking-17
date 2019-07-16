'use strict';
/**
 * @typedef {{offer:
 *   {type: string},
 * author:
 *   {avatar: string},
 * location: {
 *   x: number,
 *   y: number}
 * }
 * } ad
 */
/**
 * Модуль работы карты
 */
(function () {
  var isCallRenderAd = false;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var divPin = document.querySelector('.map__pins');
  var errorMessage = errorTemplate.cloneNode(true);
  window.ads = [];

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
   * @param {KeyboardEvent} evt
  */
  var onPopupEscPress = function (evt) {
    var ESC_KEYCODE = 27;
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
      window.removeErrorPopup();
    }
  };

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
   * }[]} data
   */
  window.successHandler = function (data) {
    var fragment = document.createDocumentFragment();
    window.ads = data;
    if (!isCallRenderAd) {
      var pinsNumber = data.length > 5 ? 5 : data.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = data[i];
        fragment.appendChild(renderAd(ad));
      }
      divPin.appendChild(fragment);
      isCallRenderAd = true;
    }
  };


  window.errorHandler = function () {
    window.addErrorPopup();
  };

  /**
   * Функция удаления старых пинов
   */
  window.clearPins = function () {
    var oldPins = divPin.querySelectorAll('.map__pin');
    for (var i = 1; i < oldPins.length; i++) {
      divPin.removeChild(oldPins[i]);
    }
  };

  /**
   * Функция отрисовки отфильтрованных пинов
   * @param {ad[]} filteredData
   */
  window.rerenderAds = function (filteredData) {
    window.clearPins();
    var fragment = document.createDocumentFragment();
    var filteredPinsNumber = filteredData.length > 5 ? 5 : filteredData.length;
    for (var i = 0; i < filteredPinsNumber; i++) {
      var ad = filteredData[i];
      fragment.appendChild(renderAd(ad));
      divPin.appendChild(fragment);
    }
  };
})();
