var ans = "The Godfather";

var poss = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
            's','t','u','v','w','x','y','z'];

function Hangman(ans) {
    this.ans = ans.split(' ').map(function(w) {return w.toUpperCase().split('');});
    this.flatAns = ans.split('').map(function(lett) {return lett.toUpperCase();}).filter(function(ch) {return ch!=' ';});
    this.puzz = ans.split(' ').map(function(word) {return chain('_', word.length).split('');});
    this.poss = poss;
    this.penalty = 0;
}

Hangman.prototype.test = function(char) {
    var self = this;
    //first check valid input
    char = char.length==1 ? char.toUpperCase() : "Error"
    //delete char from poss
    self.poss = delItem(char.toLowerCase(), self.poss);
    //for each word in ans
    if (self.flatAns.indexOf(char)!=-1) {
        self.puzz = self.puzz.map(function(word, i) {
        return word.map(function(_, j) {
            return self.ans[i][j]==char ? char : '_';
        });
    });
    return 0;
    }
    return 1;
}

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

var hangman = new Hangman(ans);
console.log(hangman.test('h'), hangman.puzz, hangman.poss);
