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


        //hier worden html elemnten genest
        myArticle.appendChild(myH2);
        myArticle.appendChild(plaatje);


        //hier worden nieuwe html elementen aan de section in de html toegevoegd
        section.appendChild(myArticle);
    }

    //de carousel
    //Eerst alle variabelen aanmaken
    const items = document.querySelectorAll('img');
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
    document.addEventListener('keydown', keyPress);
}
