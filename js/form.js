'use strict';
/**
 * Модуль работы с формой
 */
(function () {
  var mapFilter = document.querySelector('.map__filters-container');
  var mapFilterFieldsetList = mapFilter.querySelectorAll('fieldset');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');

  var typeOfHousing = adForm.querySelector('#type');

  var checkInTime = document.querySelector('#timein');
  var checkOutTime = document.querySelector('#timeout');

  /**
   * Функция берет координаты mainPinX и mainPinY указателя пина и записывает их в строку адреса. В неактивном режиме круглый пин с координатами mainPinX, mainPinYInitial
   * @param {boolean} isInitial после открытия страницы isInitial= true, после активации isInitial= false
   */
  window.fillAddress = function (isInitial) {
    var adFormAddress = adForm.querySelector('#address');
    var pinLocations = window.getMainPinLocation();
    if (isInitial) {
      var addressLine = pinLocations.mainPinX + ', ' + pinLocations.mainPinYInitial;
    } else {
      addressLine = pinLocations.mainPinX + ', ' + Math.floor(pinLocations.mainPinY - window.mapPinButton.offsetWidth);
    }
    adFormAddress.value = addressLine;
  };

  /**
   * Функция дабавляет атрибут disabled к элементам
   * @param {HTMLElement[]} elementList
   */
  function deactivateElements(elementList) {
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].disabled = true;
    }
  }

  /**
   * Функция убирает атрибут disabled к элементам
   * @param {HTMLElement[]} elementList
   */
  function activateElements(elementList) {
    for (var i = 0; i < elementList.length; i++) {
      elementList[i].disabled = false;
    }
  }

  window.activatePage = function () {
    activateElements(adFormFieldsetList);
    activateElements(mapFilterFieldsetList);
    adForm.classList.remove('ad-form--disabled');
    window.cityMap.classList.remove('map--faded');
  };

  window.deactivatePage = function () {
    deactivateElements(adFormFieldsetList);
    deactivateElements(mapFilterFieldsetList);
    window.fillAddress(true);
  };

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

  typeOfHousing.addEventListener('change', onTypeInputChange);
  checkInTime.addEventListener('change', onTimeInputChange);
  checkOutTime.addEventListener('change', onTimeOutInputChange);
})();
