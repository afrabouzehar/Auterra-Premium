
document.querySelectorAll('.btn-filtre').forEach(btn => {
  btn.classList.remove('actif');
});

bouton.classList.add('actif');

const cartes = document.querySelectorAll('.carte-voiture');

cartes.forEach(carte => {
  const carteCategorie = carte.getAttribute('data-categorie');

  if (categorie === 'tous') {
    carte.classList.remove('cache');
    console.log(`Carte ${carteCategorie} : affichée`);
  } 
  else if (carteCategorie === categorie) {
    carte.classList.remove('cache');
    console.log(`Carte ${carteCategorie} : affichée`);
  } 
  else {
    carte.classList.add('cache');
    console.log(`Carte ${carteCategorie} : cachée`);
  }
});