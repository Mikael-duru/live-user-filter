const filterBox = document.querySelector("#filter");
const displayResult = document.querySelector("#result");
const page404 = document.querySelector(".not-found")
const listItems = [];

getUserData();
filterBox.addEventListener("input", (e) => filterUser(e.target.value));

// Gets and display user data
async function getUserData(){
  try {
    const res = await fetch("https://randomuser.me/api?results=40");
    const { results } = await res.json();

    displayResult.innerText = "";

    results.map(user => {
      const li = document.createElement('li');

      listItems.push(li);

      li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
        <div class="user-list">
          <h2 class="user-name">
            ${user.name.title} 
            ${user.name.first} 
            ${user.name.last}
          </h2>
          <p class="location">
          ${user.location.city},
          ${user.location.country}
          </p>
        </div>
      `

      displayResult.appendChild(li)
    });
  }
  catch(error) {
    console.log(error, "Check internet connection")
  }
}

// search filter logic
function filterUser(searchInput){
  listItems.forEach(listItem => {
    if(listItem.innerText.toLowerCase().includes(searchInput.toLowerCase())){
      listItem.classList.remove("hide");
    }
    else{
      listItem.classList.add("hide");
    }
  })
}