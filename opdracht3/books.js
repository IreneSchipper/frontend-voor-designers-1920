const header = document.querySelector('header');
const section = document.querySelector('section');
const myArticle = document.createElement('article');


let requestURL = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
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
        const myH1 = document.createElement('h1');
        myH1.textContent = jsonObj[i].title;

        //h2 element aanmaken en json data koppelen

        //img element aanmaken en json data koppelen
        const plaatje = document.createElement('img');
        plaatje.src = jsonObj[i].imageLink;


        //hier worden html elemnten genest
        myArticle.appendChild(myH1);
        myArticle.appendChild(plaatje);

        /* hier worden nieuwe html elementen aan de section in de html toegevoegd*/
        section.appendChild(myArticle);
    }
}


!(function (d) {

    var itemClassName = "img";
    items = d.getElementsByClassName(itemClassName),
        totalItems = items.length,
        slide = 0,
        moving = true;


    function setInitialClasses() {
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
    }

    function setEventListeners() {
        var next = d.getElementsByClassName('knopvolgende')[0],
            prev = d.getElementsByClassName('knopvorige')[0];

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

            if ((totalItems - 1) > 3) {

                if (newPrevious <= 0) {
                    oldPrevious = (totalItems - 1);
                } else if (newNext >= (totalItems - 1)) {
                    oldNext = 0;
                }

                if (slide === 0) {
                    newPrevious = (totalItems - 1);
                    oldPrevious = (totalItems - 2);
                    oldNext = (slide + 1);

                } else if (slide === (totalItems - 1)) {
                    newPrevious = (slide - 1);
                    newNext = 0;
                    oldNext = 1;
                }

                items[oldPrevious].className = itemClassName;
                items[oldNext].className = itemClassName;


                items[newPrevious].className = itemClassName + " prev";
                items[slide].className = itemClassName + " active";
                items[newNext].className = itemClassName + " next";
            }
        }
    }


    function moveNext() {


        if (!moving) {
            if (slide === (totalItems - 1)) {
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
                slide = (totalItems - 1);
            } else {
                slide--;
            }
            moveCarouselTo(slide);
        }
    }


    function initCarousel() {
        setInitialClasses();
        setEventListeners();


        moving = false;
    }


    initCarousel();



    $(document).on('keyup', function (event) {
        if (event.which === 37) {
            $('.knopvorige').trigger('tap');
        } else if (event.which === 39) {
            $('.knopvolgende').trigger('tap');
        }
    });




}(document));
