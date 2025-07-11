// Remplace ce lien par le bon lien CSV publié de ta feuille
const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvyFiMOAyagtGz0dZ-4u1K6AGpNNgqyRNEzV2OarlR2rl0N5UvoCURUeOj9RaxBCGDtd_c8-INiIde/pub?gid=0&single=true&output=csv';

fetch(csvURL)
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    const cols = lines[1].split(',');

    const nom = cols[0];     // A2
    const slogan = cols[1];  // B2
    const logoURL = cols[2]; // C2 (URL de l'image)

    document.getElementById('entreprise').textContent = nom || 'Nom introuvable';
    document.getElementById('slogan').textContent = slogan || '';
    
    const logo = document.getElementById('logo');
    if (logoURL && logo) {
      logo.src = logoURL.trim();
    }
  })
  .catch(err => {
    document.getElementById('entreprise').textContent = 'Erreur de chargement';
    console.error(err);
  });






  let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Écouteur pour l'événement 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Empêche le prompt automatique
  deferredPrompt = e;
  installBtn.style.display = 'block'; // Affiche le bouton

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none'; // Cache le bouton après clic
    deferredPrompt.prompt(); // Montre la popup système

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Utilisateur a accepté d’installer l’app.');
      } else {
        console.log('Utilisateur a refusé l’installation.');
      }
      deferredPrompt = null;
    });
  });
});

// Masquer le bouton si l’app est déjà installée
window.addEventListener('appinstalled', () => {
  console.log('L’app est installée.');
  installBtn.style.display = 'none';
});

