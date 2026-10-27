// Copy the contact address. Nothing is sent anywhere.
(function () {
  var btn = document.getElementById('copy-email');
  var status = document.getElementById('copied');
  var email = document.getElementById('email').textContent.trim();
  if (!btn) return;

  function done() { status.textContent = 'Copied ' + email; }
  function fallback() {
    var t = document.createElement('textarea');
    t.value = email;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); done(); }
    catch (e) { status.textContent = 'Press and hold the address to copy it.'; }
    document.body.removeChild(t);
  }

  btn.addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(done, fallback);
    } else {
      fallback();
    }
  });
})();
