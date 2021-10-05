
//La page lance une modale au chargement
$(window).on("load",function(){
  $("#start-modal").modal("show")
  if (window.innerWidth < 1024) {   
    $("#2joueurs").attr("disabled", "disabled")
  }
})


const cardsGrid = $("#memory-card-grid")
const themeSelection = $("#theme-selection")
const buttonLetsGo = $("#button-lets-go")
const pairsNumber = $("#pairs-selection")
const foundPairs = $("#found-pairs-grid-1")
const clicCounter = $("#clic-counter")

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

//Attribue à chaque carte une valeur de la table et lie l'image correspondante
function giveNumber(randomizedTable) {
  for (let i = 0; i < randomizedTable.length; i++) {  
  $("#memory-card-grid > div > .memory-card").eq(i).addClass(`f${randomizedTable[i]}`)
  }
}

//A la fermeture de la modale de lancement, la grille de cartes est initialisée
$("#button-lets-go").on("click", function () {
  createGrid(pairsNumber.val())
  let table = newTable(pairsNumber.val())
  giveNumber(table)
  gameBegins()
})

let realPairsCounter
let revealed = []
let counter = 0
let clicks = 0



//la partie démarre et enchaîne les tours jusqu'à ce qu'il n'y ait plus de paire à trouver
function gameBegins () {
  realPairsCounter = pairsNumber.val()  
  revealCards()
} 

//Le clic révèle la face de la carte en enlevant la classe du background. 
function revealCards() { 
  $("#memory-card-grid").on("click", ".memory-card", (function() {
    $(this).removeClass(`${themeSelection.val()}`)
    //on regarde si deux cartes sont retournées, puis si elles sont identiques
    checkIfPair($(this))  
    //on incrémente le compteur de coups
    clicksCounter()  
  }))  
}

function checkIfPair (obj) {
  //on ajoute la carte dans un tableau
  revealed.push(obj)  
  counter++       
  //Le nombre de clic est limité à 2      
  if (counter > 1) {        
   if (revealed[0].attr("class") === revealed[1].attr("class")) {    
    //Si la classe correspond, on fait disparaître les cartes tout en conservant leur position dans la grille             
    setTimeout(function() {
     addFoundPairs(revealed[0].attr("class"))
     $(revealed[0]).removeClass("shadow f1 f2 f3 f4 f5 f6 f7 f8 f9 f10").addClass("empty-space")
     $(revealed[1]).removeClass("shadow f1 f2 f3 f4 f5 f6 f7 f8 f9 f10").addClass("empty-space")
         
     //on vide le tableau, remet le compteur de carte à 0 et décrémente le compteur de paires
     revealed = []     
     counter = 0            
     realPairsCounter--
     //quand le compteur de paires est à zéro on propose de relancer une partie
     if (realPairsCounter === 0) {
      endgame()
     }
    }, 750)           
  //Sinon la classe du background est remise 
  } else {
    setTimeout(function() {        
    $(revealed[0]).addClass(`${themeSelection.val()}`)
    $(revealed[1]).addClass(`${themeSelection.val()}`)
    revealed = []
    counter = 0          
      }, 750)          
    }  
  }                   
}


//La paire trouvée est ajoutée dans la zone du joueur
function addFoundPairs(card) {
  foundPairs.append('<div class = "col d-flex justify-content-center"><div class = "' + card + '"></div></div>')
}
      
function clicksCounter () {
  clicks++
  clicCounter.text(clicks) 
}

//lance la modale de fin de partie
function endgame () {
  $("#endgame-modal").modal("show")
  $("#new-game-button").click(function () {
    location.reload()
  })
}





      




