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

function LaunchDice(number) {
    function RandomDice() {
        return Math.ceil(Math.random() * 6);
    }
    let finalValue = RandomDice();
    AnimateDice(number, finalValue); // Appelle l'animation pour ce dé
    return finalValue;
}

function AnimateDice(number, finalValue, duration = 1000) {
    const diceElement = document.getElementById("Dé" + number);

    // Ajoute la classe pour déclencher le tremblement
    diceElement.classList.add("dice-shaking");

    // Durée pendant laquelle les images aléatoires sont affichées
    let elapsed = 0;
    const interval = 250; // Intervalle plus lent entre chaque changement d'image

    const intervalId = setInterval(() => {
        // Affiche un dé aléatoire pendant l'animation
        const randomValue = Math.ceil(Math.random() * 6);
        diceElement.src = "assets/images/dice" + randomValue + ".png";
        elapsed += interval;

        // Si on dépasse la durée totale, arrêter l'animation
        if (elapsed >= duration) {
            clearInterval(intervalId);
            // Affiche la valeur finale et arrête le tremblement
            diceElement.src = "assets/images/dice" + finalValue + ".png";
            diceElement.classList.remove("dice-shaking");
        }
    }, interval);
}

function SelectCombination(combinaison){
    let comb = combination();
    if (combinaison === comb.name && comb.score !== 0){
        document.getElementById("combination").innerHTML = `${comb.name} de ${comb.value}`;
        document.getElementById("combination").style.backgroundColor = '#353535';
        document.getElementById("points").innerHTML = `+ ${comb.score}`;
        document.getElementById("points").style.backgroundColor = '#353535';
        total += comb.score;
        document.getElementById("total").innerHTML = total;
    } else if(combinaison === comb.name && comb.score == 0){
        document.getElementById("combination").innerHTML = `${comb.name}`;
        document.getElementById("combination").style.backgroundColor = '#353535';
    } else{ //Ajout de mistake pour dynamiser la Bévue (let mistake)
        let mistake = total < 5 ? total : 5;
        document.getElementById("points").innerHTML = `- ${mistake}`;
        document.getElementById("points").style.backgroundColor = '#353535';
        document.getElementById("blunder").style.backgroundColor = '#353535';
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
function CuldeChouette() {
    return dés[0]===dés[1] && dés[1]===dés[2] ? ObjetCombination("Cul de Chouette", 40 + 10 * dés[0], dés[0]) : false;
}

//Fonction Chouette
function Chouette() {
    dés.sort();
    let combination = (dés[0] === dés[1] && dés[1] !== dés[2]) ? dés[0] : (dés[1] === dés[2] && dés[0] !== dés[1]) ? dés[1] : 0;
    return combination ? ObjetCombination("Chouette", combination ** 2, combination) : false;
}
/*
if(dice0 === dice1 || dice0 === dice2) return dice0
else if (dice1 === dice2) return dice1
else return 0
*/

// Fonction Velute
function Velute() {
    [...dés].sort((a, b) => a - b);
    let combination = dés[2];
    return (dés[0] + dés[1] === dés[2]) ? ObjetCombination("Velute", 2 * combination ** 2, combination) : false;
}

//Fonction Chouette-Velute
function ChouetteVelute(){
    let combination = (Math.max(dés[0], dés[1], dés[2]));
    return Chouette(dés[0], dés[1], dés[2]) && Velute(dés[0], dés[1], dés[2]) ? ObjetCombination("Chouette-Velute", 2*combination**2, combination) : false;
}

//Fonction Suite
function Suite(){
    dés.sort((a, b) => a - b);
    return dés[1]===dés[0]+1 && dés[2]===dés[1]+1 ? ObjetCombination("Suite") : false;
}

//Fonction Néant
function Neant(){
    return ObjetCombination("Néant");
}

function combination(){
  return ChouetteVelute() || Chouette() || Velute() || CuldeChouette() || Suite() || Neant();
}