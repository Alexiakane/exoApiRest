import db from '../config/database.js';

const insertData = () => {
  const nationalites = [
    [1, "France"],
    [2, "États-Unis"],
    [3, "Royaume-Uni"],
    [4, "Autriche"]
  ];

  nationalites.forEach(nation => {
    db.run(
      `INSERT OR IGNORE INTO Nationalite (ID_Nationalite, Pays) VALUES (?, ?)`,
    nation,
    function (err) {
      if (err) {
        console.error("Erreur d'insertion Nationalité :", err.message);
      } else {
        console.log(`Nationalité ajouté avec ID ${this.lastID}`);
      }
    }
    );
  });

  const auteurs = [
    [1, 'Hugo', 'Victor', '1802-02-26'],
    [2, 'Orwell', 'George', '1903-06-25'],
    [3, 'Rowling', 'J.K.', '1965-07-31'],
    [4, 'Camus', 'Albert', '1913-11-07'],
    [5, 'Christie', 'Agatha', '1890-09-15'],
    [6, 'Hemingway', 'Ernest', '1899-07-21'],
    [7, 'Zweig', 'Stefan', '1881-11-28']
  ];

  auteurs.forEach(auteur => {
    db.run(
      `INSERT OR IGNORE INTO Auteur (ID_Auteur, Nom, Prenom, Date_Naissance) VALUES (?, ?, ?, ?)`,
    auteur,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Auteur :", err.message);
        } else {
          console.log(`Auteur ajouté avec ID ${this.lastID}`);
        }
      }
    );
  });

  const auteurNationalite = [
    [1, 1],
    [2, 3], 
    [3, 3],
    [4, 1],
    [5, 3],
    [6, 2],
    [7, 4]
  ];

  auteurNationalite.forEach( entry => {
    db.run(
      `INSERT OR IGNORE INTO Auteur_Nationalite (ID_Auteur, ID_Nationalite) VALUES (?,?)`,
    entry,
    function (err) {
      if (err) {
        console.error("Erreur d'insertion Auteur_Nationalité :", err.message);
      } else {
        console.log(`Relation Auteur_Nationalite ajoutée`);
      }
    }
    );
  });

  const categories = [
    [1, 'Roman', 'Romans classiques et modernes'],
    [2, 'Science-fiction', 'Livres de science-fiction et dystopie'],
    [3, 'Fantasy', 'Univers fantastiques et épopées magiques'],
    [4, 'Philosophie', 'Livres traitant de réflexions philosophiques et existentialistes'],
    [5, 'Policier', 'Romans centrés sur des enquêtes criminelles et des mystères'],
    [6, 'Biographie', 'Récits de vie de personnages célèbres et influents']
  ];

  categories.forEach( categorie => {
    db.run(
      `INSERT OR IGNORE INTO Categorie (ID_Categorie, Genre, Description) VALUES (?, ?, ?)`,
      categorie,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Categorie :", err.message);
        } else {
          console.log(`Categorie ajoutée avec ID ${this.lastID}`);
        }
      }
    );
  });

  const genres = [
    [1, "Roman"],
    [2, "Dystopie"],
    [3, "Fantasy"],
    [4, "Réflexions"],
    [5, "Enquêtes"],
    [6, "Récits de vie"]
  ];

  genres.forEach(genre => {
    db.run(
      `INSERT OR IGNORE INTO Genre (ID_Genre, Genre) VALUES (?, ?)`,
      genre,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Genre :", err.message);
        } else {
          console.log(`Genre ajoutée avec ID ${this.lastID}`);
        }
      }
    );
  });

  const categorieGenre = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6]
  ];

  categorieGenre.forEach(catGen => {
    db.run(
      `INSERT OR IGNORE INTO Categorie_Genre (ID_Categorie, ID_Genre) VALUES (?, ?)`,
      catGen,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Categorie_Genre :", err.message);
        } else {
          console.log(`Relation Categorie_Genre ajoutée`);
        }
      }
    );
  });

  const livres = [
    [1, "Les Misérables", "978-2-07-040499-9", 1862, 1232, 5, 1],
    [2, "1984", '978-0-452-28423-4', 1949, 328, 3, 2],
    [3, "Harry Potter à l''école des sorciers", "978-2-07-064302-8", 1997, 320, 7, 3],
    [4, "L'Étranger", '978-2-07-036002-3', 1942, 185, 5, 4],
    [5, 'Le Meurtre de Roger Ackroyd', '978-2-253-00587-2', 1926, 288, 3, 5],
    [6, 'Pour qui sonne le glas', '978-2-253-06761-0', 1940, 576, 4, 6],
    [7, "Le Joueur d'échecs", '978-2-266-17421-1', 1943, 144, 5, 6],
    [8, 'La Peste', '978-2-07-036042-9', 1947, 320, 6, 4],
    [9, 'Dix petits nègres', '978-2-253-00589-6', 1939, 256, 3, 5],
    [10, 'Paris est une fête', '978-2-253-01032-6', 1964, 240, 4, 6],
    [11, 'La Confusion des sentiments', '978-2-253-01323-5', 1927, 160, 6, 6],
    [12, 'Caligula', '978-2-07-041140-4', 1944, 192, 4, 4],
    [13, 'Mort sur le Nil', '978-2-253-00590-2', 1937, 384, 5, 5]
  ];

  livres.forEach(livre => {
    db.run(
      `INSERT OR IGNORE INTO Livre (ID_Livre, Titre, ISBN, Annee_Publication, Nb_Pages, Stock, ID_Categorie)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      livre,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Livre :", err.message);
        } else {
          console.log(`Livre ajouté avec ID ${this.lastID}`);
        }
      }
    );
  });

  const auteurLivre = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [4, 8],
    [5, 9],
    [6, 10],
    [7, 11],
    [4, 12],
    [5, 13]
  ];

  auteurLivre.forEach(ecrit => {
    db.run(
      `INSERT OR IGNORE INTO Auteur_Livre (ID_Auteur, ID_Livre) VALUES (?, ?)`,
      ecrit,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Auteur_Livre :", err.message);
        } else {
          console.log("Relation Auteur_Livre ajoutée !");
        }
      }
    );
  });

  const editeurs = [
    [1, "Gallimard"],
    [2, "Seuil"],
    [3, "Bloomsbury"],
    [4, "Fayard"],
    [5, "De la Table Ronde"],
    [6, "Librairie des Champs-Élysées"]
  ];

  editeurs.forEach(editeur => {
    db.run(
      `INSERT OR IGNORE INTO Editeur (ID_Editeur, Editeur) VALUES (?, ?)`,
      editeur,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Editeur :", err.message);
        } else {
          console.log(`Editeur ajouté avec ID ${this.lastID}`);
        }
      }
    );
  });

  const livreEditeur = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 1],
    [5, 4],
    [6, 2],
    [7, 5],
    [8, 1],
    [9, 6],
    [10, 1],
    [11, 2],
    [12, 1],
    [13, 6]
  ];

  livreEditeur.forEach( edit => {
    db.run(
      `INSERT OR IGNORE INTO Livre_Editeur (ID_Livre, ID_Editeur) VALUES (?, ?)`,
      edit,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Livre_Editeur :", err.message);
        } else {
          console.log("Relation Livre_Editeur ajoutée !");
        }
      }
    );
  });

  const membres = [
    [1, 'Dupont', 'Jean', '10 rue de Paris, 75001 Paris', 'jean.dupont@example.com', '2023-01-15'],
    [2, 'Martin', 'Sophie', '25 avenue des Champs, 75008 Paris', 'sophie.martin@example.com', '2023-03-10'],
    [3, 'Lefevre', 'Pierre', '5 boulevard Haussmann, 75009 Paris', 'pierre.lefevre@example.com', '2023-05-20']
  ];

  membres.forEach( membre => {
    db.run(
      `INSERT OR IGNORE INTO Membre (ID_Membre, Nom, Prenom, Adresse, Email, Date_Inscription) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      membre,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Membre :", err.message);
        } else {
          console.log(`Membre ajouté avec ID ${this.lastID}`);
        }
      }
    );
  });

  const emprunts = [
    [1, '2024-03-01', '2024-03-15', 'NULL', 1],
    [2, '2024-03-05', '2024-03-19', '2024-03-18', 2],
    [3, '2024-03-10', '2024-03-24', 'NULL', 3]
  ];

  emprunts.forEach( emprunt => {
    db.run(
      `INSERT OR IGNORE INTO Emprunt (ID_Emprunt, Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective, ID_Membre) VALUES (?, ?, ?, ?, ?)`,
      emprunt,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Emprunt :", err.message);
        } else {
          console.log(`Emprunt enregistré avec ID ${this.lastID}`);
        }
      }
    );
  });

  const exemplaires = [
    [1, 1, '2023-06-01', 1, 1],
    [2, 1, '2023-07-15', 2, 2],
    [3, 0, '2023-08-10', 3, 3]
  ];

  exemplaires.forEach( exemplaire => {
    db.run(
      `INSERT OR IGNORE INTO Exemplaire (ID_Exemplaire, Etat, Date_Acquisition, ID_Emprunt, ID_Livre) 
       VALUES (?, ?, ?, ?, ?)`,
      exemplaire,
      function (err) {
        if (err) {
          console.error("Erreur d'insertion Exemplaire :", err.message);
        } else {
          console.log("Exemplaire ajouté !");
        }
      }
    );
  })
};

insertData();
