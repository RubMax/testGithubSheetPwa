// Remplace ce lien par le bon lien CSV publié de ta feuille
const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvyFiMOAyagtGz0dZ-4u1K6AGpNNgqyRNEzV2OarlR2rl0N5UvoCURUeOj9RaxBCGDtd_c8-INiIde/pub?gid=0&single=true&output=csv';

fetch(csvURL)
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    const cols = lines[1].split(',');
    const a2Value = cols[0]; // Nom de l’entreprise (cellule A2)
    const b2Value = cols[1]; // Slogan (cellule B2)
    
    document.getElementById('entreprise').textContent = a2Value || 'Nom introuvable';
    document.getElementById('slogan').textContent = b2Value || '';
  })
  .catch(err => {
    document.getElementById('entreprise').textContent = 'Erreur de chargement';
    console.error(err);
  });
