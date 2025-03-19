import { empruntRepository } from '../repositories/empruntRepository.js';


test("findAll cherche tous les emprunts", async () => {
    const monEmprunt = {"dateEmprunt": "2024-03-01", "dateRetourPrevue": "2024-03-15", "dateRetourEffective": "NULL", "Id": "1"};
    const findAll = await empruntRepository.findAll();
    expect(findAll).toBeDefined();
    expect(findAll).toContainEqual(monEmprunt);
})


test("find cherche le emprunt par ID", async () => {
    const monEmprunt2 = {"dateEmprunt":"2024-03-05", "dateRetourEffective": undefined, "dateRetourPrevue": "2024-03-19", "id": 2, "membreId": 2};
    const find = await empruntRepository.find(2);
    expect(find).toBeDefined();
    expect(find).toContainEqual(monEmprunt2);
})

test("create créé un emprunt", async () => {
    jest.spyOn(empruntRepository, "create");
    const empruntTest = new Emprunt(
          null, // ID sera généré par la base de données
          "2025-03-13",
          "2025-03-20",
          "NULL",
          "1",
        );
    const create = await empruntRepository.create(empruntTest);
    expect(create).toBeDefined();
    expect(empruntRepository.create).toHaveBeenCalled();
})

test("update met à jour un emprunt", async ()=> {
    const updateEmpruntTest = new Emprunt(
        null, // ID sera généré par la base de données
        "2025-03-13",
        "2025-03-20",
        "2025-03-19",
        "1",
      );
    const update = await empruntRepository.update(1,updateEmpruntTest);
    expect(update).toBeDefined();
})

test("delete supprime un emprunt", async ()=> {
    jest.spyOn(empruntRepository, "delete");
    await empruntRepository.delete(3);
    expect (empruntRepository.delete).toHaveBeenCalled();
})