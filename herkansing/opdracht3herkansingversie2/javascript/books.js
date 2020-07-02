const header = document.querySelector('header');
const section = document.querySelector('section');
const carousel = document.querySelector('.carousel');
const myArticles = document.createElement('articles'); //Articles moet vervangen worden voor section

let booksLength;

let requestURL = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function () {
    const books = request.response;
    booksLength = books.length;

    // console.log(books);

    showBooks(books);
}
// Boeken overzicht

// deze funtie wordt aangeroepen in de onload, hierin worden html elementen aangemaakt en json data gekoppeld
function showBooks(jsonObj) {
    //De boeken worden nu geshowt in de console log
    console.log(jsonObj);

    //loopt door alle boeken heen die vanuit de json komen en dan maak je een nieuw artikel van, zodat je elk boek in een los element krijgt --> article
    for (let i = 0; i < jsonObj.length; i++) {
        myArticles.appendChild(createArticle(jsonObj[i], i, jsonObj.length)); //(functie maken createarticles)
        carousel.appendChild(myArticles);
    }
}

//Functie aangemaakt met als parameters de json data van het boek welke index het boek heeft en de total lengte van alle opgehaalde boeken. 
const createArticle = (article, i, maxLength) => {
    const myArticle = document.createElement('article');

    //Eerste boek is active. tweede wordt next. Derde maakt de allerlaaste als de vorige
    if (i == 0) myArticle.className = "active";
    if (i == 1) myArticle.className = "next";
    if (i == maxLength - 1) myArticle.className = "prev";

    //Html element aanmaken voor de title als h1
    const myH1 = document.createElement('h1');
    myH1.textContent = article.title;

    //img element aanmaken en json data koppelen
    const plaatje = document.createElement('img');
    plaatje.src = article.imageLink;

    //Button voor meer informatie aanmaken
    const myButton = document.createElement('button');
    myButton.innerText = 'Meer informatie over ' + article.title;
    //Eerst 3 seconden wachten, daarna wordt er extra info over het boeken laten zien, dan wordt active inactive en andersom
    myButton.onclick = () => {

        const loadingGif = document.createElement('span');  //img maken, gifje
        loadingGif.innerText = 'Je moet 3 seconden wachten...'; //src van het gifje koppelen
//Append loading gif html, aan de article van het boek
        setTimeout(function () {
            //gifje weghalen met css, classlist hide
            const prevClassName = moreInfoDiv.className;
            

            if (prevClassName == 'moreInfo inactive') {
                moreInfoDiv.className = 'moreInfo active';
                myButton.innerText = 'Informatie verbergen';
            }

            if (prevClassName == 'moreInfo active') {
                moreInfoDiv.className = 'moreInfo inactive';
                myButton.innerText = 'Meer informatie over ' + article.title;
            }
        }, 3000);  //gif neerzetten en dan naar 3 seconden weghalen
    };

    //Voor alle json regels wordt html structuur aangemaakt
    //in een div zodat je niet gelijk alles ziet
    const moreInfoDiv = document.createElement('div');
    moreInfoDiv.className = 'moreInfo inactive';

    //label en div om beter te stijlen
    const authorDiv = document.createElement('div');
    const authorLabel = document.createElement('label');
    authorLabel.innerText = 'Author:';

    const authorSpan = document.createElement('span');
    authorSpan.innerText = '' + article.author;

    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(authorSpan);

    moreInfoDiv.appendChild(authorDiv);


    const countryDiv = document.createElement('div');
    const countryLabel = document.createElement('label');
    countryLabel.innerText = 'Country:';

    const countrySpan = document.createElement('span');
    countrySpan.innerText = ' ' + article.country;

    countryDiv.appendChild(countryLabel);
    countryDiv.appendChild(countrySpan);

    moreInfoDiv.appendChild(countryDiv);

    const linkDiv = document.createElement('div');
    const linkLabel = document.createElement('label');  //span
    linkLabel.innerText = 'Wikipedia url:';

    //linkje maken die een nieuw tabblad opent
    const linkSpan = document.createElement('a');
    linkSpan.innerText = ' Wikipedia pagina';
    linkSpan.href = article.link;
    linkSpan.target = '_blank';

    linkDiv.appendChild(linkLabel);
    linkDiv.appendChild(linkSpan);

    moreInfoDiv.appendChild(linkDiv);

    const pagesDiv = document.createElement('div');
    const pagesLabel = document.createElement('label');
    pagesLabel.innerText = 'Total pages:';

    const pagesSpan = document.createElement('a');
    pagesSpan.innerText = ' ' + article.pages;

    pagesDiv.appendChild(pagesLabel);
    pagesDiv.appendChild(pagesSpan);

    moreInfoDiv.appendChild(pagesDiv);

    const yearDiv = document.createElement('div');
    const yearLabel = document.createElement('label');
    yearLabel.innerText = 'Published year:';

    const yearSpan = document.createElement('a');
    yearSpan.innerText = ' ' + article.year;

    yearDiv.appendChild(yearLabel);
    yearDiv.appendChild(yearSpan);

    moreInfoDiv.appendChild(yearDiv);

    //hier worden html elemnten genest
    myArticle.appendChild(myH1);
    myArticle.appendChild(plaatje);
    myArticle.appendChild(myButton);
    myArticle.appendChild(moreInfoDiv);

    return myArticle;
}

//Je haalt alle html elementen op die article heten. Slide naar eerste article
var items = document.getElementsByTagName('article'),
    slide = 0,
    moving = true;

//Je maakt listeners die als je op de knop drukt een functie uitvoeren waardoor je een nieuw boek ziet
function setEventListeners() {
    var next = document.getElementsByClassName('knopvolgende')[0],
        prev = document.getElementsByClassName('knopvorige')[0];


    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
}

function disableInteraction() {
    moving = true;

    setTimeout(function () {
        moving = false
    }, 500);
}

//Je zet hier op basis van de huidige slide naar voren of naar achteren op basis van de geklikte button of pijltjes toetsen
function moveCarouselTo(slide) {
    if (!moving) {
        disableInteraction();

        var newPrevious = slide - 1,
            newNext = slide + 1,
            oldPrevious = slide - 2,
            oldNext = slide + 2;

        if ((booksLength - 1) > 3) {
            if (newPrevious <= 0) {
                oldPrevious = (booksLength - 1);
            } else if (newNext >= (booksLength - 1)) {
                oldNext = 0;
            }

            if (slide === 0) {
                newPrevious = (booksLength - 1);
                oldPrevious = (booksLength - 2);
                oldNext = (slide + 1);

            } else if (slide === (booksLength - 1)) {
                newPrevious = (slide - 1);
                newNext = 0;
                oldNext = 1;
            }

            items[newPrevious].className = "prev";
            items[slide].className = "active";
            items[newNext].className = "next";
        }
    }
}

//Zet de volgende slide als active

function moveNext() {
    if (!moving) {
        if (slide === (booksLength - 1)) {
            slide = 0;
        } else {
            slide++;
        }

        moveCarouselTo(slide);
    }
}

//zet de vorige slide als active

function movePrev() {
    if (!moving) {

        if (slide === 0) {
            slide = (booksLength - 1);
        } else {
            slide--;
        }
        moveCarouselTo(slide);
    }
}

//in de carousel voert de basisfuncties uit zodat er wat gebeurd als je op de buttons klikt

function initCarousel() {
    setEventListeners();

    moving = false;
}

initCarousel();

//Als toets op toetsenbord in is gedrukt wordt de functie keydown textfield uitgevoerd
document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
    var keyCode = e.keyCode;

    //rechterpijl --> volgende
    if (keyCode == 39) {
        moveNext();
    }
    //linkerpijl--> vorige
    if (keyCode == 37) {
        movePrev();
    }
}
