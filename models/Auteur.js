// models/Auteur.js
export class Auteur {
    constructor(id, nom, prenom, dateNaissance) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.dateNaissance = dateNaissance;
    }
  
    // Validation
    estValide() {
      if (!this.nom || this.nom.trim() === '') {
        return { valide: false, erreur: 'Le nom est requis' };
      }
  
     // if (this.dateNaissance && isNaN(this.dateNaissance)) {
       // return { valide: false, erreur: 'L\'année de naissance doit être un nombre' };
     // }
  
      return { valide: true };
    }
  
    // Méthodes métier
    /*estEmpruntable() {
      // Logique pour déterminer si le livre peut être emprunté
      return true;
    }*/
  }
  