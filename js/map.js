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
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.main = document.querySelector('main');
  var divPin = document.querySelector('.map__pins');
  // var anyPin = divPin.querySelector('button[type = button]');


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
  /* window.renderPins = function (ads) {
    var fragment = document.createDocumentFragment();
    window.ads2 = ads;
    //
    // if (window.isCallRenderAd === false) {
    if (!anyPin) {
      console.log ('ни один пин не отрисован');
      var pinsNumber = window.ads2.length > 5 ? 5 : window.ads2.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = window.ads2[i];
        fragment.appendChild(renderAd(ad));
      }
      divPin.appendChild(fragment);
      window.isCallRenderPin = true;
      console.log('повторная отрисовка пинов');
    }
  };

  /**
   * Функция  Функция берет массив объектов oбъявлений, добавляет фрагмент описания героя из массива объектов
   * @param {AdData[]} serverAds
   */
  /* window.onLoadSuccess = function (serverAds) {
    // window.ads = mapServerAdsToAds(serverAds);
    // window.renderPins(window.ads);

    var fragment = document.createDocumentFragment();
    window.ads = mapServerAdsToAds(serverAds);
    if (!window.isCallRenderPin) {
      console.log(anyPin);
      var pinsNumber = serverAds.length > 5 ? 5 : serverAds.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = window.ads[i];
        fragment.appendChild(renderAd(ad));
      }
      divPin.appendChild(fragment);
      console.log(' пины отрисованы 1 раз');
      window.isCallRenderPin = true;
      window.isCallLoad = true;
    }


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
  }; */

  window.onLoadSuccess = function (serverAds) {
    var fragment = document.createDocumentFragment();
    window.ads = mapServerAdsToAds(serverAds);
    if (!window.isCallRenderPin) {
      var pinsNumber = serverAds.length > 5 ? 5 : serverAds.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = window.ads[i];
        fragment.appendChild(renderAd(ad));
      }

      divPin.appendChild(fragment);
      window.isCallRenderPin = true;
      window.isCallLoad = true;

      divPin.onclick = function (evt) {
        var target = evt.target;
        console.log(evt.target);
        if (evt.target.parentElement.className === 'map__pin map__pin--main' || evt.target.className === 'map__pin map__pin--main' || target.className === 'map__overlay' || target.className === 'map__pins') {
          return;
        } else {
          if (target.className === 'map__pin') {
            console.log('клик по хвосту');
            target = target.querySelector('img');
            console.log(target);
          }
          var oldActivePin = divPin.querySelector('.map__pin--active');
          if (oldActivePin) {
            debugger;
            divPin.querySelector('.map__pin--active').classList.remove('map__pin--active');
          }
          target.parentElement.classList.add('map__pin--active');
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
    window.isCallRenderPin = false;
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
      console.log('отрисованы отфильтрованные пины');

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
    console.log('пины удалены');
  };

  window.onSendError = function () {
    window.addErrorPopup();
  };
})();
