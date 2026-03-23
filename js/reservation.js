// ===== PRICE MAP =====
const prices = {
  'Porsche 911 Carrera — 250€/jour': 250,
  'BMW X5 SUV — 180€/jour': 180,
  'Renault Clio — 45€/jour': 45,
  'Mercedes Classe E — 160€/jour': 160,
  'Tesla Model 3 — 130€/jour': 130,
  'Ferrari F8 Tributo — 550€/jour': 550,
};

// ===== ELEMENTS =====
const voitureEl  = document.getElementById('voiture');
const debutEl    = document.getElementById('dateDebut');
const finEl      = document.getElementById('dateFin');
const sumVoiture = document.getElementById('sumVoiture');
const sumDebut   = document.getElementById('sumDebut');
const sumFin     = document.getElementById('sumFin');
const sumDuree   = document.getElementById('sumDuree');
const sumTotal   = document.getElementById('sumTotal');

function updateSummary() {
  const car   = voitureEl.value;
  const debut = debutEl.value;
  const fin   = finEl.value;

  sumVoiture.textContent = car ? car.split(' — ')[0] : '—';
  sumDebut.textContent   = debut ? formatDate(debut) : '—';
  sumFin.textContent     = fin   ? formatDate(fin)   : '—';

  if (car && debut && fin) {
    const d1 = new Date(debut);
    const d2 = new Date(fin);
    const days = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));

    if (days > 0) {
      sumDuree.textContent = days + (days > 1 ? ' jours' : ' jour');
      const total = days * (prices[car] || 0);
      sumTotal.textContent = total + '€';
    } else {
      sumDuree.textContent = '—';
      sumTotal.textContent = '—';
    }
  } else {
    sumDuree.textContent = '—';
    sumTotal.textContent = '—';
  }
}

function formatDate(str) {
  const [y, m, d] = str.split('-');
  return `${d}/${m}/${y}`;
}

// Set today as min date
const today = new Date().toISOString().split('T')[0];
debutEl.min = today;
finEl.min   = today;

voitureEl.addEventListener('change', updateSummary);
debutEl.addEventListener('change', () => { finEl.min = debutEl.value; updateSummary(); });
finEl.addEventListener('change', updateSummary);

// ===== FORM SUBMIT =====
document.getElementById('reserverBtn').addEventListener('click', () => {
  const prenom  = document.getElementById('prenom').value.trim();
  const nom     = document.getElementById('nom').value.trim();
  const email   = document.getElementById('email').value.trim();
  const voiture = voitureEl.value;
  const debut   = debutEl.value;
  const fin     = finEl.value;

  if (!prenom || !nom || !email || !voiture || !debut || !fin) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  const msg = document.getElementById('successMsg');
  msg.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
