const header = document.querySelector('header');
const section = document.querySelector('section');
const carousel = document.querySelector('.carousel');
const myArticles = document.createElement('articles');

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

// deze funtie wordt aangeroepen in de onload, hierin worden html elementen aangemaakt en json date gekoppeld
function showBooks(jsonObj) {
    //De boeken worden nu geshowt in de console log
    console.log(jsonObj);


    for (let i = 0; i < jsonObj.length; i++) {
        myArticles.appendChild(createArticle(jsonObj[i], i, jsonObj.length));
        carousel.appendChild(myArticles);
    }
}

const createArticle = (article, i, maxLength) => {
    const myArticle = document.createElement('article');
    if (i == 0) myArticle.className = "active";
    if (i == 1) myArticle.className = "next";
    if (i == maxLength - 1) myArticle.className = "prev";

    const myH1 = document.createElement('h1');
    myH1.textContent = article.title;

    //img element aanmaken en json data koppelen
    const plaatje = document.createElement('img');
    plaatje.src = article.imageLink;

    //hier worden html elemnten genest
    myArticle.appendChild(myH1);
    myArticle.appendChild(plaatje);

    return myArticle;
}

var items = document.getElementsByTagName('article'),
    slide = 0,
    moving = true;

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

function initCarousel() {
    setEventListeners();

    moving = false;
}

initCarousel();
