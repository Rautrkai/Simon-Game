let gameSeq= []; // For tracking game Sequence.

let userSeq= []; // Tracking user Sequence
 
let btns=["yellow","red","purple","green"]; // Array of Color 

let started=false;
let level=0;  //Initally game level is zero
// Displaing on browser with heading 
let h2=document.querySelector("h2");

//Game Started
document.addEventListener("keypress",function() {
    if(started==false){
        console.log("Game Started")
        started=true;

        levelUp();
    }
});

// For button flash 
// Using game flash color change to white
function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function() {
        btn.classList.remove("flash");
    },300);
}
// using user flash when user click on button color tends to green
function userFlash(btn){
    btn.classList.add("userflash")
    setTimeout(function() {
        btn.classList.remove("userflash");
    },300);
}

//Increasing level.
function levelUp(){

    //when user moves to level 2,3 or whatever level we will reset the userSequence
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;


    //random btn choose
    let randidx=Math.floor(Math.random()*3);

    let randColor=btns[randidx];

    let randBtn=document.querySelector(`.${randColor}`)
    
   // console.log(randidx);
    //console.log(randColor);
    //onsole.log(randBtn);

    //Pushing Random color generted in an Array
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);

}

function checkAns(idx){
    console.log("current level: ",level);
   // let idx=level-1;

    if(userSeq[idx]===gameSeq[idx]){

        //if userSeq length ==Game sequence length then LevelUp
        if(userSeq.length===gameSeq.length){
           
           //Adding some to change level 1 to level2
           setTimeout(levelUp,1000);
           //levelUp();
        }
        console.log("same value");
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        reset();
    }
}

// Adding EventListener on Button click
function btnPress (){
  //  console.log(this)
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    //pushing user color in user Sequence
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
  for(btn of allbtns){
      btn.addEventListener("click",btnPress);
  }
  function reset(){
      started=false;
      gameSeq=[];
      userSeq=[];
      level=0;
  }