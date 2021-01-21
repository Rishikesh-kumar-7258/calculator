// The function can be made directly using a function in javascript but I am trying to developmy own algorith for this ProcessingInstruction.

// console.log("You can do it!");

// varaibles for the code
let first = true;

//The function to print the digits on the screeen
function appear(e) {
    let area = document.getElementById("show");
    if (e == '') area.innerText = e;
    else area.innerText += e;
}

// The function to delete one digit at a time
function del() {
    let area = document.getElementById("show");
    let s = area.innerText;

    area.innerText = s.substr(0, s.length - 1);
}

//function to print the answer on the screen
function solve(e) {
    let area = document.getElementById("show");
    let equation = area.innerText;
    let answer;
    if (e == 'N') answer = solveme(equation);
    else if (e == 'sq') answer = square(equation);
    else if (e == 'sqrt') answer = root(equation);
    else if (e == 'qb') answer = cube(equation);

    area.innerText = answer;
}

//function to solve the function on the screen
function solveme(s) {
    let arr = ['/', 'x', '+', '-'];

    let num = [], sign = [];

    let i = 0, j = 0, n = s.length;
    let flag = false;
    if (s[j] == '-') {
        flag = true;
        i = j = 1;
    }

    while (j < n && i < n) {
        if (arr.includes(s[j])) {
            let a = parseFloat(s.substring(i, j));
            if (flag) {
                a *= -1;
                flag = 0;
            }
            num.push(a);
            sign.push(s[j]);
            i = j + 1;
        }

        j++;
    }

    let a = parseFloat(s.substring(i, j));
    num.push(a);

    let ans = num[0];
    for (i = 1, len = num.length; i < len; i++) {
        let operator = sign[i - 1];
        let number = num[i];

        switch (operator) {
            case '+':
                ans += number;
                break;
            case '-':
                ans -= number;
                break;
            case 'x':
                ans *= number;
                console.log(ans);
                break;
            case '/':
                ans /= number;
                break;
            default:
                continue;
        }
    }

    return ans;

}

//function to open a new button set for the user
function open_new() {
    let old = document.getElementById("btnbody");
    let current = document.getElementById("new");

    // old.style.display = "none";
    // current.style.display = "grid"

    if (first == true){
        current.style.display = "none";
        old.style.display = "grid";
        first = false;
    }
    else{
        old.style.display = "none";
        current.style.display = "grid";
        first = true;
    }
}

//The function to implement the square of a number
function square(equation){

    let number = parseFloat(equation);
    return number*number;
}

//function to implement to square root of a function
function root(equation)
{
    let number = parseFloat(equation);
    return Math.sqrt(number);
}

//function to implement cube 
function cube(equation)
{
    let number = parseFloat(equation);
    return Math.pow(number, 3);
}