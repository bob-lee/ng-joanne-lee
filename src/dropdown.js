document.addEventListener('DOMContentLoaded', function() {
  var handler; // to hold a reference to event handler of currently-opened menu

  setTimeout(function() {
    var input = document.querySelector('.ddm input[type="checkbox"][id]');

    if (input) {
      input.addEventListener('change', function(e) {
        if (e.target.checked) {
          handler = outside(e.target); // keep a reference to remove later
          document.addEventListener('click', handler);
          document.addEventListener('touchstart', handler); // for touch device
        } else {
          removeHandler();
        }
      });
    }
  }, 0);

  function outside(el) {
    return function curried(e) { // el is currently-opened menu
      if (el.id !== e.target.id) {
        el.checked = false;

        removeHandler();
      }
    }
  }

  function removeHandler() {
    document.removeEventListener('click', handler);
    document.removeEventListener('touchstart', handler);
  }
});