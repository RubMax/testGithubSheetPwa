// Remplace ce lien par le bon lien CSV publié de ta feuille
const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvyFiMOAyagtGz0dZ-4u1K6AGpNNgqyRNEzV2OarlR2rl0N5UvoCURUeOj9RaxBCGDtd_c8-INiIde/pub?gid=0&single=true&output=csv';

fetch(csvURL)
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    const a2Value = lines[1].split(',')[0]; // A2 = première colonne de la 2e ligne
    const b2Value = lines[1].split(',')[0];
    document.getElementById('entreprise').textContent = a2Value || 'Nom introuvable';
  document.getElementById('entreprise').textContent = b2Value || 'Nom introuvable';
  })
  .catch(err => {
    document.getElementById('entreprise').textContent = 'Erreur de chargement';
    console.error(err);
  });
