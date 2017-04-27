var ans = "The Godfather";

var poss = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
            's','t','u','v','w','x','y','z'];

function Hangman(ans) {
    this.ans = ans;
    this.puzz = ans.split(' ').map(function(word) {return chain('_', word.length);});
}

function chain(str, num) {
    return num == 1 ? str : str + chain(str, num-1);
}

console.log(chain('+', 7));