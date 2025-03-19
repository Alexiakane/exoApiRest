// models/Emprunt.js
export class Emprunt {
    constructor(id, dateEmprunt, dateRetourPrevue, dateRetourEffective, membreId) {
      this.id = id;
      this.dateEmprunt = dateEmprunt;
      this.dateRetourPrevue = dateRetourPrevue;
      this.dateRetourEffective = dateRetourEffective;
      this.membreId = membreId;
    }
  
    // Validation
    estValide() {
      if (!this.dateEmprunt || this.dateEmprunt.trim() === '') {
        return { valide: false, erreur: 'La date d\'emprunt est requise' };
      }
  
      //if (this.dateEmprunt && isNaN(this.dateEmprunt)) {
       // return { valide: false, erreur: 'L\'année doit être un nombre' };
     // }
  
      return { valide: true };
    }
  
    // Méthodes métier
    /*estEmpruntable() {
      // Logique pour déterminer si le livre peut être emprunté
      return true;
    }*/
  }
  