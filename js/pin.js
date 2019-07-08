'use strict';
(function () {
  window.map = document.querySelector('.map');
  var mapPinButton = window.map.querySelector('.map__pin--main');
  var PIN_HEIGHT = 70;

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
  window.getMainPinLocation = function () {
    var pinLocations = {};
    var pinX = Math.floor(mapPinButton.offsetLeft + mapPinButton.offsetWidth / 2);
    var pinY = Math.floor(mapPinButton.offsetTop + mapPinButton.offsetHeight);
    var pinYInitial = Math.floor(pinY - PIN_HEIGHT + mapPinButton.offsetWidth / 2);
    pinLocations.mainPinX = pinX;
    pinLocations.mainPinY = pinY;
    pinLocations.mainPinYInitial = pinYInitial;
    return pinLocations;
  };

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
      xMax: window.map.offsetWidth - mapPinButton.offsetWidth,
      yMax: 630
    };
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
    window.fillAddress(false);
  }

  function onMapPinButtonMousedown(evt) {
    var pinLocations = window.getMainPinLocation();
    evt.preventDefault();
    window.activatePage();
    /* window.renderAds(window.generateAds(ADS_COUNT)); */
    window.load(window.successHandler, window.errorHandler);

    var startCoords = {
      x: pinLocations.mainPinX,
      y: pinLocations.mainPinY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - window.map.offsetLeft,
        y: moveEvt.clientY - window.map.offsetTop
      };

      startCoords = {
        x: shift.x - mapPinButton.offsetWidth / 2,
        y: shift.y - mapPinButton.offsetHeight
      };

      var checkedPinCoordinates = checkPinCoordinatesLimit(startCoords.x, startCoords.y);

      mapPinButton.style.top = (checkedPinCoordinates.y) + 'px';
      mapPinButton.style.left = (checkedPinCoordinates.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.fillAddress(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };


    mapPinButton.removeEventListener('mouseup', onMapPinButtonMouseup);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.deactivatePage();
  mapPinButton.addEventListener('mousedown', onMapPinButtonMousedown);
})();
