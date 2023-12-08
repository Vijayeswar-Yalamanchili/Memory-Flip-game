const boxes = document.querySelector(".boxes");
const colors = ["red","blue","violet","orange","lightgreen","brown","aqua","yellow"]

const colorsList = [...colors,...colors];
const boxLength = colorsList.length;

// Initializing the main elements of game state
let revealCount = 0;
let activeBox = null;
let waitingTime = false;

//fun to display the boxes in webpage
function buildBoxes(color){
    const element = document.createElement("div")
    element.classList.add("box");
    // element.className = "box";
    element.setAttribute("data-color",color);           //"data-color" used for mapping the color
    element.setAttribute("data-revealed","false");      //used to check the revealed boxes

    //adding event listener
    element.addEventListener("click",()=>{
        const revealed = element.getAttribute("data-revealed");

        //to display boxes & checking for reveal & checking the current element
        if(waitingTime || revealed === "true" || element === activeBox){
            return;
        }
        element.style.backgroundColor = color;

        //checking the active box
        if(!activeBox){
            activeBox = element; 
            return;
        }

        //logic for matching color & winning condition
        const colorMatch = activeBox.getAttribute("data-color");
        if(colorMatch === color){
            activeBox.setAttribute("data-revealed","true");
            element.setAttribute("data-revealed","true");
            waitingTime = false;
            activeBox = null;            
            revealCount += 2;
            if(revealCount === boxLength){
                alert("Congratulations!!! You Won the game , Refresh to play again")
            }
            return;
        }

        //Change the waiting time to true and using setTimeout for transition
        waitingTime = true;
        setTimeout(()=> {
            element.style.backgroundColor = null;
            activeBox.style.backgroundColor = null;
            waitingTime = false;
            activeBox = null;
        },1000)
    })    
    return element;
}

//building the boxes for the game 
for(let i=0;i<boxLength;i++){
    //code to display the random colors in boxes
    const randomIndex = Math.floor(Math.random()*colorsList.length);
    const color = colorsList[randomIndex];

    //calling the fuction to display boxes
    const box = buildBoxes(color)

    //using splice to avoid 3 repeated calls
    colorsList.splice(randomIndex,1)

    //appending to boxes
    boxes.appendChild(box);
}