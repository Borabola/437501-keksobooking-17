'use strict';
(function () {
  var imagesInOrder = ['01', '02', '03', '04', '05', '06', '07', '08'];

  window.map = document.querySelector('.map');

  /**
   * Функция перемешивания массива
   *@param {*[]} arr
   *@return {number[]} перемешенный массив
   */
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  /**
   * Функция получения случайного числа из интервала
   * @param {number} min минимальное значение
   * @param {number} max максимальное значение
   * @return {number} случайный число
   */
  window.getRandom = function (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  };

  /**
   * Функция создает массив путей к картинкам
   * @param {number} count
   * @return {string[]}
   */
  window.getImages = function (count) {
    var shuffledImages = shuffle(imagesInOrder);
    var images = [];
    for (var i = 0; i < count; i++) {
      images.push('img/avatars/user' + shuffledImages[i] + '.png');
    }
    return images;
  };
})();
