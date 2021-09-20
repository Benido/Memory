
//La page lance une modale au chargement
$(window).on("load",function(){
  $("#start-modal").modal("show")
  ;
})


const cardsGrid = $("#memory-card-grid")
const themeSelection = $("#theme-selection")
const buttonLetsGo = $("#button-lets-go")
const pairsNumber = $("#pairs-selection")
const foundPairs = $("#found-pairs-grid-1")

//La zone de jeu est initialisée avec le nombre de cartes correspondant aux paires et au thème choisis
function createGrid(nbPairs) {   

 for (let i=0; i < nbPairs * 2; i++)  {
   let wrapper = document.createElement("div")
   wrapper.classList.add("col")
   wrapper.classList.add("d-flex")
   wrapper.classList.add("justify-content-center")
   let card = document.createElement("div")
   card.classList.add("memory-card")
   card.classList.add(themeSelection.val())
   card.classList.add("shadow")
   wrapper.append(card)
   cardsGrid.append(wrapper)
 }
}

//La paire trouvée est ajoutée dans la zone du joueur
function addFoundPairs(card) {
  foundPairs.html(`<div class ='col d-flex justify-content-center'><div class = ${card}></div></div>`)
  
}

// Fisher-Yates Shuffle
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

//Génère le nombre de paires que le joueur a déterminée, puis mélange les valeurs dans une table.
function newTable(nbCartes) {
  let newTable = []
  for (let i = 1; i <= nbCartes; i++) {
    newTable.push(i) 
    newTable.push(i)
  }
  shuffle(newTable)
  return newTable
}

//Attribue à chaque carte une valeur de la table
function giveNumber(randomizedTable) {
  for (let i = 0; i < randomizedTable.length; i++) {  
  $("#memory-card-grid > div > .memory-card").eq(i).addClass(`f${randomizedTable[i]}`)
  }
}

//A la fermeture de la modale de lancement, la grille de carte est initialisée
$("#button-lets-go").on("click", function () {
  createGrid(pairsNumber.val())
  let table = newTable(pairsNumber.val())
  giveNumber(table)
  partyBegins()
})


//Chaque tour, le joueur peut cliquer sur deux cartes pour tenter d'assembler une paire. 

//Le clic révèle la face de la carte. Le nombre de clic est limité à 2
function revealCards(counter, array) { 
  $("#memory-card-grid").one("click", ".memory-card", (function() {
    $(this).removeClass(`${themeSelection.val()}`)
      let carte = $(this)
      array.push(carte) 
      counter++      
      if (counter < 2) {
        revealCards(counter, array)
      }   
      else if (array[0].attr("class") === array[1].attr("class")) {        
       setTimeout(function() {
        $(array[0]).hide()
        $(array[1]).hide()
        addFoundPairs($(this).attr("class"))
        realPairsCounter--
       }, 1000)    
       return     
      } else {
        setTimeout(function() {        
        $(array[0]).addClass(`${themeSelection.val()}`)
        $(array[1]).addClass(`${themeSelection.val()}`)
        }, 1000)  
        return
        }
    }))
}


let i = 0
let compare = []
let realPairsCounter

function partyBegins () {
  realPairsCounter = pairsNumber.val()
  while (realPairsCounter > 0) {
    revealCards(i, compare)
  }

/*  if (realPairsCounter > 0) {
    revealCards(i, compare, realPairsCounter)
  }*/
    
  
}









/*
function newTurn(array) {
  let index1 = reveal(array) -1
  let index2 = reveal(array) -1
  while (index2 === index1)
  {
    index2 = reveal(array)
  }
  
  //Lorsque la paire est trouvée, les valeurs sont retirées de la table.   
  if (array[index1] == array[index2]) {
    //on enlève d'abord l'index le plus haut afin de ne pas changer la valeur de l'index le plus bas une fois qu'il est oté
    if (index1 > index2) {
      array.splice(index1, 1)
      array.splice(index2, 1)
    } 
    else {
      array.splice(index2, 1)
      array.splice(index1, 1)
    }    
  }      
    alert(array)

  return array
}

/*newTurn(table)*/

