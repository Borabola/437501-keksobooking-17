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
  window.isCallRenderAd = false;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.main = document.querySelector('main');
  var divPin = document.querySelector('.map__pins');


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
   * Функция отрисовывает указанное количество пинов
   * @param {Ad[]} ads
   */
  window.renderPins = function (ads) {
    var fragment = document.createDocumentFragment();
    if (window.isCallRenderAd === false) {
      var pinsNumber = ads.length > 5 ? 5 : ads.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = ads[i];
        fragment.appendChild(renderAd(ad));
      }
      divPin.appendChild(fragment);
      window.isCallRenderAd = true;
    }
  };

  /**
   * Функция  Функция берет массив объектов oбъявлений, добавляет фрагмент описания героя из массива объектов
   * @param {AdData[]} serverAds
   */
  window.onLoadSuccess = function (serverAds) {
    window.isCallLoad = true;
    window.ads = mapServerAdsToAds(serverAds);
    window.renderPins(window.ads);

    divPin.onclick = function (evt) {
      var target = evt.target;
      if (evt.target.parentElement.className === 'map__pin map__pin--main' || evt.target.className === 'map__pin map__pin--main' || target.className === 'map__pin' || target.className === 'map__overlay' || target.className === 'map__pins') {
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

  window.onSendSuccess = function () {
    window.resetForm();
    window.clearPins();
    window.closeCard();
    window.returnMainPin();
    window.deactivatePage();
    window.resetFilters();
    window.renderSuccessMessage();
    window.isCallRenderAd = false;
  };

  window.onSendError = function () {
    window.addErrorPopup();
  };
})();
