
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
  gameBegins()
})

let realPairsCounter
let revealed = []
let counter = 0


//la partie démarre et enchaîne les tours jusqu'à ce qu'il n'y ait plus de paire à trouver
function gameBegins () {
  realPairsCounter = pairsNumber.val()
  turn()   
}

function turn () {
  if (realPairsCounter > 0) {
  revealCards(counter, revealed) 
  }
}



//Le clic révèle la face de la carte en enlevant la classe du background. Le nombre de clic est limité à 2
function revealCards(counter, array) {   
    $("#memory-card-grid").on("click", ".memory-card", (function() {
      $(this).removeClass(`${themeSelection.val()}`)
        //on ajoute la carte dans un tableau
        let carte = $(this)
        array.push(carte) 
        counter++             
        if (counter < 2) {
          revealCards(counter, array)      
        } else if (array[0].attr("class") === array[1].attr("class")) {                 
          setTimeout(function() {
           $(array[0]).hide()
           $(array[1]).hide()
           addFoundPairs(array[0].attr("class"))      
           array = []     
           counter = 0            
           realPairsCounter--
          }, 1000)                
        //Sinon la classe du background est remise 
        } else {          
          setTimeout(function() {        
          $(array[0]).addClass(`${themeSelection.val()}`)
          $(array[1]).addClass(`${themeSelection.val()}`)
          array = []
          counter = 0          
            }, 1000)          
          }                  
      }))     
}
  


      











