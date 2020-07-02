/* let moviesUrl = 'https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json';

let request = new XMLHttpRequest();

request.open('GET', moviesUrl); */

/* variabelen met de html elementen uit de pagina*/
const header = document.querySelector ('header');
const section = document.querySelector ('section');


let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'; //link url naar de json file
let request = new XMLHttpRequest(); //een xmlthttp request object,  aanmaken, externe data laden.  is een webapi
request.open('GET', requestURL); //een url openen, koppel de json url aan het xtmlttp request

request.responseType = 'json'; // de data die terukomt is van het type "json"
request.send(); //aangeroepen en daarna data voor terugkomt,de request word verstuurd //onlaod event listener van het xthmlttp request ding

request.onload = function() {  //onloadrequest loading state, onerror wordt die uitgevoerd wanneer er een error is //hier zou je een loader aan en uit kunnen zetten
  const superHeroes = request.response; //wordt uitgevoerd wanneer de date er is
  
  showHeroes(superHeroes); // roept functie aan "showheroes" en json data aan meegeven als 
}


// deze funtie wordt aangeroepen in de onload, hierin worden html elementen aangemaakt en json date gekoppeld
function showHeroes(jsonObj) {
    console.log("showHeroes", jsonObj) ["members"]}; //De members worden nu geshowt in de console log
  const heroes = jsonObj['members']; 
      
  for (let i = 0; i < heroes.length; i++) {
      //html elementen aanmaken
    const myArticle = document.createElement('article');
    const myH2 = document.createElement('h2');
    const myPara1 = document.createElement('p');
    const myPara2 = document.createElement('p');
    const myPara3 = document.createElement('p');
    const myList = document.createElement('ul');

      //json data koppelen aan html elementen
    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';
        
    const superPowers = heroes[i].powers;
    for (let j = 0; j < superPowers.length; j++) {
      const listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

   //hier worden html elemnten genest
    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

      /* hier worden nieuwe html elementen aan de section in de html toegevoegd*/   
    section.appendChild(myArticle);
  }


request.responseType = 'json';

request.open('GET', requestURL);
request.responseType = 'text'; // now we're getting a string!
request.send();

request.onload = function() {
  const superHeroesText = request.response; // get the string from the response
  const superHeroes = JSON.parse(superHeroesText); // convert it to an object
  populateHeader(superHeroes);
  showHeroes(superHeroes);
}

let myJSON = { "name": "Chris", "age": "38" };
myJSON
let myString = JSON.stringify(myJSON);
myString