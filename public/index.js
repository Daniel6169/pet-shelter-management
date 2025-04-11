
const pets = [];
let visiblePets = 9;
const blobId = 'be3e03d1-46c8-475d-ab9c-359075b82631';

async function fetchPets() {
    const res = await fetch(`/api/jsonBlob/${blobId}`);
    const data = await res.json();

    Object.entries(data).forEach(([key, pet]) => {
        if (typeof pet === 'object') {
            pet.id = pet.id || key;
            pets.push({
                id: pet.id,
                Name: pet.Name || pet.name,
                Type: pet.Type || pet.type,
                Age: pet.Age || pet.age,
                Sex: pet.Sex || pet.gender,
                Image: pet.Image || pet.image,
                Description: pet.short_description || ''
            });
        }
    });

    displayPets();
}

function displayPets() {
    const petContainer = document.getElementById("pet-container");
    petContainer.innerHTML = "";
    pets.slice(0, visiblePets).forEach(pet => {
        const petCard = document.createElement("div");
        petCard.classList.add("col-md-4", "mb-4");
        petCard.innerHTML = `
            <div class="card">
                <img src="${pet.Image}" alt="${pet.Name}" class="card-img-top">
                <div class="card-body">
                    <p><strong>Name:</strong> ${pet.Name}</p>
                    <p><strong>Type:</strong> ${pet.Type}</p>
                    <p><strong>Age:</strong> ${pet.Age}</p>
                    <p><strong>Sex:</strong> ${pet.Sex}</p>
                    <button class="btn btn-success" onclick="showDetails('${pet.id}')">More Info</button>
                    <button class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button>
                </div>
            </div>`;
        petContainer.appendChild(petCard);
    });
}

document.getElementById("loadContent").addEventListener("click", () => {
    visiblePets += 9;
    displayPets();
});

document.getElementById("addMore").addEventListener("click", () => {
    new bootstrap.Modal(document.getElementById("addPetModal")).show();
});

document.getElementById("add-pet-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newPet = {
        id: pets.length + 1,
        Name: document.getElementById("pet-name").value,
        Type: document.getElementById("pet-type").value,
        Age: document.getElementById("pet-age").value,
        Sex: document.getElementById("pet-sex").value,
        Image: document.getElementById("pet-image").value
    };
    pets.push(newPet);
    displayPets();
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById("addPetModal")).hide();
});

window.showDetails = function (id) {
    const pet = pets.find(p => p.id == id);
    if (pet) {
        document.getElementById("modal-title").innerText = pet.Name;
        document.getElementById("modal-body").innerHTML = `
            <img src="${pet.Image}" class="img-fluid mb-3">
            <p><strong>Type:</strong> ${pet.Type}</p>
            <p><strong>Age:</strong> ${pet.Age}</p>
            <p>${pet.Description}</p>`;
        new bootstrap.Modal(document.getElementById("petModal")).show();
    }
};

window.deletePet = function (id) {
    const index = pets.findIndex(p => p.id == id);
    if (index !== -1) {
        pets.splice(index, 1);
        displayPets();
    }
};

fetchPets();
