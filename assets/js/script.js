/*************************************
******** INTERFACE
*************************************/

window.onload = function(){window.location.href = "#cul-de-chouette";};

/*************************************
******** WEB
*************************************/

let total = 0;
let stage = 0;
let dés = [];

let block = document.querySelectorAll(".block");
let Held = function(event){SelectCombination(event.target.innerHTML);};
StartEnable();

function LaunchDices(){
    switch (stage) {
        case 0:
            ResetDice();
            stage = 1;
            document.getElementById("start").innerHTML = "Lancer les chouettes";
            BlockDisable();
            break;
        case 1:
            dés[0] = LaunchDice(1);
            dés[1] = LaunchDice(2);
            stage = 2;
            document.getElementById("start").innerHTML = "Lancer le cul";
            BlockDisable();
            break;
        case 2:
            dés[2] = LaunchDice(3);
            stage = 3;
            document.getElementById("start").innerHTML = "Jet suivant";
            BlockEnable();
            StartDisable();
            break;
        case 3:
            ResetDice();
            if (total < 343){
                stage = 1;
                document.getElementById("start").innerHTML = "Lancer les chouettes";
                StartEnable();
            }else{
                document.getElementById("start").innerHTML = "Vous avez gagné la partie !";
                document.getElementById("total").innerHTML = "0";
                setTimeout(() => {
                    stage = 0;
                    total = 0;
                    document.getElementById("start").innerHTML = "Commencer une partie";
                    document.getElementById("total").innerHTML = "0";
                }, 2000);
            }
            break;
    }
}

function LaunchDice(number){
    function RandomDice(){
        return Math.ceil(Math.random() * 6);
    }
    let dice = RandomDice();
    document.getElementById("Dé" + number).src = "assets/images/dice" + dice + ".png";
    return dice;
}

function SelectCombination(combinaison){
    let comb = combination();
    if (combinaison === comb.name && comb.score !== 0){
        document.getElementById("combination").innerHTML = `${comb.name} de ${comb.value}`;
        document.getElementById("combination").style.backgroundColor = '#606060';
        document.getElementById("points").innerHTML = `+ ${comb.score}`;
        document.getElementById("points").style.backgroundColor = '#606060';
        total += comb.score;
        document.getElementById("total").innerHTML = total;
    } else if(combinaison === comb.name && comb.score == 0){
        document.getElementById("combination").innerHTML = `${comb.name}`;
        document.getElementById("combination").style.backgroundColor = '#606060';
    } else{
        let mistake = total < 5 ? total : 5;
        document.getElementById("points").innerHTML = `- ${mistake}`;
        document.getElementById("points").style.backgroundColor = '#606060';
        document.getElementById("blunder").style.backgroundColor = '#4682b4';
        total = Math.max(0, total - mistake);
        document.getElementById("total").innerHTML = total;
    }
    BlockDisable();
    StartEnable();
}

function ResetDice(){
    document.getElementById("Dé1").src = "assets/images/dice0.png";
    document.getElementById("Dé2").src = "assets/images/dice0.png";
    document.getElementById("Dé3").src = "assets/images/dice0.png";
    document.getElementById("combination").innerHTML = '';
    document.getElementById("combination").style.backgroundColor = '';
    document.getElementById("points").innerHTML = '';
    document.getElementById("points").style.backgroundColor = '';
    document.getElementById("blunder").style.backgroundColor = '';
}

function BlockDisable(){
    block.forEach(function (item){
        item.removeEventListener('click', Held);
    });
}

function BlockEnable(){
    block.forEach(function (item){
        item.addEventListener('click', Held);
    });
}

function StartDisable(){
    document.getElementById("start").removeEventListener('click', LaunchDices);
}

function StartEnable(){
    document.getElementById("start").addEventListener('click', LaunchDices);
}


/*************************************
******** FONCTIONNEMENT DU JEU
*************************************/

//Fonction ObjetCombination
function ObjetCombination(name, score = 0, value = 0){
    return {name, score, value};
}

//Fonction Cul de Chouette
function CuldeChouette(dice1, dice2, dice3) {
    return dés[0]===dés[1] && dés[1]===dés[2] ? ObjetCombination("Cul de Chouette", 40 + 10 * dés[0], dés[0]) : false;
}

//Fonction Chouette
//Si tous les dés ne sont pas égaux, mais que deux sont égaux ? (reformulation pour simplifier la variable let combination car c'est assez verbeux)
function Chouette(){
    let combination = (dés[0]===dés[1] && dés[0]!==dés[2]) ? dés[0] : (dés[1]===dés[2] && dés[1] !==dés[0]) ? dés[1] : (dés[0]===dés[2] && dés[0]!==dés[1]) ? dés[0] : 0;
    return (dés[0]===dés[1] && dés[0]!==dés[2]) || (dés[1]===dés[2] && dés[1] !==dés[0]) || (dés[0]===dés[2] && dés[0]!==dés[1]) ? ObjetCombination("Chouette", combination**2, combination) : false;
}

//Fonction Velute
function Velute(){
  let result = new Object();
  result.name="Velute";
  result.score=2*Math.max(dés[0], dés[1], dés[2])**2;
  result.value=Math.max(dés[0], dés[1], dés[2]);
  return (dés[0] + dés[1] === dés[2]) || (dés[1] + dés[2] === dés[0]) || (dés[0] + dés[2] === dés[1]) ? result : false;
}

//Fonction Chouette-Velute
function ChouetteVelute(){
  let result = new Object();
  result.name="Chouette-Velute";
  result.score=2*Math.max(dés[0], dés[1], dés[2])**2;
  result.value=Math.max(dés[0], dés[1], dés[2]);
  return Chouette(dés[0], dés[1], dés[2]) && Velute(dés[0], dés[1], dés[2]) ? result : false;
}

//Fonction Suite
function Suite(){
  dés.sort((a, b) => a - b);
  let result = new Object();
  result.name="Suite";
  result.score=0;
  return dés[1]===dés[0]+1 && dés[2]===dés[1]+1 ? result : false;
}

//Fonction Néant
function Neant(){
  let result = new Object();
  result.name="Néant";
  result.score=0;
  return result;
}

function combination(){
  if(ChouetteVelute()){
      return ChouetteVelute();
  }else if(Chouette()){
      return Chouette();
  }else if(Velute()){
      return Velute();
  }else if(CuldeChouette()){
      return CuldeChouette();
  }else if(Suite()){
      return Suite();
  }else{
      return Neant();
  }
}