import { livreRepository } from '../repositories/livreRepository.js';
import { Livre } from '../models/Livre.js';


test("findAll cherche tous les livres", async () => {
    const monLivre = {"anneePublication": 1862, "categorieId": 1, "id": 1, "isbn": "978-2-07-040499-9", "nbPages": 1232, "stock": 5, "titre": "Les Misérables"};
    const findAll = await livreRepository.findAll();
    expect(findAll).toBeDefined();
    expect(findAll).toContainEqual(monLivre);
})


test("find cherche le livre par ID", async () => {
    const monLivre2 = {"anneePublication": 1949, "categorieId": 2, "id": 2, "isbn": "978-0-452-28423-4", "nbPages": 328, "stock": 3, "titre": "1984"};
    const find = await livreRepository.find(2);
    expect(find).toBeDefined();
    expect(find).toContainEqual(monLivre2);
})

test("create créé un livre", async () => {
    jest.spyOn(livreRepository,"create");
    const livreTest = new Livre(
          null, // ID sera généré par la base de données
          "Mon livre Test",
           "1234-4567",
          "2025-03-18",
          1984,
          1,
          3
        );
    
    const created = await livreRepository.create(livreTest);
    expect(created).toBeDefined();
    expect(livreRepository.create).toHaveBeenCalled();
})

test("update met à jour un livre", async ()=> {
    const updateLivreTest = new Livre(
        null, // ID sera généré par la base de données
        "Mon livre Test",
         "1234-4567",
        "2025-03-18",
        1984,
        1,
        3
      );
    const update = await livreRepository.update(13,updateLivreTest);
    expect(update).toBeDefined();
})

test("delete supprime un livre", async ()=> {
    jest.spyOn(livreRepository,"delete");
    await livreRepository.delete(14);
    expect(livreRepository.delete).toHaveBeenCalled();
})

test("findAllByCategorie trouve un livre par categorie", async ()=> {
    const findByCategorie = await livreRepository.findAllByCategorie();
    expect (findByCategorie).toBeDefined();
})

test("findAllByAuteur trouve un livre par auteur", async ()=> {
    const findByAuteur = await livreRepository.findAllByAuteur();
    expect (findByAuteur).toBeDefined();
})

test("findPagination trouve les 10 premiers livre", async ()=> {
    const findPagination = await livreRepository.findPagination();
    expect (findPagination).toBeDefined();
})
