const game_el = document.querySelector('#game');
const other_box = document.querySelectorAll('#game .box');
const patterns = [
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
];
let newTurn;

setup();

function setup () {
 game_el.classList.remove('turn-x', 'turn-o');

 for(let box of other_box){
  box.classList.remove('x', 'o');
  box.addEventListener('click',boxfiller ,{once: true});
 }

 newTurn = Math.round(Math.random(0, 1)) == 1 ? 'x' : 'o';
 game_el.classList.add('turn-'+ newTurn);
}

function boxfiller() {
 this.classList.add(newTurn);

 if(didWeWin()){
  const restart = confirm(newTurn.toUpperCase()+ " is the winner!  Do you want to restart?")
 if(restart) setup();
}
else if(isItADraw()) {
 const restart = confirm("It's a draw! Do you want to restart?")
 if(restart) setup();
}
else{
 newTurn = newTurn == 'x' ? 'o' : 'x';
 game_el.classList.remove('turn-o', 'turn-x');
 game_el.classList.add('turn-'+ newTurn);
 }
}

function didWeWin() {
 return patterns.some(pattern => {
   return pattern.every(c => {
    if(other_box[c].classList.contains(newTurn)){
     return true;
    }
    else{
     return false;   
    }
   });
 });
}

function isItADraw () {
 return [...other_box].every(c => {
  if(
    c.classList.contains('x') ||
    c.classList.contains('o') 
  ) {
   return true;
  }
  else{
    return false;
  }
 });
}