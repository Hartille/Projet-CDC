/*************************************
******** WEB
*************************************/
function RandomDice(){
  return Math.floor(Math.random() * 6) + 1;
}

let stage = 0;

function LaunchDice(){
  if(stage === 0){
    LaunchChouettes();
    stage = 1;
    document.getElementById("launch").innerHTML = "Lancer le cul";
  }else if(stage === 1){
    LaunchCul();
    stage = 2;
    document.getElementById("launch").innerHTML = "Jet suivant";
  }else{
    ResetDice();
    stage = 0;
    document.getElementById("launch").innerHTML = "Lancer les chouettes";
  }
}

function LaunchChouettes(){
  let dice1 = RandomDice();
  let dice2 = RandomDice();

  let diceImage1 = document.getElementById("Dé1");
  let diceImage2 = document.getElementById("Dé2");

  diceImage1.src = "assets/images/" + dice1 + ".png";
  diceImage2.src = "assets/images/" + dice2 + ".png";
}

function LaunchCul() {
  let dice3 = RandomDice();
  let comb = combinaison(
    parseInt(document.getElementById("Dé1").src.substr(-5, 1)),
    parseInt(document.getElementById("Dé2").src.substr(-5, 1)),
    dice3
  );

  let diceImage3 = document.getElementById("Dé3");
  diceImage3.src = "assets/images/" + dice3 + ".png";

  let resultatCombinaison = document.getElementById("RealizedCombination");
  if (comb.value !== undefined) {
    resultatCombinaison.innerHTML = `${comb.name} de ${comb.value}. + ${comb.score} points.`;
  } else {
    resultatCombinaison.innerHTML = `${comb.name}.`;
  }
}

function ResetDice() {
  let diceImage1 = document.getElementById("Dé1");
  let diceImage2 = document.getElementById("Dé2");
  let diceImage3 = document.getElementById("Dé3");

  // Remplacez le chemin vers le dé vide par le vôtre
  diceImage1.src = "assets/images/0.png";
  diceImage2.src = "assets/images/0.png";
  diceImage3.src = "assets/images/0.png";

  // Effacez le texte du résultat
  let resultatCombinaison = document.getElementById("RealizedCombination");
  resultatCombinaison.innerHTML = "";
}

/*************************************
******** FONCTIONNEMENT DU JEU
*************************************/

//Fonction du Cul de Chouette
function CuldeChouette(dice1, dice2, dice3){
  let result = new Object();
  result.name="Cul de Chouette";
  result.score=40+10*dice1;
  result.value=dice1;
  return dice1===dice2 && dice2===dice3 ? result : false;
}

 //Fonction de la Chouette
function Chouette(dice1, dice2, dice3){
  let combination = (dice1===dice2 && dice1!==dice3) ? dice1 : (dice2===dice3 && dice2 !==dice1) ? dice2 : (dice1===dice3 && dice1!==dice2) ? dice1 : 0;
  let result = new Object();
  result.name="Chouette";
  result.score=combination**2;
  result.value=combination;
  return (dice1===dice2 && dice1!==dice3) || (dice2===dice3 && dice2 !==dice1) || (dice1===dice3 && dice1!==dice2) ? result : false;
}

//Fonction de la Velute
function Velute(dice1, dice2, dice3){
    let result = new Object();
    result.name="Velute";
    result.score=2*Math.max(dice1, dice2, dice3)**2;
    result.value=Math.max(dice1, dice2, dice3);
    return (dice1 + dice2 === dice3) || (dice2 + dice3 === dice1) || (dice1 + dice3 === dice2) ? result : false;
  }

//Fonction de la Chouette-Velute
function ChouetteVelute(dice1, dice2, dice3){
  let result = new Object();
  result.name="Chouette-Velute";
  result.score=2*Math.max(dice1, dice2, dice3)**2;
  result.value=Math.max(dice1, dice2, dice3);
  return Chouette(dice1, dice2, dice3) && Velute(dice1, dice2, dice3) ? result : false;
}

//Fonction de la Suite
function Suite(dice1, dice2, dice3){
  let dices = [dice1, dice2, dice3];
  dices.sort((a, b) => a - b);

  let result = new Object();
  result.name="Suite";
  result.score=0;
  return dices[1]===dices[0]+1 && dices[2]===dices[1]+1 ? result : false;
}

//Fonction du Néant
function Neant(dice1, dice2, dice3){
  let result = new Object();
  result.name="Néant";
  result.score=0;
  return result;
}

function combinaison(dice1, dice2, dice3){
  if(ChouetteVelute(dice1, dice2, dice3)){
    return ChouetteVelute(dice1, dice2, dice3);
  }
  else if(Chouette(dice1, dice2, dice3)){
    return Chouette(dice1, dice2, dice3);
  }else if(Velute(dice1, dice2, dice3)){
    return Velute(dice1, dice2, dice3);
  }else if(CuldeChouette(dice1, dice2, dice3)){
    return CuldeChouette(dice1, dice2, dice3);
  }else if(Suite(dice1, dice2, dice3)){
    return Suite(dice1, dice2, dice3);
  }else{
    return Neant(dice1, dice2, dice3);
  }
}