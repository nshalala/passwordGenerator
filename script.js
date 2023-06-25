// let upLetters = /^[A-Z]+$/;
// let lowLetters = /^[a-z]+$/;
// let numbers = /^\d+$/;
// let symbols = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
const lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbersZeroToNine = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const selectedSpecialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'];

let symbols = [upperCaseLetters,lowerCaseLetters,numbersZeroToNine,selectedSpecialCharacters];
let btn = document.querySelector('.generate');
btn.addEventListener('click', display);

let passLeng = document.querySelector('.length');
document.querySelector('#charLeng').addEventListener('input', function(){
    passLeng.innerHTML = this.value;
})

function display() {
    let length = +document.querySelector("#charLeng").value;

    let includeUp = document.querySelector("#upCase").checked;
    let includeLow = document.querySelector("#lowCase").checked;
    let includeNum = document.querySelector("#number").checked;
    let includeSymb = document.querySelector("#symbol").checked;

    let choices = [includeUp, includeLow, includeNum, includeSymb];   

    let res = isEligible(choices);
    if(res) {
        document.querySelector('.password').innerHTML = generatePass(res, length);
        displayStrength(res);
    } else {
        alert('you must select at least one of the choices!!!');
    }
}

function isEligible(choices) {
    let includings = [];
    for (let i = 0; i < choices.length; i++) {
        if (choices[i]) includings.push(i);
    }
    if (includings.length > 0) {
        return includings;
    }
    return false
}

function generatePass(res, length) {
    let arr = [];
    for (let j = 0; j < res.length; j++) {
        arr = arr.concat(symbols[res[j]]);
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        password += arr[rndm(0, arr.length)]
    }
    return password;
}

function displayStrength(includings){
    let l = includings.length
    let strength = (l==1) ? 'low' : (l==4) ? 'strong' : 'medium';
    let code = '';
    for (let i = 0; i < l; i++) {
        code += `<span class="${strength}"></span>`;        
    }
    for (let i = 0; i < 4-l; i++) {
        code += `<span></span>`;     
    }
    document.querySelector('.rate').innerHTML = code;
}

function rndm(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

