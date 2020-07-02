const header = document.querySelector('header');
const section = document.querySelector('section');
const myArticle = document.createElement('article');


let requestURL = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = "json";
request.send();

request.onload = function () {
    const books = request.response;

    console.log(books);

    showBooks(books);
}
// Boeken overzicht

// deze funtie wordt aangeroepen in de onload, hierin worden html elementen aangemaakt en json date gekoppeld
function showBooks(jsonObj) {
    //De members worden nu geshowt in de console log
    console.log(jsonObj);


    //const heroes = jsonObj['members']; 
    //console.log(jsonObj[4] .cover);   


    for (let i = 0; i < jsonObj.length; i++) {
        //html elementen aanmaken
        const myH2 = document.createElement("h2");
        myH2.textContent = jsonObj[i].title;

        //img element aanmaken en json data koppelen
        const plaatje = document.createElement("img");
        plaatje.src = jsonObj[i].imageLink;

        const myH3 = document.createElement("h3");
        myH3.textContent = jsonObj[i].author;

        const myH4 = document.createElement("h4");
        myH4.textContent = jsonObj[i].year;

        const myP1 = document.createElement("p");
        myP1.textContent = jsonObj[i].pages;


        //hier worden html elemnten genest
        myArticle.appendChild(myH2);
        myArticle.appendChild(plaatje);
        myArticle.appendChild(myH3);
        myArticle.appendChild(myH4);
        myArticle.appendChild(myP1);



        //hier worden nieuwe html elementen aan de section in de html toegevoegd
        section.appendChild(myArticle);
    }

    //de carousel
    //Eerst alle variabelen aanmaken
    /*const items = document.querySelectorAll('article');
    const itemCount = items.length;
    const nextItem = document.querySelector('.knopvolgende');
    const previousItem = document.querySelector('.knopvorige');
    //de slider laten beginnen op de eerste afbeelding
    let count = 0;

    function showNextItem() {
        items[count].classList.remove('active');

        if (count < itemCount - 1) {
            count++;
        } else {
            count = 0;
        }

        items[count].classList.add('active');
        console.log(count);
    }

    function showPreviousItem() {
        items[count].classList.remove('active');

        if (count > 0) {
            count--;
        } else {
            count = itemCount - 1;
        }

        items[count].classList.add('active');
        console.log(count);
    }

    function keyPress(e) {
        e = e || window.event;

        if (e.keyCode == '37') {
            showPreviousItem();
        } else if (e.keyCode == '39') {
            showNextItem();
        }
    }

    nextItem.addEventListener('click', showNextItem);
    previousItem.addEventListener('click', showPreviousItem);
    document.addEventListener('keydown', keyPress); */
    
const items = document.querySelectorAll('article');
const itemCount = items.length;
const nextItem = document.querySelector('.next');
const previousItem = document.querySelector('.previous');
let count = 0;

function showNextItem() {
  items[count].classList.remove('active');

  if(count < itemCount - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active');
  console.log(count);
}

function showPreviousItem() {
  items[count].classList.remove('active');

  if(count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }

  items[count].classList.add('active');
  console.log(count);
}

nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);


    //const myButton = document.createElement('button');
    //myButton.innerText = 'Meer informatie over ' + article.title; 

    (function () {

        const button = document.querySelector('.button');
        const items = document.querySelectorAll('article');

        button.addEventListener('click', function () {

            items.classList.toggle('h3' + 'h4' + 'p');

        });

    })();
}
