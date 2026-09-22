window.HELP_IMPROVE_VIDEOJS = false;

// ---------------------------------------------------------------------------
// Media slots: every <video class="media-slot"> and <img class="media-slot">
// is checked on load. If the file is missing, the element is replaced by a
// labelled placeholder so the page renders cleanly before all media is added.
// Drop the file in place (same name) and it shows up without editing the HTML.
// ---------------------------------------------------------------------------

function showMissing(el, src) {
  var box = document.createElement('div');
  box.className = 'media-missing';
  var label = document.createElement('span');
  label.textContent = 'missing: ' + src.replace(/^\.\//, '');
  box.appendChild(label);
  el.replaceWith(box);
}

function showFallbackImage(video) {
  var img = document.createElement('img');
  img.src = video.getAttribute('data-fallback');
  img.alt = video.getAttribute('data-alt') || '';
  video.replaceWith(img);
}

function resolveVideoSlot(video) {
  var source = video.querySelector('source');
  if (!source) return;
  var src = source.getAttribute('src');

  fetch(src, { method: 'HEAD' })
    .then(function (res) {
      if (res.ok) {
        video.hidden = false;
        video.load();
      } else if (video.getAttribute('data-fallback')) {
        showFallbackImage(video);
      } else {
        showMissing(video, src);
      }
    })
    .catch(function () {
      // No network / file:// preview: let the browser try the video itself.
      video.hidden = false;
      video.load();
    });
}

function resolveImageSlot(img) {
  if (img.complete && img.naturalWidth === 0) {
    showMissing(img, img.getAttribute('src'));
    return;
  }
  img.addEventListener('error', function () {
    showMissing(img, img.getAttribute('src'));
  });
}

function installMediaFallbacks() {
  document.querySelectorAll('video.media-slot').forEach(resolveVideoSlot);
  document.querySelectorAll('img.media-slot').forEach(resolveImageSlot);
}

// ---------------------------------------------------------------------------
// Switchers: each <select class="task-select" data-switcher="X" data-key="K">
// filters the <div class="task-panel" data-switcher="X"> elements; a panel is
// shown only when, for every select of group X, panel.dataset[K] === value.
// Hidden panels have their videos paused.
// ---------------------------------------------------------------------------

function installTaskSwitchers() {
  var groups = {};
  document.querySelectorAll('select.task-select').forEach(function (select) {
    var name = select.getAttribute('data-switcher');
    (groups[name] = groups[name] || []).push(select);
  });

  Object.keys(groups).forEach(function (name) {
    var selects = groups[name];
    var panels = document.querySelectorAll('.task-panel[data-switcher="' + name + '"]');

    function refresh() {
      panels.forEach(function (panel) {
        var active = selects.every(function (sel) {
          var key = sel.getAttribute('data-key') || 'task';
          var want = panel.getAttribute('data-' + key);
          // a panel that does not declare this key is not filtered by it
          return want === null || want === sel.value;
        });
        panel.hidden = !active;
        if (!active) {
          panel.querySelectorAll('video').forEach(function (v) { v.pause(); });
        }
      });
    }

    selects.forEach(function (sel) { sel.addEventListener('change', refresh); });
    refresh();
  });
}

$(document).ready(function () {
  $('.navbar-burger').click(function () {
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });

  installMediaFallbacks();
  installTaskSwitchers();
  bulmaSlider.attach();
});
