import sqlite3 from "sqlite3";

// Activer le mode verbose pour le débogage
sqlite3.verbose();

// Connexion à la base SQLite (créera "bibliotheque.db" si elle n'existe pas)
const db = new sqlite3.Database("bibliotheque.db", (err) => {
  if (err) {
    console.error("Erreur de connexion à la base :", err.message);
  } else {
    console.log("Connexion réussie à SQLite !");
  }
});

// Création des tables
db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS Livre (
    ID_Livre INTEGER PRIMARY KEY,
    Titre TEXT NOT NULL,
    ISBN TEXT UNIQUE,
    Annee_Publication INTEGER,
    Nb_Pages INTEGER,
    Stock INTEGER,
    ID_Categorie INTEGER NOT NULL,
    FOREIGN KEY (ID_Categorie) REFERENCES Categorie(ID_Categorie)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Auteur (
    ID_Auteur INTEGER PRIMARY KEY,
    Nom TEXT NOT NULL,
    Prenom TEXT NOT NULL,
    Date_Naissance DATE
)`);

  db.run(`CREATE TABLE IF NOT EXISTS Auteur_Livre (
    ID_Auteur INTEGER NOT NULL,
    ID_Livre INTEGER NOT NULL,
    PRIMARY KEY (ID_Auteur, ID_Livre),
    FOREIGN KEY (ID_Auteur) REFERENCES Auteur(ID_Auteur),
    FOREIGN KEY (ID_Livre) REFERENCES Livre(ID_Livre)
)`);


db.run(`CREATE TABLE IF NOT EXISTS Nationalite (
    ID_Nationalite INTEGER PRIMARY KEY,
    Pays TEXT
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Membre (
    ID_Membre INTEGER PRIMARY KEY,
    Nom TEXT NOT NULL,
    Prenom TEXT NOT NULL,
    Adresse TEXT NOT NULL,
    Email TEXT UNIQUE,
    Date_Inscription DATE
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Emprunt (
    ID_Emprunt INTEGER PRIMARY KEY,
    Date_Emprunt DATE DEFAULT CURRENT_DATE,
    Date_Retour_Prevue DATE NOT NULL,
    Date_Retour_Effective DATE,
    ID_Membre INTEGER NOT NULL,
    FOREIGN KEY (ID_Membre) REFERENCES Membre(ID_Membre)
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Livre_Editeur (
    ID_Livre INTEGER NOT NULL,
    ID_Editeur INTEGER NOT NULL,
    PRIMARY KEY (ID_Editeur, ID_Livre),
    FOREIGN KEY (ID_Livre) REFERENCES Livre(ID_Livre),
    FOREIGN KEY (ID_Editeur) REFERENCES Editeur(ID_Editeur)
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Editeur (
    ID_Editeur INTEGER PRIMARY KEY,
    Editeur TEXT
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Categorie (
    ID_Categorie INTEGER PRIMARY KEY,
    Genre TEXT NOT NULL,
    Description TEXT
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Categorie_Genre (
    ID_Categorie INTEGER NOT NULL,
    ID_Genre INTEGER NOT NULL,
    PRIMARY KEY (ID_Categorie, ID_Genre),
    FOREIGN KEY (ID_Categorie) REFERENCES Categorie(ID_Categorie),
    FOREIGN KEY (ID_Genre) REFERENCES Genre(ID_Genre)
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Genre (
    ID_Genre INTEGER PRIMARY KEY,
    Genre TEXT NOT NULL
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Exemplaire (
    ID_Exemplaire INTEGER PRIMARY KEY,
    Etat BOOLEAN NOT NULL,
    Date_Acquisition DATE NOT NULL,
    ID_Emprunt INTEGER NOT NULL,
    ID_Livre INTEGER NOT NULL,
    FOREIGN KEY (ID_Livre) REFERENCES Livre(ID_Livre),
    FOREIGN KEY (ID_Emprunt) REFERENCES Emprunt(ID_Emprunt)
)`);

 db.run(`CREATE TABLE IF NOT EXISTS Auteur_Nationalite (
    ID_Auteur INTEGER NOT NULL,
    ID_Nationalite INTEGER,
    PRIMARY KEY (ID_Auteur, ID_Nationalite),
    FOREIGN KEY (ID_Auteur) REFERENCES Auteur(ID_Auteur),
    FOREIGN KEY (ID_Nationalite) REFERENCES Nationalite(ID_Nationalite)
)`);


db.run(`CREATE INDEX IF NOT EXISTS Livre_index_0 ON Livre (ID_Categorie)`);
db.run(`CREATE INDEX IF NOT EXISTS Membre_index_1 ON Membre (Nom)`);
db.run(`CREATE INDEX IF NOT EXISTS Emprunt_index_2 ON Emprunt (ID_Membre)`);
db.run(`CREATE INDEX IF NOT EXISTS Exemplaire_index_3 ON Exemplaire (ID_Emprunt)`);
db.run(`CREATE INDEX IF NOT EXISTS Exemplaire_index_4 ON Exemplaire (ID_Livre)`);


  console.log("Tables créées !");
});

// Exporter la connexion pour l'utiliser ailleurs
export default db;







