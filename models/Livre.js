// models/Livre.js
export class Livre {
    constructor(id, titre, isbn, anneePublication, nbPages, stock, categorieId) {
      this.id = id;
      this.titre = titre;
      this.isbn = isbn;
      this.anneePublication = anneePublication;
      this.nbPages = nbPages;
      this.stock = stock;
      this.categorieId = categorieId;
    }
  
    // Validation
    estValide() {
      if (!this.titre || this.titre.trim() === '') {
        return { valide: false, erreur: 'Le titre est requis' };
      }
  
      if (this.anneePublication && isNaN(this.anneePublication)) {
        return { valide: false, erreur: 'L\'année doit être un nombre' };
      }
  
      return { valide: true };
    }
  
    // Méthodes métier
    estEmpruntable() {
      // Logique pour déterminer si le livre peut être emprunté
      return true;
    }
  }
  