  function envoyer() {
      const nom     = document.getElementById('nom').value.trim();//récupère l’élément HTML avec l’id nom. value=récupère le texte que l’utilisateur a écrit. trim=supprime les espaces vides avant et après le texte (pratique pour éviter les champs vides avec juste des espaces).
      const email   = document.getElementById('email').value.trim();
      const sujet   = document.getElementById('sujet').value;
      const message = document.getElementById('message').value.trim();

      // Vérifier que tout est rempli
      if (!nom || !email || !sujet || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      // Afficher le message de succès
      document.getElementById('messageOk').style.display = 'block';

      // Vider les champs
      document.getElementById('nom').value     = '';
      document.getElementById('email').value   = '';
      document.getElementById('sujet').value   = '';
      document.getElementById('message').value = '';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }