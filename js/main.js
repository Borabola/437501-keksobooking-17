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

var map = document.querySelector('.map');
var mapPinButton = map.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters-container');
var mapFilterFieldsetList = mapFilter.querySelectorAll('fieldset');
var adForm = document.querySelector('.ad-form');
var adFormFieldsetList = adForm.querySelectorAll('fieldset');

var typeOfHousing = adForm.querySelector('#type');

var checkInTime = document.querySelector('#timein');
var checkOutTime = document.querySelector('#timeout');
var isCall = false;

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
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
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
  var divPin = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  if (!isCall) {for (var i = 0; i < ads.length; i++) {
    var ad = ads[i];
    fragment.appendChild(renderAd(ad));
  }
  divPin.appendChild(fragment);
  isCall = true;
  }
}

/**
 * Функция определения начальных координат метки
 * @return{
 * {
 *   mainPinX: number,
 *   mainPinY: number,
 *   mainPinYInitial: number
 * }
 * }
 */
function getMainPinLocation() {
  var pinLocations = {};
  var pinX = Math.floor(mapPinButton.offsetLeft + mapPinButton.offsetWidth / 2);
  var pinY = Math.floor(mapPinButton.offsetTop + mapPinButton.offsetHeight);
  var pinYInitial = Math.floor(pinY - PIN_HEIGHT + mapPinButton.offsetWidth / 2);
  pinLocations.mainPinX = pinX;
  pinLocations.mainPinY = pinY;
  pinLocations.mainPinYInitial = pinYInitial;
  return pinLocations;
}

/**
 * Функция берет координаты mainPinX и mainPinY указателя пина и записывает их в строку адреса. В неактивном режиме круглый пин с координатами mainPinX, mainPinYInitial
 * @param {boolean} isInitial после открытия страницы isInitial= true, после активации isInitial= false
 */
function fillAddress(isInitial) {
  var adFormAddress = adForm.querySelector('#address');
  var pinLocations = getMainPinLocation();

  console.log(pinLocations);
  if (isInitial) {
    var addressLine = pinLocations.mainPinX + ', ' + pinLocations.mainPinYInitial;
  } else {
    addressLine = pinLocations.mainPinX + ', ' + pinLocations.mainPinY;
  }
  adFormAddress.value = addressLine;
}

/**
 * Функция дабавляет атрибут disabled к элементам
 * @param {element[]} elementList
 */
function deactivateElements(elementList) {
  for (var i = 0; i < elementList.length; i++) {
    elementList[i].disabled = true;
  }
}

/**
 * Функция убирает атрибут disabled к элементам
 * @param {element[]} elementList
 */
function activateElements(elementList) {
  for (var i = 0; i < elementList.length; i++) {
    elementList[i].disabled = false;
  }
}

/* Функция переводит страницу в активное состояние */
function activatePage() {
  activateElements(adFormFieldsetList);
  activateElements(mapFilterFieldsetList);
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  /* fillAddress(false); */
}
/* Функция переводит страницу в неактивное состояние*/
function deactivatePage() {
  deactivateElements(adFormFieldsetList);
  deactivateElements(mapFilterFieldsetList);
  fillAddress(true);
}


function onTypeInputChange() {
  var minPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var inputPrice = adForm.querySelector('#price');
  inputPrice.min = inputPrice.placeholder = minPrice[typeOfHousing.value];
}

function onTimeInputChange() {
  checkOutTime.value = checkInTime.value;
}

function onTimeOutInputChange() {
  checkInTime.value = checkOutTime.value;
}

/**
 * Функция проверяет, чтобы координаты пина не выходили за границы поля map
 * @param {number} pinX
 * @param {number} pinY
 * @return {{x: number, y: number}}
 */
function checkPinCoordinatesLimit(pinX, pinY) {
  var PIN_MAP_LIMITS = {
    xMin: 0,
    yMin: 130,
    xMax: map.offsetWidth - mapPinButton.offsetWidth,
    yMax: 630
  }
  var pinCoordinates = {
    x: pinX,
    y: pinY
  };
  if (pinX < PIN_MAP_LIMITS.xMin) {
    pinX = PIN_MAP_LIMITS.xMin;
  }
  if (pinX > PIN_MAP_LIMITS.xMax) {
    pinX = PIN_MAP_LIMITS.xMax;
  }
  if (pinY < PIN_MAP_LIMITS.yMin) {
    pinY = PIN_MAP_LIMITS.yMin;
  }
  if (pinY > PIN_MAP_LIMITS.yMax) {
    pinY = PIN_MAP_LIMITS.yMax;
  }
  pinCoordinates = {
    x: pinX,
    y: pinY
  };
  return (pinCoordinates);
}
function onMapPinButtonMouseup() {
  fillAddress(false);
}

function onMapPinButtonMousedown(evt) {
  var pinLocations = getMainPinLocation();
  evt.preventDefault();
  activatePage();
  renderAds(generateAds(ADS_COUNT));

  var startCoords = {
    x: pinLocations.mainPinX,
    y: pinLocations.mainPinY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: moveEvt.clientX - map.offsetLeft,
      y: moveEvt.clientY - map.offsetTop
    };

    startCoords = {
      x: shift.x - mapPinButton.offsetWidth / 2,
      y: shift.y + mapPinButton.offsetHeight
    };

    var checkedPinCoordinates = checkPinCoordinatesLimit(startCoords.x, startCoords.y);

    mapPinButton.style.top = (checkedPinCoordinates.y) + 'px';
    mapPinButton.style.left = (checkedPinCoordinates.x) + 'px';

  }

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    fillAddress(false);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

  };


  mapPinButton.removeEventListener('mouseup', onMapPinButtonMouseup);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

deactivatePage();
mapPinButton.addEventListener('mousedown', onMapPinButtonMousedown);
typeOfHousing.addEventListener('change', onTypeInputChange);
checkInTime.addEventListener('change', onTimeInputChange);
checkOutTime.addEventListener('change', onTimeOutInputChange);

