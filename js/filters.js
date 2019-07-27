'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRoom = mapFilters.querySelector('#housing-rooms');
  var housingGuest = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelectorAll('.map__checkbox');
  var anyValue = 'any';

  var housingPriceMap = {
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

  var checkHousingTypeChange = function (ad) {
    if (housingTypeFilter.value === anyValue) {
      return true;
    }
    return ad.offer.type === housingTypeFilter.options[housingTypeFilter.selectedIndex].value;
  };

  var checkPriceChange = function (ad) {
    if (housingPrice.value === anyValue) {
      return true;
    } else if (housingPrice.value === 'high') {
      return ad.offer.price >= housingPriceMap[housingPrice.value];
    }
    return ad.offer.price >= housingPriceMap[housingPrice.value].min && ad.offer.price < housingPriceMap[housingPrice.value].max;
  };

  function filterAd() {
    window.filteredAds = window.ads.filter(function (ad) {
      return checkHousingTypeChange(ad) &&
        checkPriceChange(ad);
    });
  }

  function onFiltersChange() {
    filterAd();
    if (window.filteredAds.length === 0) {
      window.clearPins();
      window.isRenderPinsCalled = true;
    } else {
      window.rerenderAds(window.filteredAds);
    }
    window.closeCard();
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
