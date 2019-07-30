'use strict';

/* MODULE HANDLES IMAGES UPLOADING IN THE FORM */

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var photoPreviewSize = '70';

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
  var checkType = function (file) {
    var matches = FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    return matches;
  };

  /**
   *
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


  var addPhoto = function (address) {
    var photoElement = document.createElement('img');
    photoElement.src = address;
    photoElement.width = photoPreviewSize;
    photoElement.height = photoPreviewSize;
    if (document.querySelector('.ad-form__photo img')) {
      var nextPhotoContainer = photoPreview.cloneNode(false);
      photoContainer.appendChild(nextPhotoContainer);
      nextPhotoContainer.appendChild(photoElement);
    } else {
      photoPreview.appendChild(photoElement);
    }
  };

  avatarChooser.addEventListener('change', function () {
    var avatarFile = avatarChooser.files[0];
    if (checkType(avatarFile)) {
      renderPhoto(avatarFile, avatarPreview);
    }
  });

  photoChooser.addEventListener('change', function () {
    var photoFile = photoChooser.files[0];
    if (checkType(photoFile) === true) {
      renderPhoto(photoFile, photoPreview);
    }
  });

  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  avatarDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var avatarFile = evt.dataTransfer.files[0];

    if (checkType(avatarFile) === true) {
      renderPhoto(avatarFile, avatarPreview);
    }
  }, false);


  photoDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  photoDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var photoFile = evt.dataTransfer.files[0];
    if (checkType(photoFile) === true) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        addPhoto(reader.result);
      });
      reader.readAsDataURL(photoFile);
    }
  }, false);

  window.resetAvatar = function () {
    avatarPreview.src = avatarInitial;
  };
})();
