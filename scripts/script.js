/* ═══════════════════════════════════════════════════════════
   CarRent — Script principal
   Modules : Données, Rendu, Filtres, Navbar, ThemeToggle,
             ScrollReveal, Formulaire, Modal, Toast, Compteur
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════
   1. DONNÉES — Catalogue de voitures
═══════════════════════════════════════════ */
const voitures = [
  {
    id: 1,
    nom: 'BMW Série 3',
    type: 'Sedan',
    emoji: '🚗',
    prix: 95,
    note: 4.9,
    avis: 312,
    specs: ['5 places', 'Auto', 'Essence', 'A/C'],
    badge: 'Populaire',
    badgeClass: '',
  },
  {
    id: 2,
    nom: 'Toyota RAV4',
    type: 'SUV',
    emoji: '🚙',
    prix: 120,
    note: 4.8,
    avis: 218,
    specs: ['7 places', 'Auto', 'Hybride', '4x4'],
    badge: 'SUV',
    badgeClass: 'badge-suv',
  },
  {
    id: 3,
    nom: 'Mercedes Classe C',
    type: 'Luxe',
    emoji: '🏎️',
    prix: 195,
    note: 4.9,
    avis: 154,
    specs: ['5 places', 'Auto', 'Diesel', 'Cuir'],
    badge: 'Luxe',
    badgeClass: 'badge-luxe',
  },
  {
    id: 4,
    nom: 'Peugeot 208',
    type: 'Citadine',
    emoji: '🚕',
    prix: 49,
    note: 4.6,
    avis: 445,
    specs: ['5 places', 'Manuelle', 'Essence', 'A/C'],
    badge: 'Éco',
    badgeClass: 'badge-citadine',
  },
  {
    id: 5,
    nom: 'Audi A5 Coupé',
    type: 'Coupé',
    emoji: '🏎️',
    prix: 160,
    note: 4.7,
    avis: 88,
    specs: ['4 places', 'Auto', 'Essence', 'Sport'],
    badge: 'Coupé',
    badgeClass: 'badge-coupe',
  },
  {
    id: 6,
    nom: 'Volkswagen Tiguan',
    type: 'SUV',
    emoji: '🚐',
    prix: 105,
    note: 4.7,
    avis: 201,
    specs: ['7 places', 'Auto', 'Diesel', 'A/C'],
    badge: 'SUV',
    badgeClass: 'badge-suv',
  },
  {
    id: 7,
    nom: 'Renault Clio',
    type: 'Citadine',
    emoji: '🚗',
    prix: 39,
    note: 4.5,
    avis: 672,
    specs: ['5 places', 'Manuelle', 'Essence', 'GPS'],
    badge: 'Éco',
    badgeClass: 'badge-citadine',
  },
  {
    id: 8,
    nom: 'Porsche Cayenne',
    type: 'Luxe',
    emoji: '🚙',
    prix: 350,
    note: 5.0,
    avis: 43,
    specs: ['5 places', 'Auto', 'Hybride', 'Sport+'],
    badge: 'Exclusif',
    badgeClass: 'badge-luxe',
  },
  {
    id: 9,
    nom: 'Citroën C3',
    type: 'Citadine',
    emoji: '🚕',
    prix: 42,
    note: 4.4,
    avis: 520,
    specs: ['5 places', 'Manuelle', 'Essence', 'A/C'],
    badge: 'Éco',
    badgeClass: 'badge-citadine',
  },
  {
    id: 10,
    nom: 'Tesla Model S',
    type: 'Luxe',
    emoji: '🏎️',
    prix: 280,
    note: 4.9,
    avis: 97,
    specs: ['5 places', 'Auto', 'Électrique', 'AP'],
    badge: 'Électrique',
    badgeClass: 'badge-luxe',
  },
];

/* ─── État de l'application ─── */
const state = {
  filtreCategorie: 'all',
  prixMax: 500,
  tri: 'default',
  favoris: new Set(),
};

/* ═══════════════════════════════════════════
   2. RENDU DES CARTES VOITURES
═══════════════════════════════════════════ */

/**
 * Génère le HTML d'une carte voiture
 * @param {Object} voiture
 * @returns {string} HTML de la carte
 */
function creerCarteHTML(voiture) {
  // Générer les étoiles
  const etoilesPlein = Math.floor(voiture.note);
  const etoilesVide  = 5 - etoilesPlein;
  const etoiles = '★'.repeat(etoilesPlein) + '☆'.repeat(etoilesVide);

  // Cœur favori
  const estFavori = state.favoris.has(voiture.id);

  return `
    <article class="car-card" data-id="${voiture.id}" data-type="${voiture.type}" data-prix="${voiture.prix}">
      <!-- Visuel -->
      <div class="car-visual">
        <div class="car-visual-emoji" aria-hidden="true">${voiture.emoji}</div>
        <span class="car-badge ${voiture.badgeClass}">${voiture.badge}</span>
        <button
          class="car-favorite ${estFavori ? 'active' : ''}"
          onclick="toggleFavori(${voiture.id}, this)"
          aria-label="${estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
        >${estFavori ? '❤️' : '🤍'}</button>
      </div>

      <!-- Corps -->
      <div class="car-body">
        <h3 class="car-name">${voiture.nom}</h3>
        <p class="car-type">${voiture.type}</p>

        <!-- Spécifications -->
        <div class="car-specs">
          ${voiture.specs.map(s => `<span class="car-spec">${s}</span>`).join('')}
        </div>

        <!-- Note -->
        <div class="car-rating">
          <span class="stars" aria-label="Note : ${voiture.note}/5">${etoiles}</span>
          <span class="rating-text">${voiture.note} (${voiture.avis} avis)</span>
        </div>

        <!-- Pied de carte -->
        <div class="car-footer">
          <div>
            <span class="car-price">${voiture.prix} €</span>
            <span class="car-price-unit"> / jour</span>
          </div>
          <button
            class="btn-louer"
            onclick="louerVoiture(${voiture.id}, this)"
            aria-label="Louer ${voiture.nom}"
          >Louer</button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Applique les filtres + tri et re-rend la grille
 */
function rendreVoitures() {
  const grid       = document.getElementById('carsGrid');
  const noResults  = document.getElementById('noResults');
  const countLabel = document.getElementById('resultsCount');

  // ── Filtrage ──
  let liste = voitures.filter(v => {
    const matchCat  = state.filtreCategorie === 'all' || v.type === state.filtreCategorie;
    const matchPrix = v.prix <= state.prixMax;
    return matchCat && matchPrix;
  });

  // ── Tri ──
  switch (state.tri) {
    case 'price-asc':
      liste.sort((a, b) => a.prix - b.prix);
      break;
    case 'price-desc':
      liste.sort((a, b) => b.prix - a.prix);
      break;
    case 'name':
      liste.sort((a, b) => a.nom.localeCompare(b.nom));
      break;
    default:
      break; // ordre d'origine
  }

  // ── Affichage ──
  if (liste.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    countLabel.textContent = 'Aucun véhicule trouvé';
  } else {
    noResults.classList.add('hidden');
    countLabel.textContent = `Affichage de ${liste.length} véhicule${liste.length > 1 ? 's' : ''}`;
    grid.innerHTML = liste
      .map((v, i) => {
        // Stagger des animations d'entrée
        const html = creerCarteHTML(v);
        return html.replace('class="car-card"', `class="car-card" style="animation-delay:${i * 0.06}s"`);
      })
      .join('');
  }
}

/* ═══════════════════════════════════════════
   3. FILTRES & TRI
═══════════════════════════════════════════ */

// ── Onglets de catégorie ──
document.getElementById('filterTabs').addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;

  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  state.filtreCategorie = tab.dataset.filter;
  rendreVoitures();
});

// ── Slider de prix ──
const priceRange = document.getElementById('priceRange');
const priceLabel = document.getElementById('priceLabel');
priceRange.addEventListener('input', () => {
  state.prixMax = +priceRange.value;
  priceLabel.textContent = `${priceRange.value} €/j`;
  rendreVoitures();
});

// ── Sélecteur de tri ──
document.getElementById('sortSelect').addEventListener('change', e => {
  state.tri = e.target.value;
  rendreVoitures();
});

/**
 * Réinitialise tous les filtres
 */
function resetFiltres() {
  state.filtreCategorie = 'all';
  state.prixMax = 500;
  state.tri = 'default';

  priceRange.value = 500;
  priceLabel.textContent = '500 €/j';
  document.getElementById('sortSelect').value = 'default';
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === 'all');
  });
  rendreVoitures();
}

/* ═══════════════════════════════════════════
   4. ACTION LOUER — Animation + Modal
═══════════════════════════════════════════ */

/**
 * Lance l'animation de clic et ouvre la modal de réservation
 * @param {number} id — ID de la voiture
 * @param {HTMLElement} btn — bouton cliqué
 */
function louerVoiture(id, btn) {
  // Animation ripple sur le bouton
  btn.classList.add('clicked');
  btn.textContent = '✅ Ajouté !';
  btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('clicked');
    btn.textContent = 'Louer';
    btn.disabled = false;
  }, 1400);

  // Chercher la voiture
  const v = voitures.find(x => x.id === id);
  if (!v) return;

  // Petit délai avant l'ouverture de la modal
  setTimeout(() => ouvrirModal(v), 200);
}

/* ═══════════════════════════════════════════
   5. FAVORIS
═══════════════════════════════════════════ */

/**
 * Bascule le favori pour une voiture
 */
function toggleFavori(id, btn) {
  if (state.favoris.has(id)) {
    state.favoris.delete(id);
    btn.textContent = '🤍';
    btn.classList.remove('active');
    afficherToast('Retiré des favoris');
  } else {
    state.favoris.add(id);
    btn.textContent = '❤️';
    btn.classList.add('active');
    afficherToast('Ajouté aux favoris ❤️');
  }
}

/* ═══════════════════════════════════════════
   6. MODAL DE RÉSERVATION
═══════════════════════════════════════════ */
const overlay    = document.getElementById('modalOverlay');
const modalBody  = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

/**
 * Ouvre la modal avec le formulaire de réservation
 * @param {Object} voiture
 */
function ouvrirModal(voiture) {
  const today    = new Date().toISOString().split('T')[0];
  const demain   = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  modalBody.innerHTML = `
    <h2 style="font-family:'Syne',sans-serif;font-size:1.5rem;margin-bottom:.4rem">
      Réserver — ${voiture.nom}
    </h2>
    <p style="color:var(--texte-muted);font-size:.88rem;margin-bottom:1.8rem">
      ${voiture.prix} € / jour · ${voiture.badge}
    </p>

    <div class="form-row" style="margin-bottom:1.2rem">
      <div class="form-group" style="margin-bottom:0">
        <label for="mPrenom">Prénom</label>
        <input type="text" id="mPrenom" placeholder="Jean" />
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label for="mNom">Nom</label>
        <input type="text" id="mNom" placeholder="Dupont" />
      </div>
    </div>
    <div class="form-group">
      <label for="mEmail">Email</label>
      <input type="email" id="mEmail" placeholder="jean@exemple.fr"/>
    </div>
    <div class="form-row" style="margin-bottom:1.2rem">
      <div class="form-group" style="margin-bottom:0">
        <label for="mDepart">Date de départ</label>
        <input type="date" id="mDepart" value="${today}"/>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label for="mRetour">Date de retour</label>
        <input type="date" id="mRetour" value="${demain}"/>
      </div>
    </div>
    <div class="form-group">
      <label for="mLieu">Lieu de prise en charge</label>
      <select id="mLieu">
        <option>Paris — Centre-ville</option>
        <option>Paris — Aéroport CDG</option>
        <option>Lyon — Centre</option>
        <option>Marseille — Aéroport</option>
        <option>Bordeaux — Gare</option>
        <option>Livraison à l'hôtel (+30 €)</option>
      </select>
    </div>
    <button
      class="btn-primary"
      style="width:100%;justify-content:center;padding:.9rem;font-size:1rem"
      onclick="confirmerReservation('${voiture.nom}')"
    >
      ✅ Confirmer la réservation
    </button>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Confirme la réservation depuis la modal
 */
function confirmerReservation(nomVoiture) {
  fermerModal();
  afficherToast(`🎉 Réservation confirmée pour la ${nomVoiture} !`);
}

/**
 * Ferme la modal
 */
function fermerModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Fermeture au clic sur l'overlay ou le bouton ×
overlay.addEventListener('click', e => {
  if (e.target === overlay) fermerModal();
});
modalClose.addEventListener('click', fermerModal);

// Fermeture à la touche Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fermerModal();
});

/* ═══════════════════════════════════════════
   7. NAVBAR — scroll + burger + active link
═══════════════════════════════════════════ */
const navbar  = document.getElementById('navbar');
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

// Effet scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  mettreAJourLienActif();
});

// Burger mobile
burger.addEventListener('click', () => {
  const ouvert = navMenu.classList.toggle('open');
  burger.classList.toggle('open', ouvert);
  burger.setAttribute('aria-expanded', ouvert);
});

// Fermer menu si clic sur un lien
navMenu.querySelectorAll('.nav-link').forEach(lien => {
  lien.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
  });
});

/**
 * Met en surbrillance le lien de navigation actif selon la section visible
 */
function mettreAJourLienActif() {
  const sections = document.querySelectorAll('section[id]');
  let actuel = '';

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) actuel = section.id;
  });

  document.querySelectorAll('.nav-link').forEach(lien => {
    lien.classList.toggle('active', lien.getAttribute('href') === `#${actuel}`);
  });
}

/* ═══════════════════════════════════════════
   8. DARK MODE
═══════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

// Lire la préférence sauvegardée ou système
const prefereSombre = localStorage.getItem('theme') === 'dark'
  || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (prefereSombre) appliquerTheme('dark');

themeToggle.addEventListener('click', () => {
  const actuel   = document.documentElement.getAttribute('data-theme');
  const nouveau  = actuel === 'dark' ? 'light' : 'dark';
  appliquerTheme(nouveau);
  localStorage.setItem('theme', nouveau);
});

/**
 * Applique le thème clair ou sombre
 * @param {string} theme — 'light' | 'dark'
 */
function appliquerTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label',
    theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'
  );
}

/* ═══════════════════════════════════════════
   9. SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // On n'observe plus une fois visible (perf)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function observerReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ═══════════════════════════════════════════
   10. COMPTEUR ANIMÉ (section À propos)
═══════════════════════════════════════════ */

/**
 * Anime un compteur de 0 à la valeur cible
 * @param {HTMLElement} el
 * @param {number} cible
 * @param {number} duree — ms
 */
function animerCompteur(el, cible, duree = 1800) {
  let debut = null;
  const step = ts => {
    if (!debut) debut = ts;
    const prog   = Math.min((ts - debut) / duree, 1);
    const ease   = 1 - Math.pow(1 - prog, 3); // easeOutCubic
    const valeur = Math.round(ease * cible);
    el.textContent = valeur >= 1000 ? valeur.toLocaleString('fr-FR') + '+' : valeur;
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Observer les éléments stat-big
const statObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animerCompteur(el, +el.dataset.count);
        statObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.stat-big').forEach(el => statObserver.observe(el));

/* ═══════════════════════════════════════════
   11. FORMULAIRE DE CONTACT — Validation
═══════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  if (validerFormulaire()) envoyerFormulaire();
});

/**
 * Valide les champs du formulaire
 * @returns {boolean}
 */
function validerFormulaire() {
  let valide = true;

  // Nom
  const nom = document.getElementById('contactNom');
  const errNom = document.getElementById('errNom');
  if (!nom.value.trim() || nom.value.trim().length < 2) {
    afficherErreur(nom, errNom, 'Veuillez entrer votre nom (min. 2 caractères)');
    valide = false;
  } else {
    effacerErreur(nom, errNom);
  }

  // Email
  const email = document.getElementById('contactEmail');
  const errEmail = document.getElementById('errEmail');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value.trim())) {
    afficherErreur(email, errEmail, 'Veuillez entrer une adresse email valide');
    valide = false;
  } else {
    effacerErreur(email, errEmail);
  }

  // Message
  const message = document.getElementById('contactMessage');
  const errMessage = document.getElementById('errMessage');
  if (!message.value.trim() || message.value.trim().length < 10) {
    afficherErreur(message, errMessage, 'Le message doit contenir au moins 10 caractères');
    valide = false;
  } else {
    effacerErreur(message, errMessage);
  }

  return valide;
}

function afficherErreur(champ, errEl, msg) {
  champ.classList.add('error');
  errEl.textContent = msg;
}

function effacerErreur(champ, errEl) {
  champ.classList.remove('error');
  errEl.textContent = '';
}

// Effacement en temps réel
['contactNom', 'contactEmail', 'contactMessage'].forEach(id => {
  document.getElementById(id).addEventListener('input', function () {
    this.classList.remove('error');
    const errId = 'err' + id.replace('contact', '');
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = '';
  });
});

/**
 * Simule l'envoi du formulaire
 */
function envoyerFormulaire() {
  const btnText   = contactForm.querySelector('.btn-text');
  const btnLoader = contactForm.querySelector('.btn-loader');
  const success   = document.getElementById('formSuccess');
  const btn       = contactForm.querySelector('.btn-submit');

  // État chargement
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  btn.disabled = true;

  // Simulation réseau (1.5 s)
  setTimeout(() => {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    btn.disabled = false;
    success.classList.remove('hidden');
    contactForm.reset();
    afficherToast('✅ Message envoyé avec succès !');

    setTimeout(() => success.classList.add('hidden'), 5000);
  }, 1500);
}

/* ═══════════════════════════════════════════
   12. TOAST NOTIFICATION
═══════════════════════════════════════════ */
let toastTimeout = null;

/**
 * Affiche une notification toast
 * @param {string} message
 * @param {number} duree — ms
 */
function afficherToast(message, duree = 3000) {
  const toast = document.getElementById('toast');
  if (toastTimeout) clearTimeout(toastTimeout);

  toast.textContent = message;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => toast.classList.remove('show'), duree);
}

/* ═══════════════════════════════════════════
   13. BARRE DE RECHERCHE HERO — Redirection
═══════════════════════════════════════════ */

/**
 * Intercepte la soumission du formulaire hero et redirige vers #voitures
 */
function rechercherVoitures(e) {
  e.preventDefault();
  const type = document.getElementById('searchType').value;

  // Appliquer le filtre par type si sélectionné
  if (type) {
    state.filtreCategorie = type;
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === type);
    });
    rendreVoitures();
  }

  document.getElementById('voitures').scrollIntoView({ behavior: 'smooth' });
  afficherToast('🔍 Recherche appliquée');
}

/* ═══════════════════════════════════════════
   14. INITIALISATION
═══════════════════════════════════════════ */

// Pré-remplir la date du jour dans la barre de recherche hero
document.getElementById('searchDate').value = new Date().toISOString().split('T')[0];

// Rendre la grille de voitures initiale
rendreVoitures();

// Lancer les observers de scroll reveal
observerReveal();

// Mettre à jour le lien actif au chargement
mettreAJourLienActif();

// Ré-observer les éléments reveal après chaque rendu de la grille
// (les cartes sont générées dynamiquement)
const mutationObs = new MutationObserver(() => {
  document.querySelectorAll('.car-card:not(.observed)').forEach(card => {
    card.classList.add('observed');
    // Entrée visible immédiate (les stagger animations CSS s'occupent du timing)
    setTimeout(() => card.style.opacity = '1', 0);
  });
});
mutationObs.observe(document.getElementById('carsGrid'), { childList: true });

console.log('🚗 CarRent — Prêt au départ !');
