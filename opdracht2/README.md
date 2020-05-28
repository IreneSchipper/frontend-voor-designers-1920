# Frontend voor Designers - opdracht 2: Een interactie uitwerken voor verschillende gebruikers input


# Project titel
Carousel met foto's: Een carousel met meerdere foto's, die je kan bedienen met een button en met de pijltjes op het toetsenbord.

## interface
De carousel werkt heel simpel. Je kan op de pijltjes knoppen links en rechts drukken om naar de volgende foto te gaan. Op de knoppen zitten pijltjes zodat de gebruiker weet welke knop wat doet. Wanneer de gebruiker alle foto's heeft gehad begint deze weer opnieuw. Zo is het een carousel die door blijft gaan en die dezelfde foto's laat zien aan de gebruiker. Ook kan de gebruiker de carousel bedienen met de pijltjes "links" en "Rechts" op het toetsenbord. 

Ik heb "keep users in control" toegepast door de interface simpel te houden. De gebruiker ziet de knoppen en ziet dat er pijltjes op staan waardoor al duidelijk wordt dat de gebruiker ergens op kan klikken waardoor de plaatjes zullen verschuiven. 

Ik heb "provide a natural next step" nog niet voldoende kunnen toepassen. In mijn eerste ontwerp wilde ik dat de gebruiker al de volgende foto kon zien zodat de gebruiker gelijk wist dat er meer foto's zouden komen. Ik heb dit wel gedaan door de pijltjes op knoppen toe te passen.

Ik heb "appearance follows behavior" toegepast door de knoppen. De knoppen werken hoe de gebruiker zou denken dat deze werken. 


## code
Ik heb gebruik gemaakt van Jquery om het klikken op de pijltjes op het toetsenbord mogelijk te kunnen maken.
Dit heb ik met de volgende code gedaan. 

 $(document).on('keyup', function(event) {
   if (event.which === 37) {
      $('.knopvorige').trigger('tap');
   } else if (event.which === 39) {
      $('.knopvolgende').trigger('tap');
   }
}); 

Met de event.which code "37" en "39" geef ik de knoppen links en rechts aan.



