console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function() {
    let selector = document.getElementById('breed-dropdown')

    fetchDogs();
    fetchBreeds();

    selector.onchange = function() {dropDown()};
  })

function fetchDogs() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then( resp => resp.json())
    .then(json => dogs(json['message']));
}

function dogs(json) {
    const div = document.getElementById('dog-image-container')
    json.forEach(pic => {
        const img = document.createElement('img')
        img.src = pic;
        div.appendChild(img)
      })
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => breeds(json['message']));
}

function breeds(json) {
    const ul = document.getElementById('dog-breeds')
    for (const key in json) {
        const li = document.createElement('li')
        li.innerHTML = `${key}: ${json[key]}`;
        ul.appendChild(li);
        colors(li);
      }
}

function colors(li) {
    li.addEventListener("click", function() {li.style.color = "red";});
}

function dropDown() {
    let select = document.getElementById('breed-dropdown').value;
    let lis = document.getElementsByTagName("li")
    let array = Array.from(lis);
    array.forEach(function (li) { 
        if (li.innerHTML.charAt(0) == select) {
            li.style.display = "block";
        }
        else {
            li.style.display = "none";
        }
    });
}