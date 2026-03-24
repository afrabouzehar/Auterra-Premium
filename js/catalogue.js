/**
 * CATALOGUE.JS
 * Script pour gérer le filtrage des véhicules dans le catalogue
 * 
 * Fonctionnalités :
 * - Filtrer les voitures par catégorie (Sport, SUV, etc.)
 * - Activer/désactiver les boutons de filtre
 * - Afficher/cacher les cartes de voiture
 **/

function filtrer(categorie, bouton) {
  console.log('Filtrage activé pour :', categorie); // Pour déboguer
  
  // 1️⃣ Enlever la classe 'actif' de TOUS les boutons de filtre
  document.querySelectorAll('.btn-filtre').forEach(btn => {
    btn.classList.remove('actif');
  });
  
  // 2️⃣ Ajouter la classe 'actif' au bouton qui vient d'être cliqué
  bouton.classList.add('actif');
  
  // 3️⃣ Récupérer toutes les cartes de voitures
  const cartes = document.querySelectorAll('.carte-voiture');
  
  // 4️⃣ Parcourir chaque carte et la montrer/cacher
  cartes.forEach(carte => {
    // Récupérer la catégorie de la carte (from data-categorie attribute)
    const carteCategorie = carte.getAttribute('data-categorie');
    
    if (categorie === 'tous') {
      // Si "Tous" est sélectionné, afficher TOUTES les cartes
      carte.classList.remove('cache');
      console.log(`Carte ${carteCategorie} : affichée`);
    } else if (carteCategorie === categorie) {
      // Si la catégorie de la carte correspond au filtre, l'afficher
      carte.classList.remove('cache');
      console.log(`Carte ${carteCategorie} : affichée`);
    } else {
      // Sinon, la cacher
      carte.classList.add('cache');
      console.log(`Carte ${carteCategorie} : cachée`);
    }
  });
}

