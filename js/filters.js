'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  window.housingTypeFilter = mapFilters.querySelector('#housing-type');
  var DEBOUNCE_INTERVAL = 300; // ms

  /**
   * @param{Requester~requestCallback} cb
   * @return {Function}
   */
  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

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

  });

  window.housingTypeFilter.addEventListener('change', window.onTypeChange);
})();
