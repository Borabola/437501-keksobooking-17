'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  window.housingTypeFilter = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRoom = mapFilters.querySelector('#housing-rooms');
  var housingGuest = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

  /**
   * Функция фильтрования по типу жилья
   * @type {function(): void}
   */
  window.onTypeChange = window.debounce(function () {
    if (window.housingTypeFilter.value === 'any') {
      window.filteredAds = window.ads;
    } else {
      window.filteredAds = window.ads.filter(function (ad) {
        return ad.offer.type === window.housingTypeFilter.options[window.housingTypeFilter.selectedIndex].value;
      });
    }
    if (window.filteredAds.length === 0) {
      window.clearPins();
      window.isRenderPinsCalled = true;
    } else {
      window.rerenderAds(window.filteredAds);
    }
    window.closeCard();
  });

  window.housingTypeFilter.addEventListener('change', window.onTypeChange);

  window.resetFilters = function () {
    window.housingTypeFilter.value = 'any';
    housingPrice.value = 'any';
    housingRoom.value = 'any';
    housingGuest.value = 'any';
    for (var i = 0; i < housingFeatures.length; i++) {
      housingFeatures[i].checked = false;
    }
  };
})();
