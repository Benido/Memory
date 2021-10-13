
//La page lance une modale au chargement
$(window).on("load",function(){
  $("#start-modal").modal("show")
  if (window.innerWidth < 1024) {   
    $("#2joueurs").attr("disabled", "disabled")
  }
})


const cardsGrid = $("#memory-card-grid")
const player2 = $("#player-2")
const themeSelection = $("#theme-selection")
const buttonLetsGo = $("#button-lets-go")
const pairsNumber = $("#pairs-selection")
const clicCounter = $("#clic-counter")

//La zone de jeu est initialisée avec le nombre de cartes correspondant aux paires et au thème choisis
//mettre en jQuery ?
function createGrid(nbPairs) {   

 for (let i=0; i < nbPairs * 2; i++)  {
  cardsGrid.append(
    `<div class="col d-flex justify-content-center">
      <div class="memory-card shadow ${themeSelection.val()}"></div>
    </div>`
    )
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

//A la fermeture de la modale de lancement, la grille de cartes est initialisée et la partie commence
$("#button-lets-go").on("click", function () {
  const playersNumber = document.getElementById("2joueurs")
  if (playersNumber.checked) {
    player2.show()
  }
  createGrid(pairsNumber.val())
  let table = newTable(pairsNumber.val())
  giveNumber(table)  
  gameBegins()
})

let realPairsCounter
let revealed = []
let counter = 0
let clicks = 0
let currentPlayer = 1



//la partie enchaîne les tours jusqu'à ce qu'il n'y ait plus de paires à trouver
function gameBegins () {
  realPairsCounter = pairsNumber.val()  
  revealCards()
} 

//Le clic révèle la face de la carte en enlevant la classe du background et on rend la carte non-cliquable.
function revealCards() { 
  $("#memory-card-grid").on("click", ".memory-card", (function() {
    $(this).removeClass(`${themeSelection.val()}`).addClass("no-click")
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
     cardsGrid.addClass("no-click")
   if (revealed[0].attr("class") === revealed[1].attr("class")) {    
    //Si la classe correspond, on fait disparaître les cartes tout en conservant leur position dans la grille.
    //On ajoute également la carte dans la zone des paires trouvées.             
    setTimeout(function() {
     addFoundPairs(revealed[0].attr("class"))
     $(revealed[0]).removeClass("shadow f1 f2 f3 f4 f5 f6 f7 f8 f9 f10").addClass("empty-space")
     $(revealed[1]).removeClass("shadow f1 f2 f3 f4 f5 f6 f7 f8 f9 f10").addClass("empty-space")
         
     //on vide le tableau, remet le compteur de carte à 0 et décrémente le compteur de paires
     revealed = []     
     counter = 0            
     realPairsCounter--
     cardsGrid.removeClass("no-click")
     if ($("#2joueurs").is( ":checked" )) {
      changeCurrentPlayer()
     }
     //quand le compteur de paires est à zéro on propose de relancer une partie
     if (realPairsCounter === 0) {
      endgame()
     }
    }, 750)           
  //Sinon la classe du background est remise 
  } else {
    setTimeout(function() {        
    $(revealed[0]).addClass(`${themeSelection.val()}`).removeClass("no-click")
    $(revealed[1]).addClass(`${themeSelection.val()}`).removeClass("no-click")
    revealed = []
    counter = 0    
    cardsGrid.removeClass("no-click")   
    if ($("#2joueurs").is( ":checked" )) {
      changeCurrentPlayer()
    } 
      }, 750)          
    }  
  }                   
}

//La paire trouvée est ajoutée dans la zone du joueur
function addFoundPairs(card) {

 $(`#found-pairs-player-${currentPlayer}`).append('<div class = "col d-flex justify-content-center"><div class = "' + card + '"></div></div>') 
}
      
function clicksCounter () {
  clicks++
  clicCounter.text(clicks) 
}

function changeCurrentPlayer () {
  $(`#player-${currentPlayer} div`).first().removeClass("current-player")
  currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1 
  $(`#player-${currentPlayer} div`).first().addClass("current-player")
  
}

//lance la modale de fin de partie
function endgame () {
  $("#endgame-modal").modal("show")
  $("#new-game-button").click(function () {
    location.reload()
  })
}





      




