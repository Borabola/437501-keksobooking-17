'use strict';
var type = ['palace', 'flat', 'house', 'bungalo'];
var MAP_WIDTH = 1200;
var MIN_X_COORD = 0;
var MIN_Y_COORD = 130;
var MAX_Y_COORD = 630;
var ADS_COUNT = 8;
var FIRST_AD = 1;

// eslint-disable-next-line valid-jsdoc
/**
 * Функция создания массива последовательных чисел
 *@param {numder} min начало массива
 *@param {numder} max конец массива
 *@return {[]Arrs]}
 */
function getArr(min, max) {
  var arrs = [];

  for (var i = (min - 1); i < max; i++) {
    arrs[i] = i + 1;
  }
  return arrs;
}

/**
 * Функция перемешивания массива
 *@param {[]} arr
 *@return {[Arr]} перемешенный массив
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
 * Функция случайного выбора типа жилья
 * @param {Type} массив возможных типов жилья
 * @return {number} случайный элеммент массива
 */
function getTypeOfAccommodation() {
  var randIndex = Math.floor(Math.random() * type.length);
  return (type[randIndex]);
}

/**
 * Функция получения случайного числа из интервала
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайный число
 */
function getRandom(min, max) {
  var rand = min + Math.floor(Math.random() * (max + 1 - min));
  return rand;
}

/**
 * Функция получения имени фото
 * @param {number} index порядковый номер фото автора
 * @return {string} author название фото
 */
function getImage(index) {
  var shuffledArr = shuffle(getArr(FIRST_AD, ADS_COUNT));
  var author = 'img/avatars/user0' + shuffledArr[index] + '.png';
  return author;
}

/**
 * Функция создания объекта объявления
 * @param {[]} arr массив для номеров фото
 * @return {Ad} Объект Объявление
 */
function generateAdv(arr) {
  for (var i = 0; i < arr.length; i++) {
    var author = getImage(i);
  }
  var offer = getTypeOfAccommodation(type);
  var x = getRandom(MIN_X_COORD, MAP_WIDTH);
  var y = getRandom(MIN_Y_COORD, MAX_Y_COORD);
  var ad = {
    author: author,
    offer: offer,
    location: x + ', ' + y
  };
  return ad;
}


/**
 * @param {number} count количество объявлений, которое надо сгенерировать
 * @return {Ads[]}
 */
function generateAds(count) {
  var ads = [];
  var shuffledArr = shuffle(getArr(FIRST_AD, ADS_COUNT));
  for (var i = 0; i < count; i++) {
    ads.push(generateAdv(shuffledArr));
  }
  return ads;
}

generateAds(ADS_COUNT);
/* console.log(generateAds(ADS_COUNT));*/
