'use strict';
(function () {
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
  function onPopupEscPress(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === window.util.ESC_KEYCODE) {
      onErrorPopupClick();
    }
  }

  /**
   * @param {KeyboardEvent} evt
   */
  function onSuccessPopupEscPress(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === window.util.ESC_KEYCODE) {
      onSuccessPopupClick();
      document.removeEventListener('click', onSuccessPopupClick);
    }
  }

  function addErrorPopup() {
    errorMessage = window.main.appendChild(errorClone);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onErrorPopupClick);
  }

  function onErrorPopupClick() {
    if (errorMessage) {
      errorMessage.remove();
      window.form.resetForm();
      window.map.clearPins();
      window.card.close();
      window.pin.returnMainPin();
      window.form.deactivatePage();
      window.filters.resetFilters();
      window.isRenderPinsCalled = false;
      window.isLoadCalled = false;
    }
  }

  function renderSuccessMessage() {
    successMessage = window.main.appendChild(successClone);
    document.addEventListener('keydown', onSuccessPopupEscPress);
    document.addEventListener('click', onSuccessPopupClick);
  }

  function onSuccessPopupClick() {
    if (successMessage) {
      successMessage.remove();
    }
    document.removeEventListener('click', onSuccessPopupClick);
  }

  window.popup = {
    renderSuccessMessage: renderSuccessMessage,
    addError: addErrorPopup,
  };
})();
