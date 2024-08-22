// functions to open and close a modal
function openModal($modal, pushstate) {
  if (pushstate) {
    history.pushState(null, null, "#" + $modal.id);
  }
  $modal.classList.add('is-active');
}

function closeModal($modal, pushstate) {
  controlVideo($modal, 'stopVideo');
  if (pushstate) {
    history.pushState(null,null,' ');
  }
  $modal.classList.remove('is-active');
}

function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal, false);
  });
}

function controlVideo($modal, vidFunc) {
  const elements = $modal.querySelectorAll('iframe');
  console.log(vidFunc); 
  elements.forEach( el => {
    el.contentWindow.postMessage(
            '{"event":"command","func":"' + vidFunc + '","args":""}',
            "*"
          );
  });
}

// add a click event on buttons to open a specific modal
(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);

  $trigger.addEventListener('click', () => {
    openModal($target, true);
  });
});

(document.querySelectorAll('.js-modal-changer') || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);

  $trigger.addEventListener('click', () => {
    closeModal($trigger.closest(".modal"), false);
    openModal($target, true);
  });
});

// add a click event on various child elements to close the parent modal
(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button .js-modal-trigger') || []).forEach(($close) => {
  const $target = $close.closest('.modal');

  $close.addEventListener('click', () => {
    closeModal($target, true);
  });
});

// add a keyboard event to close all modals
document.addEventListener('keydown', (event) => {
  if(event.key === "Escape") {
    closeAllModals();
  }
});

// detect hash changes from the user navigating their history (with the forward/back buttons)
window.addEventListener('hashchange', (event) => {
  var newhash = event.newURL.split('#')[1];
  var oldhash = event.oldURL.split('#')[1];
  if(newhash !== undefined && newhash !== null) { // if the new hash corresponds to a modal, open it
    var $newmodal = document.getElementById(newhash);
    if ($newmodal.classList.contains("modal")) {
      if (oldhash !== undefined && oldhash !== null) { // if the old hash corresponds to a modal, close it
        var $oldmodal = document.getElementById(oldhash);
        closeModal($oldmodal, false); // don't push new hash state, since the action of going forward or back a page does that already
      }
      openModal($newmodal, false);
    }
  } else {
    closeAllModals();
  }
});

// detect hash on load/reload
document.addEventListener('DOMContentLoaded', (event) => {
  var hash = window.location.hash.split('#')[1];
  if(hash !== undefined && hash !== null) { // if the hash corresponds to a modal, open it
    const $modal = document.getElementById(hash);
    if ($modal.classList.contains("modal")) {
      openModal($modal, false);
    }
  }
});