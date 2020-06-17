const header = document.querySelector('header');
const section = document.querySelector('section');
const myArticle = document.createElement('article');


let requestURL ='https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json';
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

$ ('.slider').each(function(){   //voor als er meerdere sliders zouden staan op de pagina
    var $this = $(this);         //pakt de huidige slider
    var $group = $this.find('.slide-group');  //Pakt de slide-group in de container
    var $slides = $this.find('.slide');  //een object om alle slides in te houden
    var buttonArray = [];  //array voor de navigatie buttons
    var currentIndex = 0;  //de index nummer van de huidige slide
    var timeout;        //gebruikt om de timer in te zetten
    
   
    
    function advance (){    //timer voor tussen de slides
        clearTimeout(timeout);  
        timeout = setTimeout (function(){  //eerst word de huidige timer weggehaald en daarna een nieuwe toegevoegd en wanneer de tijd voorbij is kom er een anonymous function
            if (currentIndex < ($slides.length - 1)){ //als het niet de laatste slide is
                move (currentIndex + 1);   //gaat hij verder naar de volgende
            } else {      // of anders
                move(0);  //gaat hij naar de eerste slide
            }
        }, 4000);  
    }
    
    $.each($slides, function(index){ //button element voor de button
        var $button = $('<button type="button" class="slide-btn">&bull;</button>'); 
        if (index === currentIndex) { //als index het huidige item is
            $button.addClass ('active'); //voegt de active class toe
        }
        
      $button.on('click', function(){ //eventhandler voor de button aanmaken
          move (index);                   //roept de move() functie aan
      }).appendTo($this.find('.slide-buttons'));  //wordt toegevoegd aan de buttons holders
        buttonArray.push($button);  //toegevoegd aan de button array
    }); 
    
    advance();     
      
       
    });



    
    


