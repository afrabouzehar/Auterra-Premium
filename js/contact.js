// ===== CONTACT FORM =====
document.getElementById('sendBtn').addEventListener('click', () => {
  const nom     = document.getElementById('cNom').value.trim();
  const email   = document.getElementById('cEmail').value.trim();
  const sujet   = document.getElementById('cSujet').value;
  const message = document.getElementById('cMessage').value.trim();

  if (!nom || !email || !sujet || !message) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  const msg = document.getElementById('contactSuccess');
  msg.style.display = 'block';

  // Clear fields
  document.getElementById('cNom').value     = '';
  document.getElementById('cEmail').value   = '';
  document.getElementById('cSujet').value   = '';
  document.getElementById('cMessage').value = '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
});
