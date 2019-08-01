'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorClone = errorTemplate.cloneNode(true);
  var errorMessage;
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successClone = successTemplate.cloneNode(true);
  var successMessage;

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
    errorMessage = window.main.appendChild(errorClone);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', window.removeErrorPopup);
  };

  window.removeErrorPopup = function () {
    if (errorMessage !== null) {
      errorMessage.remove();
      window.resetForm();
      window.clearPins();
      window.closeCard();
      window.returnMainPin();
      window.deactivatePage();
      window.resetFilters();
      window.isRenderPinsCalled = false;
      window.isLoadCalled = false;
    }
  };

  window.renderSuccessMessage = function () {
    successMessage = window.main.appendChild(successClone);
    document.addEventListener('keydown', window.onSuccessPopupEscPress);
    document.addEventListener('click', window.removeSuccessPopup);
  };

  window.removeSuccessPopup = function () {
    if (successMessage !== null) {
      successMessage.remove();
    }
    document.removeEventListener('click', window.removeSuccessPopup);
  };
})();
