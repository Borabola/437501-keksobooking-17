'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  window.housingTypeFilter = mapFilters.querySelector('#housing-type');

  /**
   * Функция фильтрования по типу жилья
   * @type {function(): void}
   */
  window.onTypeChange = window.debounce(function () {
    window.filteredAds = window.ads.filter(function (ad) {
      return ad.offer.type === window.housingTypeFilter.options[window.housingTypeFilter.selectedIndex].value;
    });
    window.filteredAds = window.filteredAds.concat(window.ads);
    window.uniqueAds = window.filteredAds.filter(function (it, i) {
      return window.filteredAds.indexOf(it) === i;
    });
    window.rerenderAds(window.uniqueAds);
    window.closeCard();
  });

  window.housingTypeFilter.addEventListener('change', window.onTypeChange);
})();
