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
  var PIN_QUANTITY = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.isRenderPinsCalled = false;
  window.main = document.querySelector('main');
  window.pinsContainer = document.querySelector('.map__pins');

  /**
   * Функция создает запись положения пина с учетом его размеров
   * @param {number} x
   * @param {number} y
   * @return {string}
   */
  function getPinLocation(x, y) {
    return 'left:' + (x - PIN_WIDTH / 2) + 'px; top:' + (y - PIN_HEIGHT) + 'px;';
  }

  /**
   * функция берет объект объявления и создает разметку объявления
   * @param {Ad} ad - объект обявления
   * @return {Node} Element DOM элемент, представляющий пин объявление
   */
  function renderAd(ad) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinLocation = getPinLocation(ad.location.x, ad.location.y);
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
  function renderPins(ads) {
    var fragment = document.createDocumentFragment();
    if (!window.isRenderPinsCalled) {
      var pinsNumber = ads.length > PIN_QUANTITY ? PIN_QUANTITY : ads.length;
      for (var i = 0; i < pinsNumber; i++) {
        var ad = ads[i];
        fragment.appendChild(renderAd(ad));
      }
      window.pinsContainer.appendChild(fragment);
      window.isRenderPinsCalled = true;
    }
  }

  /**
   * Функция слушает клик на пине, добавляет ему класс .map__pin--active и отрисовывает карточку объявления
   * @param {Event} evt
   */
  function onPinClick(evt) {
    var target = evt.target;
    if (target.parentElement.className === 'map__pin map__pin--main' || target.className === 'map__pin map__pin--main' || target.className === 'map__overlay' || target.className === 'map__pins' || target.className === 'map__pin map__pin--active') {
      return;
    }
    if (target.className === 'map__pin') {
      target = target.querySelector('img');
    }
    var oldActivePin = window.pinsContainer.querySelector('.map__pin--active');
    if (oldActivePin) {
      window.pinsContainer.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
    target.parentElement.classList.add('map__pin--active');
    window.card.render(window.ads[target.className]);
  }

  /**
   * Функция  Функция берет массив объектов oбъявлений, добавляет фрагмент описания героя из массива объектов
   * @param {AdData[]} serverAds
   */
  function onLoadSuccess(serverAds) {
    window.ads = mapServerAdsToAds(serverAds);
    renderPins(window.ads);
    window.isLoadCalled = true;
    window.pinsContainer.onclick = onPinClick;
  }


  function onLoadError() {
    clearPins();
    window.popup.addError();
  }

  /**
   * Функция удаления старых пинов
   */
  function clearPins() {
    var oldPins = window.pinsContainer.querySelectorAll('.map__pin');
    for (var i = 1; i < oldPins.length; i++) {
      window.pinsContainer.removeChild(oldPins[i]);
    }
    window.isRenderPinsCalled = false;
  }

  /**
   * Функция отрисовки отфильтрованных пинов
   * @param {Ad[]} filteredData
   */
  function rerenderAds(filteredData) {
    clearPins();
    var fragment = document.createDocumentFragment();
    var filteredPinsNumber = filteredData.length > PIN_QUANTITY ? PIN_QUANTITY : filteredData.length;
    for (var i = 0; i < filteredPinsNumber; i++) {
      var ad = filteredData[i];
      fragment.appendChild(renderAd(ad));
      window.pinsContainer.appendChild(fragment);
      window.isRenderPinsCalled = true;
    }
  }

  function onSendSuccess() {
    window.form.resetForm();
    clearPins();
    window.card.close();
    window.pin.returnMainPin();
    window.form.deactivatePage();
    window.resetFilters();
    window.photo.resetAvatar();
    window.photo.resetPhoto();
    window.popup.renderSuccessMessage();
    window.isRenderPinsCalled = false;
  }

  function onSendError() {
    window.popup.addError();
  }

  window.map = {
    renderPins: renderPins,
    clearPins: clearPins,
    onPinClick: onPinClick,
    onLoadSuccess: onLoadSuccess,
    onLoadError: onLoadError,
    onSendSuccess: onSendSuccess,
    onSendError: onSendError,
    rerenderAds: rerenderAds
  };
})();
