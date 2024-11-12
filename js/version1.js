//Interface de Node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Score total
let TotalPoints = 0;

//Génération nombre aléatoire dé
function lancerDé() {
  return Math.floor(Math.random() * 6) + 1;
}

//Début génération boucle
function Jeu() {

//Lancer des chouettes
  let de1 = lancerDé();
  let de2 = lancerDé();

  console.log("\x1b[32m%s\x1b[0m", `\n${de1}\n\n${de2}`);

//Lancer du cul
  rl.question('', () => {
    let de3 = lancerDé();
    console.log("\x1b[32m%s\x1b[0m", `${de3}\n`);

//Génération des variables
    let maxDé = Math.max(de1, de2, de3);
    let combinaison;
    let valeur = 0;
    let ChouetteVelute = false;
    let CombinaisonActive = false;

//Chouette-Velute
    if ((de1 === de2 || de1 === de3 || de2 === de3) && (de1 + de2 === de3 || de1 + de3 === de2 || de2 + de3 === de1)){
      combinaison = maxDé;
      valeur = combinaison * combinaison * 2;
      console.log(`Chouette-Velute de \x1b[32m${combinaison}\x1b[0m. + \x1b[36m${valeur}\x1b[0m points.`);
      ChouetteVelute = true;
      CombinaisonActive = true;
      TotalPoints += valeur;
      console.log(`\nVous avez \x1b[36m${TotalPoints}\x1b[0m points.`);
    }

//Cul de Chouette
    if (de1 === de2 && de2 === de3){
      combinaison = maxDé;
      valeur = 40 + 10 * combinaison;
      console.log(`Cul de Chouette de \x1b[32m${combinaison}\x1b[0m. + \x1b[36m${valeur}\x1b[0m points.`);
      CombinaisonActive = true;
      TotalPoints += valeur;
      console.log(`\nVous avez \x1b[36m${TotalPoints}\x1b[0m points.`);
    }

//Chouette
    if ((de1 === de2 || de2 === de3 || de1 === de3) && (de1 !== de2 || de2 !== de3)) {
      combinaison = (de1 === de2) ? de1 : (de1 === de3) ? de1 : de2;
      valeur = combinaison * combinaison;
      if (!ChouetteVelute) {
        console.log(`Chouette de \x1b[32m${combinaison}\x1b[0m. + \x1b[36m${valeur}\x1b[0m points.`);
        CombinaisonActive = true;
        TotalPoints += valeur;
        console.log(`\nVous avez \x1b[36m${TotalPoints}\x1b[0m points.`);
      }
    }

//Velute
    if ((de1 + de2 === de3) || (de2 + de3 === de1) || (de1 + de3 === de2)) {
      combinaison = maxDé
      valeur = combinaison * combinaison * 2;
      if (!ChouetteVelute) {
        console.log(`Velute de \x1b[32m${combinaison}\x1b[0m. + \x1b[36m${valeur}\x1b[0m points.`);
        CombinaisonActive = true;
        TotalPoints += valeur;
        console.log(`\nVous avez \x1b[36m${TotalPoints}\x1b[0m points.`);
      }
    }

//Tri valeurs des dés dans le tableau
    let des = [de1, de2, de3];
    des.sort((a, b) => a - b);

//Suite
    if ((des[0] + 1 === des[1] && des[1] + 1 === des[2]) || (des[2] - 1 === des[1] && des[1] - 1 === des[0])) {
      console.log(`Suite.`);
      CombinaisonActive = true;
      TotalPoints += valeur;
      console.log(`\nVous avez \x1b[36m${TotalPoints}\x1b[0m points.`);
    }

//Néant
    if (!CombinaisonActive) {
      console.log(`Néant.`);
      TotalPoints += valeur;
      console.log(`\nVous avez \x1b[36m${TotalPoints}\x1b[0m points.`);
    }
//Comptage des points et arrêt partie par la fonction return
    if (TotalPoints >= 343) {
        console.log(`\nVous avez gagné la partie !`);
        rl.close();
        return;
    }

    rl.question('\nRelancer les dés ?', (reponse) => {
        if (reponse === '') {
          Jeu();
        } else {
          rl.close();
        }
      });
}
)}

Jeu();