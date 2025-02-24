
var pets = [
    {id: 1, Name: 'Bella', Type: 'Dog', Image: 'ShelterImages/Labrador-retriever.jpg', Age: '3 Years', Sex: 'Female', Breed: 'Labrador Retriever', Color: 'Yellow', Size: 'Medium', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: true},
    {id: 2, Name: 'Rocky', Type: 'Dog', Image: 'ShelterImages/siberian-husky.jpg', Age: '5 Years', Sex: 'Male', Breed: 'Siberian Husky', Color: 'Grey and White', Size: 'Large', AdoptionStatus: 'Adopted', Vaccinated: true, Microchipped: true},
    {id: 3, Name: 'Coco', Type: 'Dog', Image: 'ShelterImages/french-bulldog.jpg', Age: '2 Years', Sex: 'Female', Breed: 'French Bulldog', Color: 'Brindle', Size: 'Small', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: false},
    {id: 4, Name: 'Max', Type: 'Dog', Image: 'ShelterImages/german-shepherd.jpg', Age: '4 Years', Sex: 'Female', Breed: 'German Shepherd', Color: 'Black and Tan', Size: 'Large', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: true},
    {id: 5, Name: 'Daisy', Type: 'Dog', Image: 'ShelterImages/golden-retriever.jpg', Age: '2 Years', Sex: 'Female', Breed: 'Golden Retriever', Color: 'Golden', Size: 'Medium', AdoptionStatus: 'Adopted', Vaccinated: true, Microchipped: false},
    {id: 6, Name: 'Bruno', Type: 'Dog', Image: 'ShelterImages/rottweiler.jpg', Age: '6 Years', Sex: 'Male', Breed: 'Rottweiler', Color: 'Black and Tan', Size: 'Large', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: true},
    {id: 7, Name: 'Luna', Type: 'Dog', Image: 'ShelterImages/poodle.jpg', Age: '3 Years', Sex: 'Female', Breed: 'Poodle', Color: 'White', Size: 'Medium', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: true},
    {id: 8, Name: 'Buddy', Type: 'Dog', Image: 'ShelterImages/beagle.jpg', Age: '4 Years', Sex: 'Male', Breed: 'Beagle', Color: 'Tri-color', Size: 'Medium', AdoptionStatus: 'Adopted', Vaccinated: true, Microchipped: true},
    {id: 9, Name: 'Sadie', Type: 'Dog', Image: 'ShelterImages/border-collie.jpg', Age: '5 Years', Sex: 'Female', Breed: 'Border Collie', Color: 'Black and White', Size: 'Medium', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: false},
    {id: 10, Name: 'Charlie', Type: 'Dog', Image: 'ShelterImages/pomeranian.jpg', Age: '1 Year', Sex: 'Male', Breed: 'Pomeranian', Color: 'Orange', Size: 'Small', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: true},
    {id: 11, Name: 'Oscar', Type: 'Dog', Image: 'ShelterImages/dachshund.jpg', Age: '6 Years', Sex: 'Male', Breed: 'Dachshund', Color: 'Brown', Size: 'Small', AdoptionStatus: 'Available', Vaccinated: true, Microchipped: false},
    {id: 12, Name: 'Molly', Type: 'Dog', Image: 'ShelterImages/cocker-spaniel.jpg', Age: '3 Years', Sex: 'Female', Breed: 'Cocker Spaniel', Color: 'Buff', Size: 'Medium', AdoptionStatus: 'Adopted', Vaccinated: true, Microchipped: true}
];

const petContainer = document.getElementById("pet-container");
const loadMoreBtn = document.getElementById("loadContent");
let visiblePets = 9;

function displayPets(){
    document.getElementById("pet-container").innerHTML = "";

    pets.slice(0, visiblePets).forEach(pet =>{
        const petCard = document.createElement("div");
        petCard.classList.add("col-md-4", "mb-4");
        petCard.innerHTML=`
        
                <div class="card">
                    <img src="${pet.Image}" alt="${pet.Name}">
                    <div class="petInfo">
                        <p><strong>Name:</strong>>${pet.Name}</a></p>
                        <p><strong>Type:</strong>${pet.Type}</p>
                        <p class="age"><strong>Age:</strong>${pet.Age}</p>
                        <p class="female"><strong>Sex:</strong>${pet.Sex}</p>
                    </div>
                    <button class="btn btn-success" onclick="showDetails(${pet.id})">More Info</button>
                    <button class="btn btn-danger" onclick="deletePet(${pet.id})">Delete</button>
                </div>
        
        `;
        petContainer.appendChild(petCard);
       
    });
}
loadMoreBtn.addEventListener("click", function(){
    visiblePets += 9;
    displayPets();
})
window.deletePet = function (id) {
    const index = pets.findIndex(p => p.id === id);
    if (index !== -1) {
        pets.splice(index, 1); 
        displayPets(); 
    }
};

window.showDetails = function (id) {
    const pet = pets.find(p => p.id === id);
    if (pet) {
        document.getElementById("modal-title").innerText = pet.Name;
        document.getElementById("modal-body").innerHTML = `
            <img src="${pet.Image}" class="img-fluid mb-3">
            <p><strong>Breed:</strong> ${pet.Type}</p>
            <p><strong>Age:</strong> ${pet.Age}</p>
            <p>${pet.description}</p>
        `;
        new bootstrap.Modal(document.getElementById("petModal")).show();
    }
};
document.getElementById("addMore").addEventListener("click", function () {
    new bootstrap.Modal(document.getElementById("addPetModal")).show();
});

document.getElementById("add-pet-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const newPet = {
        id: pets.length + 1,
        Name: document.getElementById("pet-name").value,
        Type: document.getElementById("pet-type").value,
        Age: document.getElementById("pet-age").value,
        Sex: document.getElementById("pet-sex").value,
        Image: document.getElementById("pet-image").value,
        
    };
    pets.push(newPet);
    displayPets();
    document.getElementById("add-pet-form").reset();
    new bootstrap.Modal(document.getElementById("addPetModal")).hide();
    let modal = new bootstrap.Modal(document.getElementById("petModal"));
        modal.show();

        document.getElementById("savePet").addEventListener("click", function () {
            modal.hide();
    });
    
    
});

document.querySelectorAll(".btn-close").forEach(button => {
    button.addEventListener("click", function () {
        let modal = bootstrap.Modal.getInstance(this.closest(".modal"));
        if (modal) {
            modal.hide();
        }
    });
});

displayPets();

