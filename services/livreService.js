import { livreRepository } from '../repositories/livreRepository.js';
import { Livre } from '../models/Livre.js';
import { logError } from '../utils/logger.js';

export const livreService = {

  async getAllLivres() {
    return await livreRepository.findAll();
  },

  async getLivreById(id) {
    return await livreRepository.find(id);
  },

  async createLivre(livreData) {
    // Création d'une instance à partir des données brutes
    let nouveauLivre = new Livre(
      null, // ID sera généré par la base de données
      livreData.titre,
      livreData.isbn || null,
      livreData.anneePublication || null,
      livreData.nbPages || null,
      livreData.stock || null,
      livreData.categorieId || null
    );

    // Validation via la méthode du modèle
    const validation = nouveauLivre.estValide();
    if (!validation.valide) {
      const err = new Error(validation.erreur);
      logError(err);
      throw new Error(validation.erreur);
    }

    // Sauvegarde via repository
    return await livreRepository.create(nouveauLivre);
  },

  async updateLivre(id, livreData) {
    // Création d'une instance à partir des données brutes
    let modifLivre = new Livre(
      null, // ID sera généré par la base de données
      livreData.titre,
      livreData.isbn || null,
      livreData.anneePublication || null,
      livreData.nbPages || null,
      livreData.stock || null,
      livreData.categorieId || null
    );

    // Validation via la méthode du modèle
    const validation = modifLivre.estValide();
    if (!validation.valide) {
      const err = new Error(validation.erreur);
      logError(err);
      throw new Error(validation.erreur);
    }

    // Sauvegarde via repository
    return await auteurRepository.update(id, modifAuteur);
  },

  async deleteLivre(id) {
    await livreRepository.delete(id);
  },

  async getAllLivresByCategorie(id) {
    return await livreRepository.findAllByCategorie(id);
  },

  async getAllLivresByAuteur(id) {
    return await livreRepository.findAllByAuteur(id);
  },

  
  async getLivresPagination() {
    return await livreRepository.findPagination();
  },
};
