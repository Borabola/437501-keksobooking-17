'use strict';
/**
 * Модуль отрисовки карточки объявления
 */

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card, .popup');
  var adCard = cardTemplate.cloneNode(true);

  /**
   * Функция выбирает нужное склонение слов в зависимости от числа
   * @param {number} number
   * @param {string} titles
   * @return {string}
   */
  function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases [(number % 10 < 5) ? number % 10 : 5]];
  }

  /**
   * @param {HTMLElement} elem
   */
  function removeChildren(elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  }

  /**
   * Функция отрисовки фото в карточку
   * @param {{}} ad
   */
  function renderCardPhoto(ad) {
    var cardPhotoBlock = adCard.querySelector('.popup__photos');
    var cardPhoto = adCard.querySelector('.popup__photo');
    removeChildren(cardPhotoBlock);
    var cardPhotoLinks = ad.offer.photos;
    var images = document.createDocumentFragment();
    for (var i = 0; i < cardPhotoLinks.length; i++) {
      var image = cardPhoto.cloneNode(true);
      image.src = cardPhotoLinks[i];
      images.appendChild(image);
      cardPhotoBlock.appendChild(images);
    }
  }

  /**
   * Функция отрисовки эмблем-характеристик жилья
   * @param {{}} ad
   */
  function renderFeaturesImg(ad) {
    var cardFeatures = adCard.querySelector('.popup__features');
    removeChildren(cardFeatures);
    var features = ad.offer.features;
    features.forEach(function (feature) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + feature;
      cardFeatures.appendChild(li);
    });
  }

  /**
   * Функция заполнения текстовых полей карточки объявления
   * @param {{}} ad
   */
  function fillTextInCard(ad) {
    var types = {
      'bungalo': 'Бунгало',
      'flat': 'Квартира',
      'palace': 'Дворец',
      'house': 'Дом'
    };
    var avatar = adCard.querySelector('.popup__avatar');
    adCard.querySelector('.popup__title').textContent = ad.offer.title;
    adCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    adCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    adCard.querySelector('.popup__type').textContent = types[ad.offer.type];
    adCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' + declOfNum(ad.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + ad.offer.guests + ' ' + declOfNum(ad.offer.guests, ['гостя', 'гостей', 'гостей']);
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adCard.querySelector('.popup__description').textContent = ad.offer.description;
    avatar.src = ad.author.avatar;
  }

  /**
   * Функция отрисовки карточки объявления
   * @param {{}} ad
   */
  window.renderCard = function (ad) {
    var card = document.createDocumentFragment();
    var filtersContainer = document.querySelector('.map__filters-container');
    fillTextInCard(ad);
    renderCardPhoto(ad);
    renderFeaturesImg(ad);
    card.appendChild(adCard);
    window.map.insertBefore(card, filtersContainer);
  };
})();
