'use strict';
(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);
  var ESC_KEYCODE = 27;

  /**
   * @param {KeyboardEvent} evt
   */
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
      window.removeErrorPopup();
    }
  };

  /**
   * @param {KeyboardEvent} evt
   */
  window.onSuccessPopupEscPress = function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
      window.removeSuccessPopup();
      document.removeEventListener('click', window.removeSuccessPopup);
    }
  };

  window.addErrorPopup = function () {
    window.main.appendChild(errorMessage);
    document.addEventListener('click', window.removeErrorPopup);
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.removeErrorPopup = function () {
    if (errorMessage) {
      window.main.removeChild(errorMessage);
    }
  };

  window.renderSuccessMessage = function () {
    window.main.appendChild(successMessage);
    document.addEventListener('keydown', window.onSuccessPopupEscPress);
    document.addEventListener('click', window.removeSuccessPopup);
  };

  window.removeSuccessPopup = function () {
    if (successMessage !== null) {
      window.main.removeChild(successMessage);
    }
    document.removeEventListener('click', window.removeSuccessPopup);
  };
})();
