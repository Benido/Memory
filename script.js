let nombrePaires = document.getElementById('pairs-selection')
const selection = document.getElementById("selection-theme")
const cardsGrid = document.getElementById("memory-card-grid")
const buttonLetsGo = document.getElementById("button-lets-go")

//La page lance une modale au chargement
$(window).on("load",function(){
  $("#start-modal").modal("show");
})

/*//Ecoute du clic de lancement de partie sur la modale
buttonLetsGo.addEventListener("click", () => {
  alert('ça marche')
})
function test() {
  alert(`il y a  paires`)
  console.log(nombrePaires.value)
}*/

$("#pairs-selection").change(function () {
  let val = $("#pairs-selection option:selected").val()
  alert(val)
})

//La zone de jeu est initialisée avec le nombre de cartes correspondant aux paires et au thème choisis
function createGrid(nbCartes) {  
 alert('coucou' + nbCartes)
 //for (let i=0; i < nbCartes; i++)  {
   let wrapper = document.createElements("div")
   wrapper.classList.add("col d-flex justify-content-center")
   let card = document.createElements("div")
   card.classList.add("memory-card shadow")
   wrapper.append(card)
   cardsGrid.append(wrapper)
 //}
}
/*
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

//Le script génère le nombre de paires que le joueur a déterminée, puis mélange les valeurs dans une table.!
function newTable() {
  const pairs = nombrePaires.value
  let newTable = []
  for (let i = 1; i <= pairs; i++) {
    newTable.push(i) 
    newTable.push(i)
  }
  shuffle(newTable)
  return newTable
}

let table = newTable()
//alert(table)

//Chaque tour, le joueur peut saisir deux chiffres pour tenter d'assembler une paire. 
function reveal (array) {
  let chiffre = parseInt(prompt("Choisissez un chiffre entre 1 et " + array.length), 10)
  while (isNaN(chiffre) && chiffre > (array.length) && chiffre < 1) {
    chiffre = parseInt(prompt("Merci d'entrer un chiffre entre 1 et " + array.length), 10)
  }        
  alert(`Vous dévoilez le nombre ${array[chiffre-1]}`)
  return chiffre
}

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

