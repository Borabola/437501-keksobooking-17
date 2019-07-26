'use strict';
/**
 * Модуль, описывающий поведение главного пина и события на нем
 */
(function () {
  window.cityMap = document.querySelector('.map');
  window.mapPinButton = window.cityMap.querySelector('.map__pin--main');
  var PIN_HEIGHT = 70;
  window.isCallLoad = false;
  var mainPinStart = {
    x: 570,
    y: 375,
  };

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
    var pinX = Math.floor(window.mapPinButton.offsetLeft + window.mapPinButton.offsetWidth / 2);
    var pinY = Math.floor(window.mapPinButton.offsetTop + window.mapPinButton.offsetHeight);
    var pinYInitial = Math.floor(pinY - PIN_HEIGHT + window.mapPinButton.offsetWidth / 2);
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

  window.returnMainPin = function () {
    window.mapPinButton.style.top = mainPinStart.y + 'px';
    window.mapPinButton.style.left = mainPinStart.x + 'px';
  };

  function onMapPinButtonMouseup() {
    window.fillAddress(false);
  }

  /**
   * @param {Event} evt
   */
  function onMapPinButtonMousedown(evt) {
    var pinLocations = window.getMainPinLocation();
    evt.preventDefault();

    var startCoords = {
      x: pinLocations.mainPinX,
      y: pinLocations.mainPinY + window.mapPinButton.offsetHeight - window.mapPinButton.offsetWidth / 2,
    };

    /**
     * Функция отслеживает перемещения курсора и передает их в стили пина
     * @param {Event} moveEvt
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.activatePage();
      if (!window.isCallLoad) {
        window.load(window.onLoadSuccess, window.onLoadError);
      }

      var shift = {
        x: moveEvt.clientX - window.cityMap.offsetLeft,
        y: moveEvt.clientY - window.cityMap.offsetTop,
      };

      startCoords = {
        x: shift.x - window.mapPinButton.offsetWidth / 2,
        y: shift.y - window.mapPinButton.offsetHeight + window.mapPinButton.offsetWidth / 2,
      };

      var checkedPinCoordinates = checkPinCoordinatesLimit(startCoords.x, startCoords.y);

      window.mapPinButton.style.top = (checkedPinCoordinates.y) + 'px';
      window.mapPinButton.style.left = (checkedPinCoordinates.x) + 'px';

      if (window.isCallLoad && !window.isCallRenderPin) {
        window.renderPins(window.ads);
        window.pinsContainer.onclick = window.onPinClick;
      }
    };

    /**
     * Функция заполняет поля адреса и удаляет обработчики
     * @param {Event} upEvt
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.fillAddress(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    window.mapPinButton.removeEventListener('mouseup', onMapPinButtonMouseup);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.deactivatePage();
  window.mapPinButton.addEventListener('mousedown', onMapPinButtonMousedown);
})();
