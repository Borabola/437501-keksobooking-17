'use strict';
/**
 * Модуль, описывающий поведение главного пина и события на нем
 */
(function () {
  var MAIN_PIN_HEIGHT = 70;
  var mainPinStart = {
    x: 570,
    y: 375,
  };
  window.cityMap = document.querySelector('.map');
  window.mapPinButton = window.cityMap.querySelector('.map__pin--main');
  window.isLoadCalled = false;
  window.pinLocations = {};

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
    var pinX = Math.floor(window.mapPinButton.offsetLeft + window.mapPinButton.offsetWidth / 2);
    var pinY = Math.floor(window.mapPinButton.offsetTop + window.mapPinButton.offsetHeight);
    var pinYInitial = Math.floor(pinY - MAIN_PIN_HEIGHT + window.mapPinButton.offsetWidth / 2);
    window.pinLocations.mainPinX = pinX;
    window.pinLocations.mainPinY = pinY;
    window.pinLocations.mainPinYInitial = pinYInitial;
    return window.pinLocations;
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
      xMax: window.cityMap.offsetWidth - window.mapPinButton.offsetWidth,
      yMax: 630,
    };
    var pinCoordinates = {
      x: pinX,
      y: pinY,
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
      y: pinY,
    };
    return (pinCoordinates);
  }

  function returnMainPin() {
    window.mapPinButton.style.top = mainPinStart.y + 'px';
    window.mapPinButton.style.left = mainPinStart.x + 'px';
  }

  window.pin = {
    getMainPinLocation: getMainPinLocation,
    returnMainPin: returnMainPin,
    checkPinCoordinatesLimit: checkPinCoordinatesLimit
  };
})();
