

  //window.addEventListener("load", function(event) { ;
 // });

/*
// Fisher - Yates Shuffle
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


//Le script génère le nombre de paires que le joueur a déterminée, puis mélanges les valeurs dans une table.!
function newTable () {
  var pairs = parseInt(prompt("Combien de paires ?"), 10)
  while (isNaN(pairs) && pairs > 0)
  {
    pairs = prompt("Merci d'entrer un entier. Combien de paires ?")
  }

  let newTable = []

  for (let i = 1; i <= pairs; i++) {
    newTable.push(i) 
    newTable.push(i)
  }
  shuffle(newTable)
  return newTable
}

let table = newTable()
alert(table)

//Chaque tour, le joueur peut saisir deux chiffres pour tenter d'assembler une paire. 
function reveal (array) {
  let chiffre = parseInt(prompt("Choisissez un chiffre entre 1 et " + array.length), 10)
  while (isNaN(chiffre) && chiffre > (array.length) && chiffre < 1) {
    chiffre = parseInt(prompt("Merci d'entrer un chiffre entre 1 et " + array.length), 10)
  }        
  alert(`Vous dévoilez le nombre ${array[chiffre-1]}`)
  return chiffre
}

function newTurn (array) {
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

newTurn(table)

*/