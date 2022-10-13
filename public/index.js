

let hobbyList = document.querySelector('.hobby-list');
let addHobbyData = document.querySelector('.add-hobby-data');
let hobbyNameValue =document.getElementById('hobbyName-value');
let hobbyDescriptionValue =document.getElementById('hobbyDescription-value');
let btnSubmit =document.querySelector('.btn');
let output = '';
// let url = 'http://localhost:3001/api/hobbydb';



// function that returns hobby output 

let returnHobby =(hobby)=>{
    hobby.forEach (hobby =>{
        output += `
       
        <div class="card mt-4 col-md-6 bg-ligt">
        <div class="card-body" data=id=${hobby.id}>
            <h5 class="card-title">${hobby.hobby_name}</h5>
            <p class="card-text">${hobby.hobby_description}</p>
            <a href="#" class="card-link" id="edit-post">Edit</a>
            <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
        </div>`;
        
       });

       hobbyList.innerHTML = output;

}
const URL= 'http://localhost:3001/api/hobbydb';

//METHOD : GET

fetch(URL)
.then(res =>  res.json())
.then(data => returnHobby(data))

// using event listener to make edit and delete clickable
hobbyList.addEventListener('click', (e) =>{
    // console.log(e.target.id);
e.preventDefault();
let deleteButtonIsPress = e.target.id == 'delete-post';
let editButtonIsPress = e.target.id == 'edit-post';

let id = e.target.parentElement.dataset.id;

// delte to remove existing hobbies 
// method DELETE
if (deleteButtonIsPress){
    fetch( URL, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload());
    }

    if(editButtonIsPress){
        let parent =e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;
     
        hobbyNameValue.value = titleContent;
        hobbyDescriptionValue.value= bodyContent;
    }
    //UPDATE HOBBY METHOD PATCH
 btnSubmit= document.addEventListener('click' , (e) => {
    e.preventDefault();
    fetch(`${URL} / ${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        hobbyDescription: JSON.stringify({
            title:hobbyNameValue.value,
            hobbyDescription: hobbyDescriptionValue.value,
     })
});
//  .then(res => res.json())
//  .then(() => location.reload())
//  })
// });

//CREATE - Insert new hobby data using POST method
addHobbyData.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log('form submited!');
    // console.log(hobbyNameValue.value)
    fetch( URL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        hobbyDescription: JSON.stringify({
          title: hobbyNameValue.value,  
          hobbyDescription: hobbyDescriptionValue.value  
     })
    })
    .then(res => res.json())
    .then(data => {
        let dataArr = [];
        dataArr.push(data);
        returnHobby(dataArr);
    })
    //Reset inout field to empty 
    hobbyNameValue.value ='';
    hobbyDescriptionValue.value ='';

})

















//   data.forEach(hobby => {
//       let hobbyElement = document.createElement("li");
//       hobbyElement.innerHTML = `${hobby.name} ${hobby.decription}`;
//       hobbyList.appendChild(hobbyElement);
//   })
// })
// .catch(err => {
//   console.log(err);
// })

// fetch('http://localhost:3001/api/person')
// //response.json converts into JS Object( array of objects)
//   .then((data) => data.json())
//   //use foreach to create li for each object property 
//   .then((data) => {
//   // Use the forEach method to iterate over our array of objects which we define as person 
//   //we create an li element then use innerHTML to define what is inside of our li tag
//   //append all our li's to our ul 
//   data.forEach(person => {
//       let personElement = document.createElement("li");
//       personElement.innerHTML = `${person.first_name} ${person.last_name}`;
//       personList.appendChild(personElement);
//   })    
//   })
//   .catch(err => {
//     console.log(err);
//   })

//   // add event listener 
//   let submitHobbyDescription = document.getElementById('submit-hobby-description');
// //   
// document.addEventListener('click',  (e) => {
//     e.preventDefault();
//     console.log('working button')
//   })
});
})