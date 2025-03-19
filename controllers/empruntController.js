import { empruntService } from '../services/empruntService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';

// classe controleur de l'emprunt
export const empruntController = {
  /**
   * Récupère tous les emprunts
   */
  async getAllEmprunts(req, res) {
    try {
      const emprunts = await empruntService.getAllEmprunts();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: emprunts }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },

  async getEmpruntById(req, res, id) {
    try {
      const emprunt = await empruntService.getEmpruntById(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: emprunt }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  },


  /**
   * Crée un nouvel emprunt
   */
  async createEmprunt(req, res) {
    try {
      const empruntData = await parseRequestBody(req);

      const result = await empruntService.createEmprunt(empruntData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Emprunt créé avec succès',
        data: { id: result.id }
      }));
    } catch (error) {
      logError(error);
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  async updateEmprunt(req, res, id) {
    try {
      const empruntData = await parseRequestBody(req);
      const result = await empruntService.updateEmprunt(id, empruntData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Emprunt modifié avec succès',
        data: { result }
      }));
    } catch (error) {
      logError(error);
      const statusCode = error.message.includes('requis') ? 400 : 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  },

  async deleteEmprunt(req, res, id) {
    try {
      await empruntService.deleteEmprunt(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: "Emprunt supprimé avec succès" }));
    } catch (error) {
      logError(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Erreur serveur' }));
    }
  }
};




