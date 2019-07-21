'use strict';
/**
 @typedef {{
  * author:
  *   {avatar: string},
  * offer: {
  *    title: string,
  *    address: string,
  *    price: number,
  *    type: string,
  *    rooms: number,
  *    guests: number,
  *    checkin: string,
  *    checkout: string,
  *    features: [],
  *    description: string,
  *    photos: []
  *   }
  * location: {
  *   x: number,
  *   y: number}
  * }
  * } AdData
 * @typedef {{
 * author:
 *   {avatar: string},
 * offer: {
 *    title: string,
 *    address: string,
 *    price: number,
 *    type: string,
 *    rooms: number,
 *    guests: number,
 *    checkin: string,
 *    checkout: string,
 *    features: [],
 *    description: string,
 *    photos: []
 *   }
 * location: {
 *   x: number,
 *   y: number},
 * id: number
 * }
 * } Ad
 * /

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
   * @param {Ad} ad - объект обявления
   * @return {Node} Element DOM элемент, представляющий пин объявление
   */
  function renderAd(ad) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinLocation = window.getPinLocation(ad.location.x, ad.location.y);
    var adElement = pinTemplate.cloneNode(true);
    adElement.setAttribute('style', pinLocation);
    adElement.children[0].setAttribute('src', ad.author.avatar);
    adElement.children[0].classList.add(ad.id);
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
   * Функция принимает массив объектов AdData, добавляет в него строку index: номер по порядку
   * @param  {AdData[]} serverAds
   * @return {*}
   */
  function mapServerAdsToAds(serverAds) {
    return serverAds.map(function (ad, index) {
      return Object.assign({id: index}, ad);
    });
  }

  /**
   * Функция  Функция берет массив объектов oбъявлений, добавляет фрагмент описания героя из массива объектов
   * @param {AdData[]} serverAds
   */
  window.onLoadSuccess = function (serverAds) {
    var fragment = document.createDocumentFragment();
    window.ads = mapServerAdsToAds(serverAds);
    if (!isCallRenderAd) {
      var pinsNumber = serverAds.length > 5 ? 5 : serverAds.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = window.ads[i];
        fragment.appendChild(renderAd(ad));
      }

      divPin.appendChild(fragment);
      isCallRenderAd = true;

      divPin.onclick = function (evt) {
        var target = evt.target;
        if (evt.target.parentElement.className === 'map__pin map__pin--main' || evt.target.className === 'map__pin map__pin--main' || target.className === 'map__pin' || target.className === 'map__overlay') {
          return;
        } else {
          var oldActivePin = divPin.querySelector('.map__pin--active');
          if (oldActivePin) {
            divPin.querySelector('.map__pin--active').classList.remove('map__pin--active');
          }
          evt.target.parentElement.classList.add('map__pin--active');
          window.renderCard(window.ads[target.className]);
        }
      };
    }
  };


  window.onLoadError = function () {
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
   * @param {Ad[]} filteredData
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
