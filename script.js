const SHEET_NAME = "Produits";
const ADMIN_EMAIL = "rubmaxben@gmail.com";

fetch('https://script.google.com/macros/s/TON_DEPLOYMENT_ID/exec?page=api')
  .then(res => res.json())
  .then(displayProduits);
  
  
  return HtmlService
    .createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getData() {
  try {
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
}

function saveData(data) {
  try {
    if (!Array.isArray(data)) throw new Error("Données invalides");
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.clearContents();
    sheet.appendRow(["Section", "Nom", "Image", "Description", "Prix", "Tailles", "Code", "Pub", "Intervalle"]);
    
    data.forEach(item => {
      if (
        typeof item.section !== "string" ||
        typeof item.nom !== "string" ||
        typeof item.image !== "string" ||
        typeof item.description !== "string" ||
        (typeof item.prix !== "string" && typeof item.prix !== "number") ||
        typeof item.tailles !== "string" ||
        typeof item.code !== "string" ||
        typeof item.pub !== "string"
      ) throw new Error("Format d'article invalide");
      
      const prixValue = typeof item.prix === 'number' 
        ? item.prix.toString().replace('.', ',') 
        : item.prix;
      
      sheet.appendRow([
        item.section,
        item.nom,
        item.image,
        item.description,
        prixValue,
        item.tailles,
        item.code,
        item.pub,
        item.pubInterval / 1000 // Convertir en secondes pour le sheet
      ]);
    });
    return { success: true };
  } catch (err) {
    throw new Error("Erreur saveData: " + err.message);
  }
}
