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


const startGame = () => {
    if($("#phrase ul li").length !==0){
        keyboard();
    }
    //start the game
    $(".btn__reset").click(() => {
        $("#overlay").removeClass("lose");
        $("#overlay").removeClass("win");
        $('#overlay').hide();
        const phraseArray = getRandomPhraseAsArray(phrase);       
        addPhraseToDisplay(phraseArray);
    })
}

//reset the game 

const resetGame = () => {
    missed = 0;
    //reset the phrase displayed
    $("#phrase ul").remove();
    $("#phrase").append("<ul></ul>");
    $('#scoreboard ol li').remove();
    $('#scoreboard ol').append(`
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
        <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
    `);
    //reset the buttons keyboard
    $("#qwerty .keyrow button").each((index, element) => {
        $(element).removeAttr("class");
        $(element).prop('disabled', false); //add disabled 
    })
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
        resetGame();
    }

    if((lengthLetters !== lengthShows) && missed >=5 && (lengthLetters !== 0)){
        $("#overlay").removeClass("start");
        $("#overlay").addClass("lose");
        $("h2.title").text("You Lose! Good Luck Next Turn!");
        $("#overlay").show();
        resetGame();
    }
}

startGame();
//event listener on the keyboard


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


