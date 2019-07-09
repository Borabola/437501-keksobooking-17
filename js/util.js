'use strict';
/* Пока .keyCode имеет почти полную поддержку, но он устаревает и к использованию не рекомендуется.
 Поэтому в условие введены его современный аналог .key. .key пока не поддерживается IE9-11 и  др. неосновными, поэтому
  evt.keyCode оставлен. Т.е. если выполнится хоть одно из условий - функция выполнится.   */
window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter' || evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
