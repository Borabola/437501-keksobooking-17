'use strict';
var imagesInOrder = ['01', '02', '03', '04', '05', '06', '07', '08'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
var MIN_X_COORD = 0;
var MIN_Y_COORD = 130;
var MAX_Y_COORD = 630;
var ADS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var pinLocations = [];

var map = document.querySelector('.map');
var mapPinButton = map.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var divPin = document.querySelector('.map__pins');

var mapFilter = document.querySelector('.map__filters-container');
var mapFilterFielsetList = mapFilter.querySelectorAll('fieldset');
var adForm = document.querySelector('.ad-form');
var adFormFielsetList = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');



/**
 * Функция перемешивания массива
 *@param {*[]} arr
 *@return {number[]} перемешенный массив
 */
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

/**
 * Функция получения случайного числа из интервала
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайный число
 */
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

/**
 * Функция создает массив путей к картинкам
 * @param {number} count
 * @return {string[]}
 */
function getImages(count) {
  var shuffledImages = shuffle(imagesInOrder);
  var images = [];
  for (var i = 0; i < count; i++) {
    images.push('img/avatars/user' + shuffledImages[i] + '.png');
  }
  return images;
}

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
  var offer = types[getRandom(0, types.lenght)];
  var x = getRandom(MIN_X_COORD, MAP_WIDTH);
  var y = getRandom(MIN_Y_COORD, MAX_Y_COORD);
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
function generateAds(count) {
  var images = getImages(count);
  var ads = [];
  for (var i = 0; i < images.length; i++) {
    ads.push(generateAd(images[i]));
  }
  return ads;
}

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
  var pinLocation = getPinLocation(ad.location.x, ad.location.y);
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
function renderAds(ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    var ad = ads[i];
    fragment.appendChild(renderAd(ad));
  }
  divPin.appendChild(fragment);
}

/**
 * Функция определения начальных координат метки
 * @return {number[]} pinX, pinY
 */
function getMainPinLocation() {
  var pinX = Math.floor(mapPinButton.offsetLeft + mapPinButton.offsetWidth / 2);
  var pinY = Math.floor(mapPinButton.offsetTop + mapPinButton.offsetHeight);
  var pinYinitial = pinY - PIN_HEIGHT + mapPinButton.offsetWidth / 2;
  pinLocations[0] = pinX;
  pinLocations[1] = pinY;
  pinLocations[2] = pinYinitial;
  return pinLocations;
}

/**
 * Функция берет координаты pinX и pinY и записывает их в строку адреса
 * @param {boolean} isInitial после открытия страницы isInitial= true, после активации isInitial= false
 */
function fillAddress(isInitial) {
  getMainPinLocation();
  if (isInitial) {
    var addressLine = pinLocations[0] + ', ' + pinLocations[2];
  } else {
    addressLine = pinLocations[0] + ', ' + pinLocations[1];
  }
  adFormAddress.value = addressLine;
}

/**
 * Функция дабавляет/убирает атрибут disabled к элементу
 * @param {element[]} elementList
 * @param {boolean} value
 */
function disabledElement(elementList, value) {
  for (var i = 0; i < elementList.length; i++) {
    elementList[i].disabled = value;
  }
}

/* Активное состояние */
function activatePage() {
  disabledElement(adFormFielsetList, false);
  disabledElement(mapFilterFielsetList, false);
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  fillAddress(false);
}

/**
 * Функция обработчик события mouseup кнопки пина
 */
function onMapPinButtonMouseup() {
  activatePage();
  renderAds(generateAds(ADS_COUNT));
  mapPinButton.removeEventListener('mouseup', onMapPinButtonMouseup);
}

/* Исходное состояние*/
disabledElement(adFormFielsetList, true);
disabledElement(mapFilterFielsetList, true);
fillAddress(true);

mapPinButton.addEventListener('mouseup', onMapPinButtonMouseup);
