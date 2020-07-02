//bronnen:
//https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute
//https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/visibility
//https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event
//https://developer.mozilla.org/en-US/docs/Web/API/MediaKeySession/remove
//https://developer.mozilla.org/en-US/docs/Web/API/EventListener
//https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
//En met wat hulp van Vincent Kempers (hulp met overbodige code weglaten en opbouw carousel)


//variabelen met de html elementen uit de pagina
const body = document.querySelector('body');
const section = document.querySelector('section');
const loading = document.querySelector('.loading-gif.active');
//section aanmaken om alle artikelen in te zetten
const myArticles = document.createElement('section');
myArticles.className = 'articles';

//link url naar de json file
let requestURL = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json';
//een xmlthttp request object,  aanmaken, externe data laden.  is een webapi
let request = new XMLHttpRequest();
//een url openen, koppel de json url aan het xtmlttp request
request.open('GET', requestURL);

// de data die terukomt is van het type "json"
request.responseType = "json";
//aangeroepen en daarna data voor terugkomt,de request word verstuurd 
request.send();

//onloadrequest loading state, onerror wordt die uitgevoerd wanneer er een error is 
request.onload = function () {
    //wordt uitgevoerd wanneer de data er is
    const books = request.response;

    console.log(books);

    //hierin wordt de timeout gemaakt voor de loading gif, wanneer deze voltooid is laat hij alle boeken zien, dit duurt 5 seconden
    setTimeout(function () {
        loading.classList.toggle('active');
        showBooks(books);
    }, 5000);

}

// deze funtie wordt aangeroepen in de onload, hierin worden html elementen aangemaakt en json date gekoppeld
function showBooks(jsonObj) {
    //De members worden nu geshowt in de console log
    console.log(jsonObj);

    for (let i = 0; i < jsonObj.length; i++) {
        //Voor elk element een nieuwe article element aanmaken
        const myArticle = document.createElement('article');
        if (i == 0) {
            myArticle.className = 'active';
        }
        //html elementen aanmaken
        const myH2 = document.createElement("h2");
        myH2.textContent = jsonObj[i].title;

        //img element aanmaken en json data koppelen
        const plaatje = document.createElement("img");
        plaatje.src = jsonObj[i].imageLink;

        //h3 aanmaken voor authot
        const myH3 = document.createElement("h3");
        myH3.textContent = jsonObj[i].author;

        //h4 aanmaken voor year
        const myH4 = document.createElement("h4");
        myH4.textContent = jsonObj[i].year;

        //p aanmaken voor pages
        const myP1 = document.createElement("p");
        myP1.textContent = jsonObj[i].pages;

        //meer informatie over het boek bundelen om met toggle te showen en te hiden ipv alle 3 los
        const meerInformatie = document.createElement("div");
        meerInformatie.className = 'meerInformatie';
        //hier worden html elementen genest in het meerinformatie element
        meerInformatie.appendChild(myH3);
        meerInformatie.appendChild(myH4);
        meerInformatie.appendChild(myP1);


        //hier worden html elemnten genest in het article element
        myArticle.appendChild(myH2);
        myArticle.appendChild(plaatje);
        myArticle.appendChild(meerInformatie);

        //hier worden nieuwe html elementen aan de section in de html toegevoegd
        myArticles.appendChild(myArticle);
    }

    //artikelen toevoegen aan de body
    body.appendChild(myArticles);


    //variabelen aanmaken en daar de article en knoppen selecteren
    const items = document.querySelectorAll('article');
    const itemCount = items.length;
    const nextItem = document.querySelector('.next');
    const previousItem = document.querySelector('.previous');
    //laat de slider beginnen op de eerste slide
    let count = 0;
    
    //class active wordt van het huidige boek weggehaald en zet dit bij de "next" op active zodat deze tevoorschijn komt
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
    //class active wordt van het huidige boek weggehaald en zet dit bij de "previous" op active zodat deze tevoorschijn komt
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

    //wanneer je op de linkerknop drukt van je toetsenbord gaat de slider naar links en naar rechts met de rechterknop van je toetsenbord
    function keyPress(e) {

        if (e.keyCode == '37') {
            showPreviousItem();
        } else if (e.keyCode == '39') {
            showNextItem();
        }
    }
    
    //functies toevoegen die luisteren naar een actie zoals het indrukken van het toetsenbrod op je keyboard en het klikken op de "previous" of "next" knop
    document.addEventListener('keydown', keyPress);
    nextItem.addEventListener('click', showNextItem);
    previousItem.addEventListener('click', showPreviousItem);


    (function () {

        //variable aanmaken voor de button en dan de button uit de html selecteren
        const button = document.querySelector('.button');
        //eventlistener toevoegen 
        button.addEventListener('click', function () {
            const items = document.querySelector('article.active .meerInformatie');

            //de items laten togglen wanneer deze active is, dus dat deze geshowd worden
            console.log(items.classList);
            items.classList.toggle('active');

        });

    })();
}
