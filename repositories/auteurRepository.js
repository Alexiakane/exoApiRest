import db from '../config/database.js';
import { Auteur } from '../models/Auteur.js';

async function db_all(query, parms){
    return new Promise(function(resolve,reject){
        db.all(query, parms, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

async function db_run(query, parms){
    return new Promise(function(resolve,reject){
        db.run(query, parms, (err) => {
           if(err){return reject(err);}
           resolve();
         });
    });
}

export const auteurRepository = {

   async findAll() {
    
    const query = `SELECT A.ID_Auteur, A.Nom, A.Prenom, A.Date_Naissance FROM AUTEUR A`;
    const rows = await db_all(query);

    // Transformation en instances de classe
    return await rows.map(row => new Auteur(
        row.ID_Auteur,
        row.Nom,
        row.Prenom,
        row.Date_Naissance
    ));

  },

  async find(id) {
    
    const query = `SELECT A.ID_Auteur, A.Nom, A.Prenom, A.Date_Naissance FROM AUTEUR A WHERE A.ID_Auteur = ?`;
    const rows = await db_all(query, id);

    // Transformation en instances de classe
    return await rows.map(row => new Auteur(
        row.ID_Auteur,
        row.Nom,
        row.Prenom,
        row.Date_Naissance
    ));

  },

  async create(auteur) {

    const query = `INSERT INTO AUTEUR (Nom, Prenom, Date_Naissance) VALUES ( ?, ?, ?)`;
    const parmAuteur = [auteur.nom, auteur.prenom, auteur.dateNaissance];
    await db_run(query, parmAuteur);

    const query2 = `SELECT MAX(A.ID_Auteur) AS monID FROM AUTEUR A`;
    const result = await db_all(query2);

    return await {
      id: result[0].monID
    };
  },

  async update(id, auteur) {
    const query = `UPDATE AUTEUR SET nom = ?, prenom = ?, Date_Naissance = ? WHERE ID_Auteur = ?`;
    const parmAuteur = [auteur.nom, auteur.prenom, auteur.dateNaissance, id];
    await db_run(query, parmAuteur);

    return await auteurRepository.find(id);
  },

  async delete(id) {
    const query = `DELETE FROM AUTEUR WHERE ID_Auteur = ?`;
    await db_all(query, id);
  }
};