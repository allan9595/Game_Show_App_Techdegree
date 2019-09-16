//variables 

const phrase = [
    "I love my puppy",
    "I love startbucks",
    "Knowledge is power",
    "Simplicity is the soul of efficiency",
    "My dog loves me",
    "Black coffee is the best"
];
const keyborad = $("#qwerty");
const phraseElement = $("phrase");
let missed = 0;

const buttonClick = () => {
    $("#qwerty .keyrow button").click((e) => {
        $(e.target).addClass("chosen"); //add chosen class
        $(e.target).prop('disabled', true); //add disabled 
        
        let letterFound = checkLetter($(e.target).text()); //pass the letter to the check letter
    
        //remove a heart if miss one 
        if(letterFound === null){
            $($('#scoreboard ol li')[0]).remove();
            $('#scoreboard ol').append(`<li class="tries"><img src="images/lostHeart.png" height="35px" width="30px"></li>`);
            missed += 1; 
            
        } 
    
        checkWin();
    })
}

const keyboard = () => {
    addEventListener('keyup', (e) => {

        for(let i = 0; i<$("#qwerty .keyrow button").length; i++){
            if(e.key === $($("#qwerty .keyrow button")[i]).text()){
                $($("#qwerty .keyrow button")[i]).addClass("chosen"); //add chosen class
                
                
                let letterFound = checkLetter($($("#qwerty .keyrow button")[i]).text()); //pass the letter to the check letter

                //remove a heart if miss one 
                if(letterFound === null && !$($("#qwerty .keyrow button")[i]).is(":disabled")){
                    $($('#scoreboard ol li')[0]).remove();
                    $('#scoreboard ol').append(`<li class="tries"><img src="images/lostHeart.png" height="35px" width="30px"></li>`);
                    missed += 1; 
                    $($("#qwerty .keyrow button")[i]).prop('disabled', true); //add disabled 
                    checkWin();
                } 

                if(letterFound !== null){
                    checkWin();
                }
            }
        }
       
    })
}

const startGame = () => {
    //start the game
    $(".btn__reset").click(() => {
        buttonAndHeartReset();
        $("#overlay").removeClass("lose");
        $("#overlay").removeClass("win");
        $('#overlay').hide();
        const phraseArray = getRandomPhraseAsArray(phrase);       
        addPhraseToDisplay(phraseArray);
        keyboard();
        buttonClick();
    })
}

const buttonAndHeartReset = () => {
    //reset the buttons keyboard
    $("#qwerty .keyrow").remove();
    $("#qwerty").append(`
        <div class="keyrow">
            <button>q</button><button>w</button><button>e</button><button>r</button><button>t</button><button>y</button><button>u</button><button>i</button><button>o</button><button>p</button>
        </div>
        <div class="keyrow">
          <button>a</button><button>s</button><button>d</button><button>f</button><button>g</button><button>h</button><button>j</button><button>k</button><button>l</button>
        </div>
        <div class="keyrow">
          <button>z</button><button>x</button><button>c</button><button>v</button><button>b</button><button>n</button><button>m</button>
        </div>
    `);
    $('#scoreboard ol li').remove();
    $('#scoreboard ol').append(`
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
    `);
}

//reset the phrase

const resetPhrase = () => {
    missed = 0;
    //reset the phrase displayed
    $("#phrase ul").remove();
    $("#phrase").append("<ul></ul>");
  
}

//get random phrase from the phrase array and return a phrase with splited char
const getRandomPhraseAsArray = (arr) => {
    //get the random number based on the array length
    let randomeNumber = Math.floor(Math.random() * Math.floor(arr.length-1));
    //console.log(randomeNumber);
    let randomArr = arr[randomeNumber].split("");
    return randomArr;
}

//add array to display 

const addPhraseToDisplay = (arr) => {
    
    //loop through each char in the array
    for(let i=0 ; i<arr.length; i++){
        $("#phrase ul").append(`
            <li>${arr[i].toLowerCase()}</li>
        `)
        if(arr[i] != " "){
            $($("#phrase ul li")[i]).addClass("letter"); //add class letter to char
        }

        if(arr[i] == " "){
            $($("#phrase ul li")[i]).addClass("space"); //add class letter to char
        }
    }
}

//check letter func

const checkLetter = (btn) => {
    let matchedVar;
    $("#phrase ul li.letter").each((index, elment) => {
        //return the matched element if matched, else return null
        if($(elment).text() === btn){
            $($("#phrase ul li.letter")[index]).addClass("show");
            matchedVar = $(elment).text();
        }
    })
    if(matchedVar !== undefined){
        return matchedVar;
    }else{
        return null
    }
    
}

//check for won 

const checkWin = () => {
    
    let lengthLetters = $("#phrase ul li.letter").length;
    let lengthShows = $("#phrase ul li.letter.show").length;
    if((lengthLetters === lengthShows) && missed <5 && (lengthLetters !== 0) && (lengthShows !==0)){
        $("#overlay").removeClass("start");
        $("#overlay").addClass("win");
        $("h2.title").text("You Win!");
        $("#overlay").show();
        resetPhrase();
    }

    if((lengthLetters !== lengthShows) && missed >=5 && (lengthLetters !== 0)){
        $("#overlay").removeClass("start");
        $("#overlay").addClass("lose");
        $("h2.title").text("You Lose! Good Luck Next Turn!");
        $("#overlay").show();  
        resetPhrase();
    }
}

startGame();
//event listener on the keyboard





