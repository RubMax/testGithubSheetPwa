

const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvyFiMOAyagtGz0dZ-4u1K6AGpNNgqyRNEzV2OarlR2rl0N5UvoCURUeOj9RaxBCGDtd_c8-INiIde/pub?gid=0&single=true&output=csv';

fetch(csvURL)
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n').map(line => line.split(','));
    const headers = lines.shift(); // En-têtes

    const produits = lines.map(row => {
      return {
        section:     row[0],
        nom:         row[1],
        image:       row[2],
        description: row[3],
        prix:        row[4],
        tailles:     row[5],
        code:        row[6],
        pub:         row[7],
        pubInterval: row[8]
      };
    });

    // Afficher le nom d'entreprise en A2 (1ère colonne 2e ligne)
    const entreprise = lines[0][0];
    document.getElementById('entreprise').textContent = entreprise || "Nom introuvable";

    // Générer les cartes dans un conteneur
    const container = document.getElementById('produits');
    container.innerHTML = ""; // vider le contenu

    produits.forEach(p => {
      const card = document.createElement('div');
      card.className = "carte";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.nom}" />
        <h3>${p.nom}</h3>
        <p>${p.description}</p>
        <p><strong>Prix:</strong> ${p.prix}</p>
        <p><strong>Tailles:</strong> ${p.tailles}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Erreur de chargement :", err);
    document.getElementById('entreprise').textContent = "Erreur de chargement des données";
  });
