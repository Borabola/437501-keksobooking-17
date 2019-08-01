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
  var room = adForm.querySelector('#room_number');
  var guest = adForm.querySelector('#capacity');
  var inputPrice = adForm.querySelector('#price');
  var resetButton = adForm.querySelector('button[type=reset]');
  var MinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

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
   * @param {HTMLElement[]} elementLists
   */
  function deactivateElements(elementLists) {
    for (var i = 0; i < elementLists.length; i++) {
      elementLists[i].disabled = true;
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
    window.cityMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.fillAddress(true);
  };

  function onTypeOfHousingChange() {
    inputPrice.min = inputPrice.placeholder = MinPrice[typeOfHousing.value];
  }

  function onCheckInTimeChange() {
    checkOutTime.value = checkInTime.value;
  }

  function onCheckOutTimeChange() {
    checkInTime.value = checkOutTime.value;
  }

  function checkRoomToGuest() {
    var roomToGuestMessage = '';
    if (room.value !== '100') {
      if (guest.value > room.value) {
        roomToGuestMessage = 'Укажите количество гостей не больше ' + room.value;
      } else {
        if (guest.value === '0') {
          roomToGuestMessage = '"не для гостей" для апартаментов  со 100 комнатами';
        }
      }
    } else {
      if (guest.value !== '0') {
        roomToGuestMessage = 'Выберите "не для гостей"';
      }
    }

    guest.setCustomValidity(roomToGuestMessage);
  }

  window.resetForm = function () {
    adForm.querySelector('#title').value = '';
    inputPrice.value = '';
    room.value = '1';
    guest.value = '1';
    typeOfHousing.value = 'flat';
    inputPrice.min = inputPrice.placeholder = MinPrice[typeOfHousing.value];
    adForm.querySelector('#description').value = '';

    var featureCheckboxes = adForm.querySelectorAll('.feature__checkbox');
    for (var i = 0; i < featureCheckboxes.length; i++) {
      featureCheckboxes[i].checked = false;
    }

    checkInTime.value = '12:00';
    checkOutTime.value = '12:00';
  };

  checkRoomToGuest();

  room.addEventListener('change', checkRoomToGuest);
  guest.addEventListener('change', checkRoomToGuest);

  typeOfHousing.addEventListener('change', onTypeOfHousingChange);
  checkInTime.addEventListener('change', onCheckInTimeChange);
  checkOutTime.addEventListener('change', onCheckOutTimeChange);
  adForm.addEventListener('submit', function (evtSubmit) {
    evtSubmit.preventDefault();
    var formData = new FormData(adForm);
    window.send(formData, window.onSendSuccess, window.onSendError);
  }
  );
  resetButton.addEventListener('click', window.onSendSuccess);
})();
