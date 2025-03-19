import db from '../config/database.js';
import { Emprunt } from '../models/Emprunt.js';

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

export const empruntRepository = {

  async findAll() {

    const query = `SELECT E.ID_Emprunt, E.Date_Emprunt, E.Date_Retour_Prevue, E.Date_Retour_Effective, E.iD_Membre FROM EMPRUNT E`;
    const rows = await db_all(query);

    // Transformation en instances de classe
    return await rows.map(row => new Emprunt(
      row.ID_Emprunt,
      row.Date_Emprunt,
      row.Date_Retour_Prevue,
      row.Date_Retour_Effective,
      row.ID_Membre
    ));

  },

  async find(id) {

    const query = `SELECT E.ID_Emprunt, E.Date_Emprunt, E.Date_Retour_Prevue, E.Date_Retour_Effective, E.ID_Membre FROM EMPRUNT E WHERE E.ID_Emprunt = ?`;
    const rows = await db_all(query, id);

    // Transformation en instances de classe
    return await rows.map(row => new Emprunt(
      row.ID_Emprunt,
      row.Date_Emprunt,
      row.Date_Retour_Prevue,
      row.DAte_Retour_Effective,
      row.ID_Membre
    ));
  },

  async create(emprunt) {

    const query = `INSERT INTO EMPRUNT (Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective, ID_Membre) VALUES ( ?, ?, ?, ?)`;
    const parmEmprunt = [emprunt.dateEmprunt, emprunt.dateRetourPrevue, emprunt.dateRetourEffective, emprunt.membreId];
    await db_run(query, parmEmprunt);

    const query2 = `SELECT MAX(E.ID_Emprunt) AS monEmprunt FROM EMPRUNT E`;
    const result = await db_all(query2);

    return await {
      id: result[0].monEmprunt
    };
  },

  async update(id, emprunt) {
    const query = `UPDATE EMPRUNT SET Date_Emprunt = ?, Date_Retour_Prevue = ?, Date_Retour_Effective = ?, ID_Membre =? WHERE ID_Emprunt = ?`;
    const parmEmprunt = [emprunt.dateEmprunt, emprunt.dateRetourPrevue, emprunt.dateRetourEffective, emprunt.membreId];
    await db_run(query, parmEmprunt);

    return await empruntRepository.find(id);
  },

  async delete(id) {
    const query = `DELETE FROM EMPRUNT WHERE ID_Emprunt = ?`;
    await db_all(query, id);
  }
};