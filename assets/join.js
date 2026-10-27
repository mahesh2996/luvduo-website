// Reads ?code= locally and shows it. The code never leaves this page.
(function () {
  var raw = new URLSearchParams(window.location.search).get('code') || '';
  var code = raw.trim().toUpperCase();
  var valid = /^[A-Z0-9]{6}$/.test(code);

  document.getElementById(valid ? 'has-code' : 'no-code').hidden = false;
  if (!valid) return;

  document.getElementById('code').textContent = code;
  var btn = document.getElementById('copy');
  var status = document.getElementById('copied');

  function done() {
    status.textContent = 'Copied! Paste it in BaeNest 💕';
    btn.querySelector('span').textContent = 'Copied';
    setTimeout(function () { btn.querySelector('span').textContent = 'Copy code'; }, 2500);
  }

  function fallback() {
    var t = document.createElement('textarea');
    t.value = code;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); done(); }
    catch (e) { status.textContent = 'Press and hold the code to copy it.'; }
    document.body.removeChild(t);
  }

  btn.addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(done, fallback);
    } else {
      fallback();
    }
  });
})();
