import { livreController } from '../controllers/livreController.js';
import { auteurController } from '../controllers/auteurController.js';
import { empruntController } from '../controllers/empruntController.js';
import { logError } from '../utils/logger.js';

// Classes gestion des routes ou endpoints
export const routes = async (req, res) => {
  const url = req.url;
  const method = req.method;

  // Routes pour les livres 
  if (url === '/api/livres' && method === 'GET') { // liste les livres
    await livreController.getAllLivres(req, res);
  }
  else if (url === '/api/livres' && method === 'POST') { // crée un livre
    await livreController.createLivre(req, res);
  }
  else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'GET') { // affiche le livre id donné
    const id = url.split('/')[3];
    livreController.getLivreById(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'PUT') { // mise à jour du livre id donné
    const id = url.split('/')[3];
    livreController.updateLivre(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'DELETE') { // supprime le livre id donné
    const id = url.split('/')[3];
    livreController.deleteLivre(req, res, parseInt(id));
  }
  else if (url === '/api/livres?categorie=6' && method === 'GET') {
    await livreController.getAllLivresByCategorie(req, res);
  }
  else if (url === '/api/livres?auteur=4' && method === 'GET') {
    await livreController.getAllLivresByAuteur(req, res);
  }
  else if (url === '/api/livres?page=1&limit=10' && method === 'GET'){
    await livreController.getLivresPagination(req, res);
  }
  
  // Routes pour les auteurs (à implémenter)
  else if (url === '/api/auteurs' && method === 'GET') {
    await auteurController.getAllAuteurs(req, res);
  }
  else if (url === '/api/auteurs' && method === 'POST') { // crée un auteur
    await auteurController.createAuteur(req, res);
  }
  else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'GET') { // affiche l'auteur id donné
    const id = url.split('/')[3];
    auteurController.getAuteurById(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'PUT') { // mise à jour de l'auteur id donné
    const id = url.split('/')[3];
    auteurController.updateAuteur(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'DELETE') { // supprime l'auteur id donné
    const id = url.split('/')[3];
    auteurController.deleteAuteur(req, res, parseInt(id));
  }

  // Routes pour les emprunts (à implémenter)
  else if (url === '/api/emprunts' && method === 'GET') {
   await empruntController.getAllEmprunts(req, res);
  }
  else if (url === '/api/emprunts' && method === 'POST') { // crée un emprunts
    await empruntController.createEmprunt(req, res);
  }
  else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === 'GET') { // affiche l'emprunt id donné
    const id = url.split('/')[3];
    empruntController.getEmpruntById(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === 'PUT') { // mise à jour de l'emprunt id donné
    const id = url.split('/')[3];
    empruntController.updateEmprunt(req, res, parseInt(id));
  }
  else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === 'DELETE') { // supprime l'emprunt id donné
    const id = url.split('/')[3];
    empruntController.deleteEmprunt(req, res, parseInt(id));
  }

  // Route non trouvée
  else {
    const err = new Error(`Route non trouvée: ${method} ${url}`);
    logError(err);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Route non trouvée' }));
  }
};
