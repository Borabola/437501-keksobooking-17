'use strict';
(function () {

  function onMapPinButtonMouseup() {
    window.form.fillAddress(false);
  }

  /**
   * @param {Event} evt
   */
  function onMapPinButtonMousedown(evt) {
    var pinLocations = window.pin.getMainPinLocation();
    evt.preventDefault();

    var startCoords = {
      x: pinLocations.mainPinX,
      y: pinLocations.mainPinY + window.mapPinButton.offsetHeight - window.mapPinButton.offsetWidth / 2,
    };

    /**
     * Функция отслеживает перемещения курсора и передает их в стили пина
     * @param {Event} moveEvt
     */
    function onMouseMove(moveEvt) {
      var scrollTop = window.pageYOffset;
      var scrollLeft = window.pageXOffset;
      moveEvt.preventDefault();
      window.form.activatePage();
      if (!window.isLoadCalled) {
        window.loading.loadAd(window.map.onLoadSuccess, window.map.onLoadError);
      }

      var shift = {
        x: moveEvt.clientX - window.cityMap.offsetLeft,
        y: moveEvt.clientY - window.cityMap.offsetTop,
      };

      startCoords = {
        x: shift.x - window.mapPinButton.offsetWidth / 2 + scrollLeft,
        y: shift.y - window.mapPinButton.offsetHeight + window.mapPinButton.offsetWidth / 2 + scrollTop,
      };

      var checkedPinCoordinates = window.pin.checkPinCoordinatesLimit(startCoords.x, startCoords.y);

      window.mapPinButton.style.top = (checkedPinCoordinates.y) + 'px';
      window.mapPinButton.style.left = (checkedPinCoordinates.x) + 'px';

      if (window.isLoadCalled && !window.isRenderPinsCalled) {
        window.map.renderPins(window.ads);
        window.pinsContainer.onclick = window.map.onPinClick;
      }
    }

    /**
     * Функция заполняет поля адреса и удаляет обработчики
     * @param {Event} upEvt
     */
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.form.fillAddress(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    window.mapPinButton.removeEventListener('mouseup', onMapPinButtonMouseup);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.form.deactivatePage();
  window.mapPinButton.addEventListener('mousedown', onMapPinButtonMousedown);
})();
