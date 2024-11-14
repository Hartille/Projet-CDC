/*************************************
******** INTERFACE
*************************************/

window.onload = function(){
    window.location.href = "#cul-de-chouette";
  };
  
  /*************************************
  ******** WEB
  *************************************/
  
  function RandomDice(){
    return Math.ceil(Math.random() * 6);
  }
  
  let total = 0;
  let stage = 0;
  
  function LaunchDice(){   
    switch(stage){
      case 0:
        ResetDice();
        stage = 1;
        document.getElementById("launch").innerHTML = "Lancer les chouettes";
        break;
      case 1:
        LaunchChouettes();
        stage = 2;
        document.getElementById("launch").innerHTML = "Lancer le cul";
        break;
      case 2:
        LaunchCul();
        stage = 3;
        document.getElementById("launch").innerHTML = "Jet suivant";
        break;
      case 3:
        ResetDice();
        if(total < 343){
          stage = 1;
          document.getElementById("launch").innerHTML = "Lancer les chouettes";
        }else{
          document.getElementById("launch").innerHTML = "Vous avez gagné la partie !";
          document.getElementById("total").innerHTML = "Total : 0 points";
          setTimeout(() =>{
            stage = 0;
            total = 0;
            document.getElementById("launch").innerHTML = "Commencer une partie";
            document.getElementById("total").innerHTML = "Total : 0 points";
          }, 2000);
        }
        break;
    }
  }
  
  function LaunchChouettes(){
    let dice1 = RandomDice();
    let dice2 = RandomDice();
    let diceImage1 = document.getElementById("Dé1");
    let diceImage2 = document.getElementById("Dé2");
  
    diceImage1.src = "assets/images/chouette" + dice1 + ".png";
    diceImage2.src = "assets/images/chouette" + dice2 + ".png";
  }
  
  function LaunchCul(){
    //ICI
    let resultatCombinaison = document.getElementById("RealizedCombination");
    //ICI
    let dice3 = RandomDice();
    let comb = combinaison(parseInt(document.getElementById("Dé1").src.substr(-5, 1)),parseInt(document.getElementById("Dé2").src.substr(-5, 1)),dice3);
    let diceImage3 = document.getElementById("Dé3");
    
    diceImage3.src = "assets/images/cul" + dice3 + ".png";

    document.getElementById("comb"+comb.id).style.backgroundColor = '#6f9457';
   
    if(comb.value !== undefined){
        resultatCombinaison.innerHTML = `+ ${comb.score} points`;
        total += comb.score;      
    }else{
        resultatCombinaison.innerHTML = '';
    }

    let scoreElement = document.getElementById("points" + comb.id);
    scoreElement.innerHTML = `+ ${comb.score} points`;
    document.getElementById("total").innerHTML = `Total : ${total} points`;
  }

  function ResetDice(){
    let diceImage1 = document.getElementById("Dé1");
    let diceImage2 = document.getElementById("Dé2");
    let diceImage3 = document.getElementById("Dé3");
  
    diceImage1.src = "assets/images/empty.png";
    diceImage2.src = "assets/images/empty.png";
    diceImage3.src = "assets/images/empty.png";

    let resetComb = document.querySelectorAll(".comb");
    resetComb.forEach(element => {element.style.backgroundColor = "#353535";});

    let resetPoints = document.querySelectorAll(".points");
    resetPoints.forEach(element => {element.innerHTML = "";});
  }
  
  /*************************************
  ******** FONCTIONNEMENT DU JEU
  *************************************/
  
  //Fonction du Cul de Chouette
  function CuldeChouette(dice1, dice2, dice3){
    let result = new Object();
    result.name = "Cul de Chouette";
    result.id = 1;
    result.score = 40+10*dice1;
    result.value = dice1;
    return dice1===dice2 && dice2===dice3 ? result : false;
  }
  
  //Fonction de la Chouette
  function Chouette(dice1, dice2, dice3){
    let combination = (dice1===dice2 && dice1!==dice3) ? dice1 : (dice2===dice3 && dice2 !==dice1) ? dice2 : (dice1===dice3 && dice1!==dice2) ? dice1 : 0;
    let result = new Object();
    result.name = "Chouette";
    result.id = 2;
    result.score = combination**2;
    result.value = combination;
    return (dice1===dice2 && dice1!==dice3) || (dice2===dice3 && dice2 !==dice1) || (dice1===dice3 && dice1!==dice2) ? result : false;
  }
  
  //Fonction de la Velute
  function Velute(dice1, dice2, dice3){
      let result = new Object();
      result.name = "Velute";
      result.id = 3;
      result.score = 2*Math.max(dice1, dice2, dice3)**2;
      result.value = Math.max(dice1, dice2, dice3);
      return (dice1 + dice2 === dice3) || (dice2 + dice3 === dice1) || (dice1 + dice3 === dice2) ? result : false;
    }
  
  //Fonction de la Chouette-Velute
  function ChouetteVelute(dice1, dice2, dice3){
    let result = new Object();
    result.name = "Chouette-Velute";
    result.id = 4;
    result.score = 2*Math.max(dice1, dice2, dice3)**2;
    result.value = Math.max(dice1, dice2, dice3);
    return Chouette(dice1, dice2, dice3) && Velute(dice1, dice2, dice3) ? result : false;
  }
  
  //Fonction de la Suite
  function Suite(dice1, dice2, dice3){
    let dices = [dice1, dice2, dice3];
    dices.sort((a, b) => a - b);
  
    let result = new Object();
    result.name = "Suite";
    result.id = 5;
    result.score = 0;
    return dices[1]===dices[0]+1 && dices[2]===dices[1]+1 ? result : false;
  }
  
  //Fonction du Néant
  function Neant(dice1, dice2, dice3){
    let result = new Object();
    result.name = "Néant";
    result.id = 6;
    result.score = 0;
    return result;
  }
  
  function combinaison(dice1, dice2, dice3){
    if(ChouetteVelute(dice1, dice2, dice3)){
      return ChouetteVelute(dice1, dice2, dice3);
    }else if(Chouette(dice1, dice2, dice3)){
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