import { auteurRepository } from '../repositories/auteurRepository.js';


test("findAll cherche tous les auteurs", async () => {
    const monAuteur = {"nom": "Hugo", "id": 1, "prenom": "Victor", "dateNaissance":"1802-02-26"};
    const findAll = await auteurRepository.findAll();
    expect(findAll).toBeDefined();
    expect(findAll).toContainEqual(monAuteur);
})


test("find cherche l'auteur par ID", async () => {
    const monAuteur2 = {"nom": "Hugo", "id": 1, "prenom": "Victor", "dateNaissance":"1802-02-26"};
    const find = await auteurRepository.find(1);
    expect(find).toBeDefined();
    expect(find).toContainEqual(monAuteur2);
})

test("create créé un auteur", async () => {
    jest.spyOn(auteurRepository, "create");
    const auteurTest = new Auteur(
        null, // ID sera généré par la base de données
        "Alex",
        "Nassim",
        "2025-03-19"
        );

    const create = await auteurRepository.create(auteurTest);
    expect(create).toBeDefined();
    expect(auteurRepository.create).toHaveBeenCalled();
})

test("update met à jour un auteur", async ()=> {
    const updateAuteurTest = new Auteur(
        null, // ID sera généré par la base de données
        "Alex",
        "Nassou",
        "2025-03-19"
        );
    const update = await auteurRepository.update(2, updateAuteurTest);
    expect(update).toBeDefined();
})

test("delete supprime un auteur", async ()=> {
    jest.spyOn(auteurRepository, "delete");
    await auteurRepository.delete(9);
    expect(auteurRepository.delete).toHaveBeenCalled();

})
