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


//get random phrase from the phrase array and return a phrase with splited char
const getRandomPhraseAsArray = (arr) => {
    //console.log(arr.length);
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

//start the game
$(".btn__reset").click(() => {
    $('.start').hide();
    const phraseArray = getRandomPhraseAsArray(phrase);
    
    addPhraseToDisplay(phraseArray);
})

//event listener on the keyboard

$("#qwerty .keyrow button").click((e) => {
    $(e.target).addClass("chosen"); //add chosen class
    $(e.target).attr("disabled"); //add disabled 
    
    let letterFound = checkLetter($(e.target).text()); //pass the letter to the check letter
    console.log(letterFound);
})