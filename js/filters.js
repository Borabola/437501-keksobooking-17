'use strict';
(function () {
  var HousingPriceMap = {
    'low': {
      min: 0,
      max: 1000
    },

    'middle': {
      min: 10000,
      max: 50000
    },

    'high': 50000
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRoom = mapFilters.querySelector('#housing-rooms');
  var housingGuest = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelectorAll('.map__checkbox');
  var anyValue = 'any';

  var wifi = mapFilters.querySelector('#filter-wifi');
  var dishwasher = mapFilters.querySelector('#filter-dishwasher');
  var parking = mapFilters.querySelector('#filter-parking');
  var washer = mapFilters.querySelector('#filter-washer');
  var elevator = mapFilters.querySelector('#filter-elevator');
  var conditioner = mapFilters.querySelector('#filter-conditioner');

  /**
   * @param {Ad} ad
   * @return {boolean}
   */
  function checkHousingTypeChange(ad) {
    if (housingTypeFilter.value === anyValue) {
      return true;
    }
    return ad.offer.type === housingTypeFilter.options[housingTypeFilter.selectedIndex].value;
  }

  /**
   * @param {Ad} ad
   * @return {boolean}
   */
  function checkPriceChange(ad) {
    if (housingPrice.value === anyValue) {
      return true;
    } if (housingPrice.value === 'high') {
      return ad.offer.price >= HousingPriceMap[housingPrice.value];
    }
    return ad.offer.price >= HousingPriceMap[housingPrice.value].min && ad.offer.price < HousingPriceMap[housingPrice.value].max;
  }

  /**
   * @param {Ad} ad
   * @return {boolean}
   */
  function checkRoomChange(ad) {
    if (housingRoom.value === anyValue) {
      return true;
    }
    return ad.offer.rooms.toString() === housingRoom.options[housingRoom.selectedIndex].value;
  }

  /**
   * @param {Ad} ad
   * @return {boolean}
   */
  function checkGuestChange(ad) {
    if (housingGuest.value === anyValue) {
      return true;
    }
    return ad.offer.guests.toString() === housingGuest.options[housingGuest.selectedIndex].value;
  }

  /**
   *
   * @param {HTMLElement} input
   * @param {Ad} ad
   * @return {boolean}
   */
  function checkFeaturesChange(input, ad) {
    if (!input.checked) {
      return true;
    }
    return ad.offer.features.indexOf(input.value) !== -1;
  }

  function filterAd() {
    window.filteredAds = window.ads.filter(function (ad) {
      return checkHousingTypeChange(ad) &&
        checkPriceChange(ad) &&
        checkRoomChange(ad) &&
        checkGuestChange(ad) &&
        checkFeaturesChange(wifi, ad) &&
        checkFeaturesChange(dishwasher, ad) &&
        checkFeaturesChange(parking, ad) &&
        checkFeaturesChange(washer, ad) &&
        checkFeaturesChange(elevator, ad) &&
        checkFeaturesChange(conditioner, ad);
    });
  }

  function renderFilteredPins() {
    window.rerenderAds(window.filteredAds);
  }

  function onFiltersChange() {
    filterAd();
    if (window.filteredAds.length === 0) {
      window.clearPins();
      window.isRenderPinsCalled = true;
    } else {
      window.debounce(renderFilteredPins);
    }
    window.card.close();
  }

  mapFilters.addEventListener('change', onFiltersChange);
  window.resetFilters = function () {
    housingTypeFilter.value = anyValue;
    housingPrice.value = anyValue;
    housingRoom.value = anyValue;
    housingGuest.value = anyValue;
    for (var i = 0; i < housingFeatures.length; i++) {
      housingFeatures[i].checked = false;
    }
  };
})();
