const header = document.querySelector ('header');
const section = document.querySelector ('section');


let requestURL = 'https://raw.githubusercontent.com/dudeonthehorse/datasets/master/amazon.books.json'; 
let request = new XMLHttpRequest(); 
request.open('GET', requestURL); 

request.responseType = 'json'; 
request.send(); 

request.onload = function() { 
  const books = request.response; 
    
    console.log(books);
   
    showBooks(books);
}



// deze funtie wordt aangeroepen in de onload, hierin worden html elementen aangemaakt en json date gekoppeld
function showBooks(jsonObj) {
    //De members worden nu geshowt in de console log
    console.log (jsonObj);

    
  //const heroes = jsonObj['members']; 
//console.log(jsonObj[4] .cover);   
    
    
  for (let i = 0; i < jsonObj.length; i++) {
      //html elementen aanmaken
    const myH1 = document.createElement('h1');
      myH1.textContent = jsonObj [i].title;
      
    //h2 element aanmaken en json data koppelen
      
      //img element aanmaken en json data koppelen
      const plaatje = document.createElement('img');
      plaatje.src = jsonObj [i].thumbnailUrl;


   //hier worden html elemnten genest
    myArticle.appendChild(myH1);
    myArticle.appendChild(plaatje);

      /* hier worden nieuwe html elementen aan de section in de html toegevoegd*/   
    section.appendChild(myArticle);
  }
}

