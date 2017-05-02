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
    this.ans = ans.split(' ').map(function(w) {return w.toUpperCase().split('');});
    this.flatAns = ans.split('').map(function(lett) {return lett.toUpperCase();}).filter(function(ch) {return ch!=' ';});
    this.puzz = ans.split(' ').map(function(word) {return chain('_', word.length).split('');});
    this.poss = poss;
    this.penalty = 0;
    this.testChar = "";
    this.success = false;
    this.gameOver = false;
    this.msg = "OK, let's dance."; //for initial message
}

$(document).ready(function(){
    $("#game").hide();
    $("#playme").click(function() {
        //hangman.showInterface();
        //choose a movie
        var ans = movieList[Math.floor(Math.random()*movieList.length)-1];

        //new instance of game
        //var hangman = new Hangman(ans);
        

        $("#game").show();
    });
});


