import {auteurRepository } from '../repositories/auteurRepository.js';
import { Auteur } from '../models/Auteur.js';
import { logError } from '../utils/logger.js';

export const auteurService = {

  async getAllAuteurs() {
    return await auteurRepository.findAll();
  },

  async getAuteurById(id) {
    return await auteurRepository.find(id);
  },

  async createAuteur(auteurData) {
    // Création d'une instance à partir des données brutes
    let nouvelAuteur = new Auteur(
      null, // ID sera généré par la base de données
      auteurData.nom,
      auteurData.prenom,
      auteurData.dateNaissance,
    );

    // Validation via la méthode du modèle
    const validation = nouvelAuteur.estValide();
    if (!validation.valide) {
        const err = new Error(validation.erreur);
      logError(err);
      throw new Error(validation.erreur);
    }

    // Sauvegarde via repository
    return await auteurRepository.create(nouvelAuteur);
  },

  
  async updateAuteur(id, auteurData) {
    // Création d'une instance à partir des données brutes
    let modifAuteur = new Auteur(
      null, // ID sera généré par la base de données
      auteurData.nom,
      auteurData.prenom,
      auteurData.dateNaissance,
    );

    // Validation via la méthode du modèle
    const validation = modifAuteur.estValide();
    if (!validation.valide) {
        const err = new Error(validation.erreur);
      logError(err);
      throw new Error(validation.erreur);
    }

    // Sauvegarde via repository
    return await auteurRepository.update(id, modifAuteur);
  },

  async deleteAuteur(id) {
    await auteurRepository.delete(id);
  }
};
