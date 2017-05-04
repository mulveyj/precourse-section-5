////////////////////////   Global Variables /////////////////////////
//reference co-ordinates for hangman graphic
var startx = 100;
var starty = 100;

//list of possible answers
var movieList = ['Psycho','Rosemarys Baby','Dont Look Now','The Wicker Man','The Shining','The Exorcist',
    'Nosferatu','Let the Right One In','Vampyr','Peeping Tom','The Innocents','Ringu',
    'The Haunting','Texas Chainsaw Massacre','Dead of Night','The Cabinet of Dr Caligari',
    'Halloween','Bride of Frankenstein','Les Diaboliques','Audition','Dracula','The Blair Witch Project',
    'Evil Dead','Carrie','Les Vampires','Metropolis','Blade Runner','Alien','The Wizard of Oz',
    'ET','Solaris','Spirited Away','Star Wars','Close Encounters','King Kong','Terminator',
    'The Matrix','Alphaville','Back to the Future','Planet of the Apes','Brazil','The Lord of the Rings',
    'Dark Star','Day the Earth Stood Still','Edward Scissorhands','Akira','Princess Bride',
    'Pans Labyrinth','Starship Troopers','Andrei Rublev','Mulholland Drive','Tokyo Story',
    'Citizen Kane','A Clockwork Orange','Days of Heaven','Wild Strawberries','White Ribbon',
    'The Gospel According to St Matthew','Aguirre Wrath of God','Pather Panchali','The Conformist',
    'Death in Venice','The Godfather','The Graduate','There Will Be Blood','Battleship Potemkin',
    'Rules of the Game','Shadows','Distant Voices Still Lives','Passion of Joan of Arc',
    'La Dolce Vita','Breaking the Waves','Spirit of the Beehive','Apocalypse Now',
    'North by Northwest','Once Upon a Time in the West','The Wild Bunch','Deliverance',
    'City of God','Paths of Glory','The Wages of Fear','Crouching Tiger Hidden Dragon',
    'The Thin Red Line','Raiders of the Lost Ark','Bullitt','Ran','Die Hard',
    'The Adventures of Robin Hood','The Searchers','Goldfinger','Full Metal Jacket',
    'Last of the Mohicans','Deer Hunter','Gladiator','Rome Open City','Butch Cassidy',
    'Where Eagles Dare','The Incredibles','Annie Hall','Borat','Some Like it Hot',
    'Team America','Dr Strangelove','The Ladykillers','Duck Soup','Rushmore',
    'Kind Hearts & Coronets','Monty Pythons Life of Brian','Airplane','Election',
    'His Girl Friday','The Big Lebowski','This Is Spinal Tap','Bringing Up Baby',
    'Theres Something About Mary','Dazed and Confused','MASH','Groundhog Day','Clueless',
    'The Great Dictator','Clerks','The Jerk','Shaun of the Dead','Chinatown','Touch of Evil',
    'Vertigo','Badlands','Rashomon','Double Indemnity','Get Carter','Pulp Fiction','Hidden',
    'Goodfellas','The Conversation','Bonnie & Clyde','The Killing','French Connection',
    'The Big Sleep','La Ceremonie','Point Blank','Hard Boiled','Long Good Friday','A Prophet',
    'Heat','Scarface','Millers Crossing','Postman Always Rings Twice','Jour Se Leve','Brief Encounter',
    'Casablanca','Before Sunrise','Before Sunset','Breathless','In the Mood for Love','The Apartment',
    'Hannah & Her Sisters','Eternal Sunshine of the Spotless Mind','Room With a View','Jules et Jim',
    'All That Heaven Allows','Gone with the Wind','An Affair to Remember','Umbrellas of Cherbourg', 
    'Lost in Translation','Roman Holiday','Wall E','My Night With Maud','Voyage to Italy','Dr Zhivago',
    'Harold & Maude','When Harry Met Sally','Say Anything','Fabulous Baker Boys','A Matter of Life & Death']

//possible inputs
var poss = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
            's','t','u','v','w','x','y','z'];

//////////////////////// Define Hangman Object and Methods //////////////////////////
//basic Hangman constructor
function Hangman(ans) {
    this.textAns = ans;
    this.ans = ans.split(' ').map(function(w) {return w.toUpperCase().split('');});
    this.flatAns = ans.split('').map(function(lett) {return lett.toUpperCase();}).filter(function(ch) {return ch!=' ';});
    this.puzz = ans.split(' ').map(function(word) {return chain('_', word.length).split('');});
    this.poss = poss;
    this.penalty = 0;
    this.testChar = "";
    this.success = false;
    this.gameOver = false;
    this.msg = "Prepare to meet thy doom, fool!"; //for initial message
}

Hangman.prototype.getCurrPuzz = function() {
    return this.puzz.map(function(part) {return part.join('.');}).join('/');
}

Hangman.prototype.getPoss = function() {
    return this.poss;
}

Hangman.prototype.setPuzz = function(char) {
    for (i=0; i<this.ans.length;i++) {
        for (j=0;j<this.ans[i].length;j++) {
            if (this.ans[i][j]==char) {
                this.puzz[i][j]=char;
            } 
        }   
    }
}

Hangman.prototype.test = function() {
    //delete char from poss
    this.poss = delItem(this.testChar.toLowerCase(), this.poss);
    //for each word in ans
    if (this.flatAns.indexOf(this.testChar)!=-1) {
        this.setPuzz(this.testChar);
        return 0;
    }
    return 1;
}

//have we guessed the whole thing?
Hangman.prototype.testSuccess = function(){
    var puzzletts = flatten(this.puzz);
    var k = 0;
    this.success = false;
    for (var i = 0; i<puzzletts.length; i++ ) {
        if (puzzletts[i] == this.flatAns[i]) {
            k+=1;
        }
    }
    this.success = ( k == puzzletts.length ? true : false );
    return this.success;
}

/////////////////////  document manipulation and game control flow //////////
// main call on document load
$(document).ready(function(){
    $("#game").hide();
    $("#withcanvas").hide();
    $("#playme").click(function() {

        $("#withcanvas").show();
        drawGallows();
        //choose a movie
        //var ans = movieList[Math.floor(Math.random()*movieList.length)-1];
        var ans = "Let the Right One In";

        //new instance of game
        var hangman = new Hangman(ans); 
        displayGame(hangman);
       
    });
});

function displayGame(game) {
    if (game.gameOver) {
        console.log(game);
        $("#thepuzz").text("The answer was: " + game.textAns);
        $("#avail").hide();
        $("#inputlett").hide();
        $("#message").text(game.msg);
    } else {
        $("#guessval").val("");
        $("#thepuzz").text(game.getCurrPuzz());
        $("#avail").text(game.getPoss());
        $("#message").text(game.msg);
            
        $("#game").show();

        $("#guess").click(function() {
            if ($("#guessval").val()) {
                useGuess(game);
                displayGame(game);
            }
        });
    }
}

function useGuess(game) {
    var inputchar = $("#guessval").val();
    game.testChar = inputchar.toUpperCase();
    if (game.poss.indexOf(game.testChar.toLowerCase())==-1) {
        game.msg = "That is an invalid suggestion, rapscallion!";
    } else {
        var result = game.test();
        game.penalty += result;
        if (game.penalty == 7) {
            drawPenalty(7);
            game.msg = "You died. Yo mama gonna cry.";
            game.gameOver = true;
            console.log("failure");
            console.log(game);
        } else if (game.testSuccess()) {
            game.msg = "You have escaped my noose, varlet.";
            console.log("success");
            game.gameOver = true;
            console.log(game);
        } else if (result == 0) {
            game.setPuzz(inputchar);
            game.msg = "Lucky. Your luck will surely run out...";
        } else {
            drawPenalty(game.penalty);
            game.msg = "Oops. What a shame. Oh well. At least you're alive. For now...";
        }
    }   
}

////////////////////Drawing functions for graphic ///////////////

//canvas and gallows
function drawGallows() {
    var canvas = document.getElementById("canvas1");
    var cx = canvas.getContext("2d");
    cx.strokeStyle = "black";
    cx.lineWidth = 10;
    cx.beginPath();
    //Gallows
    cx.moveTo(startx, starty);
    cx.lineTo(startx,starty-75);
    cx.lineTo(startx+150,starty-75);
    cx.lineTo(startx+150, starty+375);
    cx.moveTo(startx, starty+375);
    cx.lineTo(startx+300, starty+375);
    cx.stroke();
}

//draw person and noose
function drawPenalty(number) {
    var canvas = document.getElementById("canvas1");
    var cx1 = canvas.getContext("2d");
    cx1.strokeStyle = "black";
    cx1.lineWidth = 5;
    cx1.beginPath();
    if (number==1) {
        //Head
        cx1.moveTo(startx+25, starty+25);
        cx1.arc(startx, starty+25, 25, 0, 2*Math.PI);
    } else if (number == 2) {
        //body
        cx1.moveTo(startx, starty+50);
        cx1.lineTo(startx, starty+150);
    } else if(number == 3) {
        //left arm
        cx1.moveTo(startx-50, starty+150);
        cx1.lineTo(startx, starty+75);
    } else if (number == 4) {
        //right arm
        cx1.moveTo(startx, startx+75);
        cx1.lineTo(startx+50, starty+150);
    } else if (number == 5) {
        //left leg
        cx1.moveTo(startx-50, starty+250);
        cx1.lineTo(startx, starty+150);
    } else if (number == 6) {
        //right leg
        cx1.moveTo(startx, startx+150);
        cx1.lineTo(startx+50, starty+250);
    } else if ( number == 7) {
        //noose
        cx1.strokeStyle = "red";
        cx1.moveTo(startx+50, starty+50);
        cx1.arc(startx, starty+50, 50, 0, 2*Math.PI);
    }
    cx1.stroke();
}

//////////////////  Helper functions //////////////////////////////////////////

//helper: creates an array of identical characters
function chain(str, num) {
    return num == 1 ? str : str + chain(str, num-1);
}

//helper: deletes item from array
function delItem(val, arr) {
    var newarr = [];
    for (var i=0; i< arr.length; i++) {
        if (arr[i]!=val) {
            newarr.push(arr[i]);
        }
    }
    return newarr;
}

//helper: flattens multdimensional array
function flatten(arr) {
    return arr.reduce(function(a,b) {return a.concat(b);});
}

