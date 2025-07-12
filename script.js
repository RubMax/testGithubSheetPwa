// Remplace ce lien par le bon lien CSV publié de ta feuille
//const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvyFiMOAyagtGz0dZ-4u1K6AGpNNgqyRNEzV2OarlR2rl0N5UvoCURUeOj9RaxBCGDtd_c8-INiIde/pub?gid=0&single=true&output=csv';

//fetch(csvURL)
 // .then(response => response.text())
//    const lines = data.split('\n');
 //   const a2Value = lines[1].split(',')[0]; // A2 = première colonne de la 2e ligne
 //   document.getElementById('entreprise').textContent = a2Value || 'Nom introuvable';
 // })
 // .catch(err => {
 //   document.getElementById('entreprise').textContent = 'Erreur de chargement';
  //  console.error(err);
 // });


const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvyFiMOAyagtGz0dZ-4u1K6AGpNNgqyRNEzV2OarlR2rl0N5UvoCURUeOj9RaxBCGDtd_c8-INiIde/pub?gid=0&single=true&output=csv';

fetch(csvURL)
  .then(response => response.text())
  .then(data => {
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const rows = sheet.getDataRange().getValues();
    rows.shift();
    return rows.map(r => ({
      section:     r[0],
      nom:         r[1],
      image:       r[2],
      description: r[3],
      prix:        (typeof r[4] === 'number') ? r[4].toString().replace('.', ',') : (r[4] || ""),
      tailles:     r[5] || "",
      code:        r[6] || "",
      pub:         r[7] || "", // Colonne H - contenu de la pub
      pubInterval: isNaN(r[8]) ? 25000 : r[8] * 1000 // Colonne I - intervalle en secondes
    }));
  } catch (err) {
    throw new Error("Erreur getData: " + err.message);
  }
//}