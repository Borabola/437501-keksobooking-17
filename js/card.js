'use strict';
/**
 * @typedef {{
 * author:
 *   {avatar: string},
 * offer: {
 *    title: string,
 *    address: string,
 *    price: number,
 *    type: string,
 *    rooms: number,
 *    guests: number,
 *    checkin: string,
 *    checkout: string,
 *    features: [],
 *    description: string,
 *    photos: []
 *   }
 * location: {
 *   x: number,
 *   y: number},
 * index: number
 * }
 * } Ad
 * /
 /**
 * Модуль отрисовки карточки объявления
 */

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card, .popup');
  var adCard = cardTemplate.cloneNode(true);
  var card = document.createDocumentFragment();
  var image;
  var images = document.createDocumentFragment();
  var cardPhotoBlock = adCard.querySelector('.popup__photos');
  var cardPhoto = adCard.querySelector('.popup__photo');
  var ESC_KEYCODE = 27;

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

  window.closeCard = function () {
    var cardPopup = document.querySelector('.map__card, .popup');
    if (cardPopup) {
      cardPopup.remove();
      var activePin = window.pinsContainer.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', window.onCardEscPress);
      window.cardClose.removeEventListener('click', window.closeCard);
    }
  };

  /**
   * @param {HTMLElement} elem
   */
  function removeChildren(elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  }

  /**
   * @param {Ad} ad
   * @return {boolean}
   */
  function hasPhotos(ad) {
    return ad.offer.photos.length > 0;
  }

  /**
   * @param {Ad} ad
   */
  function renderPhotosAd(ad) {
    for (var i = 0; i < ad.offer.photos.length; i++) {
      image = cardPhoto.cloneNode(true);
      image.src = ad.offer.photos[i];
      image.removeAttribute('style');
      images.appendChild(image);
      cardPhotoBlock.appendChild(images);
    }
  }

  function renderPhotoPlaceholder() {
    image = cardPhoto.cloneNode(true);
    image.src = '#';
    image.style.display = 'none';
    images.appendChild(image);
    cardPhotoBlock.appendChild(images);
  }


  /**
   * Функция отрисовки фото в карточку
   * @param {Ad} ad
   */
  function renderCardPhoto(ad) {
    removeChildren(cardPhotoBlock);
    if (hasPhotos(ad)) {
      renderPhotosAd(ad);
    } else {
      renderPhotoPlaceholder();
    }
  }

  /**
   * Функция отрисовки эмблем-характеристик жилья
   * @param {Ad} ad
   */
  function renderFeaturesImg(ad) {
    var cardFeatures = adCard.querySelector('.popup__features');
    removeChildren(cardFeatures);
    var features = ad.offer.features;
    if (features.length > 0) {
      features.forEach(function (feature) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + feature;
        cardFeatures.appendChild(li);
      });
    }
  }

  /**
   * Функция заполнения текстовых полей карточки объявления
   * @param {Ad} ad
   */
  function fillTextInCard(ad) {
    var types = {
      'bungalo': 'Бунгало',
      'flat': 'Квартира',
      'palace': 'Дворец',
      'house': 'Дом',
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
   * @param {Ad} ad
   */
  window.renderCard = function (ad) {
    var filtersContainer = document.querySelector('.map__filters-container');
    fillTextInCard(ad);
    renderCardPhoto(ad);
    renderFeaturesImg(ad);
    card.appendChild(adCard);
    var cardPopup = card.children[0];
    window.cityMap.insertBefore(card, filtersContainer);
    window.cardClose = cardPopup.querySelector('.popup__close');
    document.addEventListener('keydown', window.onCardEscPress);
    window.cardClose.addEventListener('click', window.closeCard);
  };


  /**
   * @param {KeyboardEvent} evt
   */
  window.onCardEscPress = function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
      window.closeCard();
    }
  };
})();
