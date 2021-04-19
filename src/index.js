document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

let dogIdToEdit

function fetchDogs() { 
    return dogs = fetch('http://localhost:3000/dogs')
    .then(dogs => dogs.json())
    .then(dogs => renderDogs(dogs))
    .catch(error => 'Error fetching Dogs')
}

function renderDogs(dogs) {
    console.log('Dogs: ', dogs)
    const table = document.getElementById('table-body')
    
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    if (dogs.forEach) { 
        dogs.forEach(dog => {
            const tableRow = document.createElement('tr');
            const dogNameTableData = document.createElement('td');
            dogNameTableData.innerHTML = dog.name;
            
            const dogBreedTableData = document.createElement('td');
            dogBreedTableData.innerHTML = dog.breed;
            
            const dogSexTableData = document.createElement('td');
            dogSexTableData.innerHTML = dog.sex
    
            const editDogTableData = document.createElement('td');
            const editDogTableButton = document.createElement('button');
            editDogTableButton.id = JSON.stringify(dog)
            editDogTableButton.innerHTML = 'Edit Dog'
            editDogTableButton.onclick = editDog
            editDogTableData.appendChild(editDogTableButton)
    
            tableRow.appendChild(dogNameTableData)
            tableRow.appendChild(dogBreedTableData)
            tableRow.appendChild(dogSexTableData)
            tableRow.appendChild(editDogTableData)

            table.appendChild(tableRow)
        })
    } else {
        const tableRow = document.createElement('tr');
        const errorTableData = document.createElement('td')
        errorTableData.innerHTML = dogs
    }
}

function editDog(event) {
    event.preventDefault()
    let dogToEdit = JSON.parse(event.target.id);
    dogIdToEdit = dogToEdit.id
    console.log('Dog to edit: ', dogToEdit)
    const dogForm = document.getElementById('dog-form');
    console.log('Dog form fields: ', dogForm.children)
    Array.from(dogForm.children).forEach(field => {
        if (field.name === 'name') {
            field.value = dogToEdit.name
        }

        if (field.name === 'breed') {
            field.value = dogToEdit.breed
        }

        if (field.name === 'sex') {
            field.value = dogToEdit.sex
        }
    })
}

function updateDogInfo(event) {
    event.preventDefault()
    console.log('Event in update: ', event.target)
    let updatedDogInfo = {};
    updatedDogInfo.id = dogIdToEdit

    Array.from(event.target.children).forEach(field => {
        if (field.name === 'name') {
            updatedDogInfo.name = field.value
        }

        if (field.name === 'breed') {
            updatedDogInfo.breed = field.value
        }

        if (field.name === 'sex') {
            updatedDogInfo.sex = field.value
        }
    })

    console.log('Updated dog: ', updatedDogInfo)

    fetch(`http://localhost:3000/dogs/${dogIdToEdit}`, {
        method: 'PATCH',
        headers: {
          "content-type": 'application/json',
          accepts: 'application/json'
        },
        body: JSON.stringify(updatedDogInfo)
    }).then(patchResponse => {
        console.log('Patch Response: ', patchResponse)
        fetchDogs()
    }).catch(error => {
        console.log('Error patching dog: ', error)
    })
}

const dogForm = document.getElementById('dog-form');
dogForm.addEventListener('submit', updateDogInfo)