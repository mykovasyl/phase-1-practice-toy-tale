let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection')
  const toyForm = document.querySelector('.add-toy-form')
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  //display toys on the site
  function fetchData() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(data =>
        renderToys(data))
  }

  function renderToys(data) {
    for (const toy of data) {


      const div = document.createElement('div')
      const h2 = document.createElement('h2')
      const img = document.createElement('img')
      const p = document.createElement('p')
      const button = document.createElement('button')

      div.className = 'card'
      img.className = 'toy-avatar'
      button.className = 'like-btn'
      button.innerHTML = 'Like ❤️'

      h2.innerHTML = toy.name;
      img.src = `${toy.image}`
      p.innerHTML = `${toy.likes} Likes`;
      button.id = toy.id;
      // button.setAttribute('id', `${toy.id}`)

      div.append(h2, img, p, button)
      toyCollection.append(div)
    }
    console.log(data[0].name);

  }
  fetchData();

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let toyObj = {
      name: e.target.elements.name.value,
      image: e.target.elements.image.value,
      likes: 0
    }
    addNewToy(toyObj)
  })

  function addNewToy(newToy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(resp => resp.json())
      .then(data => {
        toyCollection.innerHTML += `
        <div class="card">
          <h2>${data.name}</h2>
          <img class="toy-avatar" src='${data.image}'>
          <p>${data.likes} Likes</p>
          <button class="like-btn" id="${data.id}">Like ❤️</button>
        </div>
    `})
  }

  //fetch(`http://localhost:3000/toys/${id}`)
  document.addEventListener('click', (e) => {
    if(e.target.className === 'like-btn') {
      const currentLikes = parseInt(e.target.previousElementSibling.textContent)
      e.target.previousElementSibling.textContent = `${currentLikes + 1} Likes`
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: currentLikes + 1
        })
      })
      // .then(resp => resp.json())
      // .then(data => {
      //   e.target.previousElementSibling.textContent = `${data.likes} Likes`
      // })
    }
  
  })
  
}); //code ends

