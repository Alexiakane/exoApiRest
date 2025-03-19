import { livreService } from '../services/livreService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';

// classe controleur du Livre
export const livreController = {
  /**
   * Récupère tous les livres
   */
  async getAllLivres(req, res) {
    try {
      const livres = await livreService.getAllLivres();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livres }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

  /**
   * Crée un nouveau livre
   */
  async createLivre(req, res) {
    try {
      const livreData = await parseRequestBody(req);

      const result = await livreService.createLivre(livreData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Livre créé avec succès',
        data: { id: result.id }
      }));
    } catch (error) {
      logError(error);
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  async getLivreById(req, res, id) {
    try {
      const livre = await livreService.getLivreById(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livre }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

  async updateLivre(req, res, id) {
    try {
      const livreData = await parseRequestBody(req);
      const result = await livreService.updateLivre(id, livreData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Livre modifié avec succès',
        data: { result }
      }));
    } catch (error) {
      logError(error);
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  async deleteLivre(req, res, id) {
    try {
      await livreService.deleteLivre(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: "Livre supprimé avec succès" }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

  async getAllLivresByCategorie(req, res, id) {
    try {
      const livresByCategorie = await livreService.getAllLivresByCategorie(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livresByCategorie }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

  async getAllLivresByAuteur(req, res, id) {
    try {
      const livresByAuteur = await livreService.getAllLivresByAuteur(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livresByAuteur }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

  async getLivresPagination(req, res) {
    try {
      const livresPagination = await livreService.getLivresPagination();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: livresPagination }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  }
};