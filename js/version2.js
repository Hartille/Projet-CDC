//Interface de Node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Génération des dés
function LaunchDice(){
  return Math.floor(Math.random() * 6) + 1;
}

//Variable score total hors de la boucle pour éviter qu'elle ne se réinitialise
let total = 0;

//Génération de la boucle
function Game(){

  //Lancement des deux premiers dés
  let dice1 = LaunchDice();
  let dice2 = LaunchDice();
  console.log(`\n${dice1}\n\n${dice2}`);

  //Lancement du troisième dé si on appuie sur Enter
  rl.question('', () => {
    let dice3 = LaunchDice();
    console.log(`${dice3}\n`);

  //Fonction qui permet de sélectionner le dé qui a la plus grande valeur
  function MaxDice(dice1, dice2, dice3){
    return Math.max(dice1, dice2, dice3);
  }

  //Fonction centrale qui regroupe chaque condition de chaque combinaison
  function CheckCombination(type){
    switch (type){
      case 'chouette' :
        return (dice1 === dice2 || dice2 === dice3 || dice1 === dice3) && (dice1 !== dice2 || dice2 !== dice3);
      case 'velute' :
        return (dice1 + dice2 === dice3) || (dice2 + dice3 === dice1) || (dice1 + dice3 === dice2);
      case 'cdc' :
        return dice1 === dice2 && dice2 === dice3;
      case 'cv' :
        return Velute(dice1, dice2, dice3) && Chouette(dice1, dice2, dice3);
      case 'suite' :
        let dices = [dice1, dice2, dice3];
        dices.sort((a, b) => a - b);
        return ((dices[0] + 1 === dices[1] && dices[1] + 1 === dices[2]) || (dices[2] - 1 === dices[1] && dices[1] - 1 === dices[0]));
      case 'neant' :
        return !CulDeChouette(dice1, dice2, dice3)
            && !Chouette(dice1, dice2, dice3)
            && !Velute(dice1, dice2, dice3)
            && !ChouetteVelute(dice1, dice2, dice3)
            && !Suite(dice1, dice2, dice3);
      default:break
    }
  }

  //Fonction centrale qui retourne un tableau contenant le nom de la combinaison et les points obtenus selon la combinaison obtenue
  function Combination(dice1, dice2, dice3){
    let tab=[];
    if(CulDeChouette(dice1, dice2, dice3)){
      tab=CulDeChouette(dice1, dice2, dice3); 
    }else if(ChouetteVelute(dice1, dice2, dice3)){
      tab=ChouetteVelute(dice1, dice2, dice3);
    }else if(Chouette(dice1, dice2, dice3)){
      tab=Chouette(dice1, dice2, dice3);
    }else if(Velute(dice1, dice2, dice3)){
      tab=Velute(dice1, dice2, dice3);
    }else if(Suite(dice1, dice2, dice3)){
      tab=Suite(dice1, dice2, dice3);
    }else if(Neant(dice1, dice2, dice3)){
      tab=Neant(dice1, dice2, dice3);
      }
    return tab;
  }

  //Fonction du Cul de Chouette
  function CulDeChouette(dice1, dice2, dice3){
    if (CheckCombination('cdc')){
      let combination = MaxDice(dice1, dice2, dice3);
      value = 40 + 10 * combination;
      return [`Cul de Chouette de \x1b[31m${combination}\x1b[0m.`, `+ \x1b[36m${value}\x1b[0m points.`];
    }
  }

  function CuldeChouette2(dice1, dice2, dice3){
    let result = new Object();
    result.name="Cul de Chouette";
    result.score=40+10*Math.max(dice1, dice2, dice3);
    return dice1==dice2 && dice2==dice3 ? result : false;
  }

  //Fonction de la Chouette
  function Chouette(dice1, dice2, dice3){
    if (CheckCombination('chouette')){
      let combination = (dice1 === dice2) ? dice1 : (dice1 === dice3) ? dice1 : dice2;
      value = combination**2; 
      return [`Chouette de \x1b[31m${combination}\x1b[0m.`, `+ \x1b[36m${value}\x1b[0m points.`];
    }
  }

  //Fonction de la Velute
  function Velute(dice1, dice2, dice3){
    if (CheckCombination('velute')){
      let combination = MaxDice(dice1, dice2, dice3);
      value = 2 * (combination ** 2);
      return [`Velute de \x1b[31m${combination}\x1b[0m.`, `+ \x1b[36m${value}\x1b[0m points.`];
    }
  }

  //Fonction de la Chouette-Velute
  function ChouetteVelute(dice1, dice2, dice3){
    if (CheckCombination('cv')){
      let combination = MaxDice(dice1, dice2, dice3);
      value = 2 * (combination ** 2);
      return [`Chouette-Velute de \x1b[31m${combination}\x1b[0m.`, `+ \x1b[36m${value}\x1b[0m points.`];
    }
  }

  //Fonction de la Suite
  function Suite(dice1, dice2, dice3){
    if (CheckCombination('suite')){
      value = 0;
      return ["Suite."];
    }
  }

  //Fonction du Néant
  function Neant(dice1, dice2, dice3){
    if (CheckCombination('neant')){
      value = 0;
      return ["Néant."];
    }
  }

  //Affichage de la combinaison et du nombre de points obtenus ainsi que du score total
  let value;
  let result = Combination(dice1, dice2, dice3);
  console.log(result[0], result[1] ? result[1] : "");
  total+=value;
  console.log(`\nVous avez \x1b[36m${total}\x1b[0m points.`);

  //Vérifie que le score total est inférieur à 343. Le cas contraire, met fin à la partie
  if (total >= 343) {
    console.log(`\nVous avez gagné la partie !`);
    rl.close();
    return;
}

  //Relancement de la boucle
  rl.question('\nRelancer les dés ?', (answer) => {
    if(answer === ''){
      Game();
    }else{
      rl.close();
    }
  })
  })
}

Game();