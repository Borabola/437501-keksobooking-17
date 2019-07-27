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
  window.isCallRenderPin = false;
  var pinQuantity = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.main = document.querySelector('main');
  window.pinsContainer = document.querySelector('.map__pins');

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
    window.ads2 = ads;
    if (!window.isCallRenderPin) {
      var pinsNumber = window.ads2.length > pinQuantity ? pinQuantity : window.ads2.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = window.ads2[i];
        fragment.appendChild(renderAd(ad));
      }
      window.pinsContainer.appendChild(fragment);
      window.isCallRenderPin = true;
    }
  };

  /**
   * Функция слушает клик на пине, добавляет ему класс .map__pin--active и отрисовывает карточку объявления
   * @param {Event} evt
   */
  window.onPinClick = function (evt) {
    var target = evt.target;
    if (target.parentElement.className === 'map__pin map__pin--main' || target.className === 'map__pin map__pin--main' || target.className === 'map__overlay' || target.className === 'map__pins' || target.className === 'map__pin map__pin--active') {
      return;
    } else {
      if (target.className === 'map__pin') {
        target = target.querySelector('img');
      }
      var oldActivePin = window.pinsContainer.querySelector('.map__pin--active');
      if (oldActivePin) {
        window.pinsContainer.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      target.parentElement.classList.add('map__pin--active');
      window.renderCard(window.ads[target.className]);
    }
  };

  /**
   * Функция  Функция берет массив объектов oбъявлений, добавляет фрагмент описания героя из массива объектов
   * @param {AdData[]} serverAds
   */
  window.onLoadSuccess = function (serverAds) {
    window.ads = mapServerAdsToAds(serverAds);
    window.renderPins(window.ads);
    window.isCallLoad = true;
    window.pinsContainer.onclick = window.onPinClick;

  };


  window.onLoadError = function () {
    window.addErrorPopup();
  };

  /**
   * Функция удаления старых пинов
   */
  window.clearPins = function () {
    var oldPins = window.pinsContainer.querySelectorAll('.map__pin');
    for (var i = 1; i < oldPins.length; i++) {
      window.pinsContainer.removeChild(oldPins[i]);
    }
    window.isCallRenderPin = false;
  };

  /**
   * Функция отрисовки отфильтрованных пинов
   * @param {Ad[]} filteredData
   */
  window.rerenderAds = function (filteredData) {
    window.clearPins();
    var fragment = document.createDocumentFragment();
    var filteredPinsNumber = filteredData.length > pinQuantity ? pinQuantity : filteredData.length;
    for (var i = 0; i < filteredPinsNumber; i++) {
      var ad = filteredData[i];
      fragment.appendChild(renderAd(ad));
      window.pinsContainer.appendChild(fragment);
      window.isCallRenderPin = true;
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
    window.isCallRenderPin = false;
  };

  window.onSendError = function () {
    window.addErrorPopup();
  };
})();
