'use strict';

/* Модуль отрисовки фото в форму */

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_PREVIEW_SIZE = 70;

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');
  var photoChooser = document.querySelector('.ad-form__input');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var avatarInitial = avatarPreview.src;

  /**
   * Функция проверки типа файлов
   * @param {File} file
   * @return {boolean}
   */
  function checkType(file) {
    var matches = FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    return matches;
  }

  /**
   * Функция отрисовки загружаемых фото
   * @param {File} file
   * @param {HTMLElement} imgElement
   */
  function renderPhoto(file, imgElement) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      imgElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }

  /**
   * Функция добавляет предпросмотр фото
   * @param {string} address
   */
  function addPhoto(address) {
    var photoElement = document.createElement('img');
    photoElement.src = address;
    photoElement.width = PHOTO_PREVIEW_SIZE;
    photoElement.height = PHOTO_PREVIEW_SIZE;
    if (document.querySelector('.ad-form__photo img')) {
      var nextPhotoContainer = photoPreview.cloneNode(false);
      photoContainer.appendChild(nextPhotoContainer);
      nextPhotoContainer.appendChild(photoElement);
    } else {
      photoPreview.appendChild(photoElement);
    }
  }

  function renderSeriesPhoto(file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      addPhoto(reader.result);
    });
    reader.readAsDataURL(file);
  }

  avatarChooser.addEventListener('change', function () {
    var avatarFile = avatarChooser.files[0];
    if (checkType(avatarFile) && window.isLoadCalled) {
      renderPhoto(avatarFile, avatarPreview);
    }
  });

  photoChooser.addEventListener('change', function () {
    var photoFile = photoChooser.files[0];
    if (checkType(photoFile) && window.isLoadCalled) {
      renderSeriesPhoto(photoFile);
    }
  });

  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  avatarDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var avatarFile = evt.dataTransfer.files[0];

    if (checkType(avatarFile)) {
      renderPhoto(avatarFile, avatarPreview);
    }
  }, false);

  photoDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  photoDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var photoFile = evt.dataTransfer.files[0];
    if (checkType(photoFile)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });
      reader.readAsDataURL(photoFile);
    }
  }, false);

  function resetAvatar() {
    avatarPreview.src = avatarInitial;
  }

  function resetPhoto() {
    var photoPreviews = document.querySelectorAll('.ad-form__photo');
    var imgPhotoPreview = photoPreviews[0].querySelector('img');
    if (imgPhotoPreview) {
      imgPhotoPreview.remove();
    }
    if (photoPreviews.length > 1) {
      for (var i = 1; i < photoPreviews.length; i++) {
        photoPreviews[i].remove();
      }
    }
  }

  window.photo = {
    resetAvatar: resetAvatar,
    resetPhoto: resetPhoto
  };
})();
