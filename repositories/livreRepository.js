import db from '../config/database.js';
import { Livre } from '../models/Livre.js';

async function db_all(query, parms) {
  return new Promise(function (resolve, reject) {
    db.all(query, parms, function (err, rows) {
      if (err) { return reject(err); }
      resolve(rows);
    });
  });
}

async function db_run(query, parms) {
  return new Promise(function (resolve, reject) {
    db.run(query, parms, (err) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
}

export const livreRepository = {

  async findAll() {

    const query = `SELECT L.ID_Livre, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Stock, L.ID_Categorie FROM LIVRE L`;
    const rows = await db_all(query);

    // Transformation en instances de classe
    return await rows.map(row => new Livre(
      row.ID_Livre,
      row.Titre,
      row.ISBN,
      row.Annee_Publication,
      row.Nb_Pages,
      row.Stock,
      row.ID_Categorie
    ));

  },

  async find(id) {

    const query = `SELECT L.ID_Livre, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Stock, L.ID_Categorie FROM LIVRE L WHERE L.ID_Livre = ?`;
    const rows = await db_all(query, id);

    // Transformation en instances de classe
    return await rows.map(row => new Livre(
      row.ID_Livre,
      row.Titre,
      row.ISBN,
      row.Annee_Publication,
      row.Nb_Pages,
      row.Stock,
      row.ID_Categorie
    ));

  },

  async create(livre) {

    const query = `INSERT INTO LIVRE (Titre, ISBN, Annee_Publication, Nb_Pages, Stock, ID_Categorie) VALUES ( ?, ?, ?, ?, ?, ?)`;
    const parmLivre = [livre.titre, livre.isbn, livre.anneePublication, livre.nbPages, livre.stock, livre.categorieId];
    await db_run(query, parmLivre);

    const query2 = `SELECT MAX(L.ID_Livre) AS monID FROM LIVRE L`;
    const result = await db_all(query2);

    return await {
      id: result[0].ID_Livre
    };
  },

  async update(id, livre) {
    const query = `UPDATE LIVRE SET titre = ?, isbn = ?, Annee_Publication = ?, Nb_Pages = ?, Stock = ?, ID_Categorie =? WHERE ID_Livre = ?`;
    const parmLivre = [livre.titre, livre.isbn, livre.anneePublication, livre.nbPages, livre.stock, livre.categorieId];
    await db_run(query, parmLivre);

    return await livreRepository.find(id);
  },

  async delete(id) {
    const query = `DELETE FROM LIVRE WHERE ID_Livre = ?`;
    await db_all(query, id);
  },

  async findAllByCategorie(id) {
    const query = `SELECT L.ID_Livre, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Stock, L.ID_Categorie FROM LIVRE L JOIN CATEGORIE C ON L.ID_Categorie = C.ID_Categorie WHERE C.Genre = 'Biographie'`;
    const rows = await db_all(query, id);

    // Transformation en instances de classe
    return await rows.map(row => new Livre(
      row.ID_Livre,
      row.Titre,
      row.ISBN,
      row.Annee_Publication,
      row.Nb_Pages,
      row.Stock,
      row.ID_Categorie
    ));
  },

  async findAllByAuteur(id) {
    const query = `SELECT L.ID_Livre, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Stock, L.ID_Categorie FROM LIVRE L JOIN Auteur_Livre AL ON L.ID_Livre = AL.ID_Livre JOIN AUTEUR A ON AL.ID_Auteur = A.ID_Auteur WHERE A.Nom = 'Camus'`;
    const rows = await db_all(query, id);

    // Transformation en instances de classe
    return await rows.map(row => new Livre(
      row.ID_Livre,
      row.Titre,
      row.ISBN,
      row.Annee_Publication,
      row.Nb_Pages,
      row.Stock,
      row.ID_Categorie
    ));
  },

  async findPagination() {
    const query = `SELECT L.ID_Livre, L.Titre, L.ISBN, L.Annee_Publication, L.Nb_Pages, L.Stock, L.ID_Categorie FROM LIVRE L LIMIT 10`;
    const rows = await db_all(query);

    // Transformation en instances de classe
    return await rows.map(row => new Livre(
      row.ID_Livre,
      row.Titre,
      row.ISBN,
      row.Annee_Publication,
      row.Nb_Pages,
      row.Stock,
      row.ID_Categorie
    ));
  }
};




