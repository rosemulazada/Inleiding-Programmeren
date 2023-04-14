// closetArray is een array met twee afbeeldingen: 1 van een gesloten kast en 1 van een open kast. deze zal ik later gebruiken om ervoor te zorgen dat ik tussen de afbeeldingen kan wisselen on click/dblclick.
// ik doe [mapNaam]/[fileNaam] zodat de computer weet waar het moet zoeken naar de afbeeldingen en vervolgens de naam van het specifieke bestand dat ik wil selecteren.
var closetArray = ["images/closed-closet.png", "images/open-closet.png"];
// closetChange is de variabele die ik heb aangemaakt om de <img> tag met id '#closet' uit de html in op te slaan. deze is een soort placeholder voor de array.
var closetChange = document.querySelector("#closet");
// hieronder word een variabele aangemaakt die kastInhoud heet, en die bevat het divje met de id #kast-inhoud. deze zal ik gebruiken om de items die de pokemon kan dragen in op te slaan en te tonen wanneer de gebruiker de kast opent.
var kastInhoud = document.querySelector("#kast-inhoud")

// wat hier verteld word is: zodra er op de image #closet geklikt word voer je de volgende functie uit: verander de source van de image naar de tweede image in de array met index 1, omdat een array begint met tellen vanaf 0.
// verder wordt er ook verteld dat de attribute 'hidden' die kastInhoud heeft false word zodra de gebruiker op closetChange/#closet klikt, oftewel de attribute wordt 'verwijderd' en de afbeeldingen in het divje zijn visible.
closetChange.addEventListener("click", function () {
  closetChange.src = closetArray[1];
  kastInhoud.hidden = false
});

// hier wordt eigenlijk precies het tegenovergestelde verteld aan de computer als de functie hierboven, maar dan met een dubbelklik. 
// zodra je dubbelklikt op closetChange/#closet word een functie uitgevoerd waarmee de source van closetChange/#closet veranderd wordt naar de eerste afbeelding in array closetArray met index 0.
// ook word de attribute 'hidden' weer toegepast op kastInhoud waardoor de afbeeldingen die erin genest zitten weer verdwijnen.
closetChange.addEventListener("dblclick", function () {
  closetChange.src = closetArray[0];
  kastInhoud.hidden = true
});

// maak variabele pElement aan waarin <p> met id #swapped-text wordt opgeslagen. doe ik zodat ik het makkelijker kan aanspreken in de javascript ipv telkens document.querySelector
var pElement = document.querySelector("#swapped-text")
// variabele inputField aanmaken waarin <input> met id #input-field wordt opgeslagen. doe ik zodat ik het makkelijker kan aanspreken in de javascript ipv telkens document.querySelector
var inputField = document.querySelector("#input-field")
// laat de computer luisteren voor wanneer er iets veranderd word in de <input>. de change event zorgt ervoor dat het resultaat pas te zien is als er op enter is gedrukt. een andere event zoals input die laat de verandering zien terwijl je nog typt.
// zodra er iets veranderd word en er op enter word gedrukt, voer de volgende functie uit:
inputField.addEventListener("change", function (event) {

  // als de waarde van het element dat de event heeft getriggered gelijk is aan 'Budew' of 'budew', verander de tekst van pElement naar 'Oh, right! That's my name! Wanna play dress up with me?'
  // ik gebruik template strings zodat ik niet hoef na te denken over spaties etc.
  if (event.target.value === 'Budew' || event.target.value === 'budew') {
    pElement.textContent = `Oh, right! That's my name! Wanna play dress up with me?`
    // als het element een andere waarde heeft, verander de waarde van pElement dan in `Okay! My name is ${inputField.value} for now. Thanks! Wanna play dress up with me?`
    // omdat ik template strings gebruik moet ik een variabele anders aanroepen. dit doe ik door ${} te doen met de naam van de variabele tussen de curly brackets. 
    // zo komt hier de waarde van de variabele te staan, de ${} wordt niet meegeteld. 
  } else {
    pElement.textContent = `Okay! My name is ${inputField.value} for now. Thanks! Wanna play dress up with me?`
  }
})

// luister of er op kastInhoud geklikt word. zo wel, voer dan de volgende functie uit.
kastInhoud.addEventListener("click", function (event) {
  // hier declareer ik een aantal variabele: ik sla het id van de afbeelding (target) die het event getriggered heeft op in variabele activeItem.
  // ik sla alle afbeeldingen in de div#reveal op in variabele budewItems.
  // ik sla de waarde van .budew-meter-amount op in variabele meterWidth. ik gebruik hierbij .style.width zodat de computer eerst zal kijken of die al een bepaalde heeft. zo niet, neem dan aan dat het een waarde van 0 heeft.
  // de meter is een happiness meter!
  // ik gebruik parseInt zodat ik met de waarde kan rekenen. het is namelijk een string en als ik zeg 'meterWidth + 5 + '%'' zal de computer 5% achter de string plakken i.p.v. het erbij optellen.
  // ik geef de parseInt een radix van tien zodat het getallen meetelt van 0-9. bij een binaire code is de radix bijv. 2, omdat de binaire getallen altijd 0 en 1 zijn.
  var activeItem = event.target.id
  var budewItems = document.querySelectorAll('#reveal > img')
  var meterWidth = parseInt(document.querySelector('.budew-meter-amount').style.width || 0, 10)
  // als de waarde van meterWidth gelijk is aan 100, keer dan terug en voer de code niet uit.
  if (meterWidth === 100) {
    return
  }
  // als de waarde van meterWidth niet gelijk is aan 100, voer dan de volgende code uit. 
  // neem de waarde van style.widthstel deze gelijk aan meterWidth (die is of 0 of hoger (t/m 100) afhankelijk van hoeveel keer de functie al gerunt is) + 5 + '%'.
  // dit betekent dat er telkens een waarde van vijf aan de waarde van de .style.width van .budew-meter-amount wordt toegevoegd. de '%' is puur om een procent teken achter het getal te plakken.
  // dus: telkens als er op de afbeeldingen wordt geklikt en de waarde van meterWidth is NIET 100, tel dan 5 bij de waarde van meterWidth op en toon dit als tekst in de meter.
  document.querySelector('.budew-meter-amount').style.width = meterWidth + 5 + '%'
  // in de code op regel 62 wordt regel 60 geprint als tekst in het divje .budew-meter-amount.
  document.querySelector('.budew-meter-amount').textContent = meterWidth + 5 + '%'
  // voor elke afbeelding in #reveal wordt de volgende functie uitgevoerd.
  budewItems.forEach(function (item) {
    // als de id van de afbeelding gelijk is aan 'active-' + activeItem, zoals bijvoorbeeld afbeelding met file naam active-top-hat, voer dan de functie uit. 
    // dit doe ik omdat het klikken van bijvoorbeeld top-hat.png een functie moet triggeren die van toepassing is op file active-top-hat.png. zo zorg ik ervoor dat de juiste wordt aangesproken, dus active-wings voor wings, active-top-hat voor top-hat, etc.
    if (item.id === 'active-' + activeItem) {
      // verwijder de attribute 'hidden' van de afbeelding. dit maakt de afbeelding dus zichtbaar. return zorgt ervoor dat de functie een bepaalde waarde teruggeeft, in dit geval wordt de gekozen item zichtbaar, en vervolgens stopt de functie.
      item.removeAttribute('hidden')
      return
    }
    // voor de rest van de items blijft gelden dat de attribute hidden van toepassing is. zo zorg je ervoor dat de vorige item niet blijft staan zodra je een nieuwe kiest, waardoor het opstapelt. hidden wordt opnieuw toegepast telkens als de functie gerunt word.
    item.setAttribute('hidden', true)
  })
})

// de button met id #fight is opgeslagen in variabele buttonElement. dit wordt de fight button waarmee je de happiness meter omlaag haalt.
var buttonElement = document.querySelector('#fight')
// als er op buttonElement geklikt wordt, voer dan de volgende functie uit.
buttonElement.addEventListener("click", function () {
  // omdat var meterWidth binnen command blocks op regel 52 gedefinieerd is kan het niet buiten die functie gebruikt worden, omdat het buiten de scope is van die functie. om die reden moeten we de functie hier nogmaals definieren.
  var meterWidth = parseInt(document.querySelector('.budew-meter-amount').style.width || 0, 10)
  // dit is hetzelfde als de code van regels 55-57, maar voor de waarde van 0. als meterWidth gelijk is aan nul, keer dan terug oftewel voer de functie niet uit.
  if (meterWidth === 0) {
    return
  }
  // hier gebeurt hetzelfde als regels 61 en 63. alleen dan wordt er 5% vanaf gehaald en niet bij opgeteld. 
  // dus: telkens als er op de button wordt geklikt en de waarde van meterWidth is NIET 0, haal dan 5 van de waarde van meterWidth af en toon dit als tekst in de meter.
  document.querySelector('.budew-meter-amount').style.width = meterWidth - 5 + '%'
  document.querySelector('.budew-meter-amount').textContent = meterWidth - 5 + '%'
})