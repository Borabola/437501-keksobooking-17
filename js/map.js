'use strict';
(function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_X_COORD = 0;
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var isCall = false;

  /**
   * Функция создания объекта объявления
   * @param {string} imageUrl
   * @return {
   * {
   * author:
   *   {avatar: string},
   * offer:
   *   {type: string},
   * location: {
   *   x: number,
   *   y: number}
   * }}
   */
  function generateAd(imageUrl) {
    var offer = types[window.getRandom(0, types.lenght)];
    var x = window.getRandom(MIN_X_COORD, MAP_WIDTH);
    var y = window.getRandom(MIN_Y_COORD, MAX_Y_COORD);
    var ad = {
      author: {
        'avatar': imageUrl
      },
      offer: {
        type: offer
      },
      location: {
        x: x,
        y: y
      }
    };
    return ad;
  }

  /**
   *  Функция создания массива из указанного количества объектов
   * @param {number} count
   * @return {
   * {
   * author:
   *   {avatar: string},
   * offer:
   *   {type: string},
   * location: {
   *   x: number,
   *   y: number}
   * }[]}
   */
  window.generateAds = function (count) {
    var images = window.getImages(count);
    var ads = [];
    for (var i = 0; i < images.length; i++) {
      ads.push(generateAd(images[i]));
    }
    return ads;
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
  window.renderAds = function (ads) {
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
})();
