import { empruntRepository } from '../repositories/empruntRepository.js';
import { Emprunt } from '../models/Emprunt.js';
import { logError } from '../utils/logger.js';

export const empruntService = {

  async getAllEmprunts() {
    return await empruntRepository.findAll();
  },
  async getEmpruntById(id) {
    return await empruntRepository.find(id);
  },

  async createEmprunt(empruntData) {
    // Création d'une instance à partir des données brutes
    let nouvelEmprunt = new Emprunt(
      null, // ID sera généré par la base de données
      empruntData.dateEmprunt,
      empruntData.dateRetourPrevue,
      empruntData.dateRetourEffective,
      empruntData.membreId,
    );

    // Validation via la méthode du modèle
    const validation = nouvelEmprunt.estValide();
    if (!validation.valide) {
      const err = new Error(validation.erreur);
      logError(err);
      throw new Error(validation.erreur);
    }

    // Sauvegarde via repository
    return await empruntRepository.create(nouvelEmprunt);
  },

  async updateEmprunt(id, empruntData) {
    // Création d'une instance à partir des données brutes
    let modifEmprunt = new Emprunt(
      null, // ID sera généré par la base de données
      empruntData.dateEmprunt,
      empruntData.dateRetourPrevue,
      empruntData.dateRetourEffective,
      empruntData.membreId,
    );

    // Validation via la méthode du modèle
    const validation = modifEmprunt.estValide();
    if (!validation.valide) {
      const err = new Error(validation.erreur);
      logError(err);
      throw new Error(validation.erreur);
    }

    // Sauvegarde via repository
    return await empruntRepository.update(id, modifEmprunt);
  },

  async deleteEmprunt(id) {
    await empruntRepository.delete(id);
  }
};