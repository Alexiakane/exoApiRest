import { auteurService } from '../services/auteurService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';

// classe controleur de l'auteur
export const auteurController = {
  /**
   * Récupère tous les auteurs
   */
  async getAllAuteurs(req, res) {
    try {
      const auteurs = await auteurService.getAllAuteurs();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: auteurs }));
    } catch (error) {
        logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

  async getAuteurById(req, res, id) {
    try {
      const auteur = await auteurService.getAuteurById(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: auteur }));
    } catch (error) {
        logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },
  /**
   * Crée un nouvel auteur
   */
  async createAuteur(req, res) {
    try {
      const auteurData = await parseRequestBody(req);

      const result = await auteurService.createAuteur(auteurData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Auteur créé avec succès',
        data: { id: result.id }
      }));
    } catch (error) {
        logError(error);
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  async updateAuteur(req, res, id) {
    try {
      const auteurData = await parseRequestBody(req);
      const result = await auteurService.updateAuteur(id, auteurData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Auteur modifié avec succès',
        data: {result}
      }));
    } catch (error) {
        logError(error);
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  async deleteAuteur(req, res, id) {
    try {
      await auteurService.deleteAuteur(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: "Auteur supprimé avec succès"}));
    } catch (error) {
        logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  }
};