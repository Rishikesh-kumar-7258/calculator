// The function can be made directly using a function in javascript but I am trying to developmy own algorith for this ProcessingInstruction.

// variables for the code
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
    if (e == 'N') answer = solvePost(inTOPost(equation));
    else if (e == 'sq') answer = square(equation);
    else if (e == 'sqrt') answer = root(equation);
    else if (e == 'qb') answer = cube(equation);
    else if (e == 'qroot') answer = cuberoot(equation);
    else if (e == 'percent') answer = percent(equation);
    else if (e == 'factorial') answer = factorial(equation);
    

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

    console.log(old.id, current.id);
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

//function to implement cuberoot
function cuberoot(equation)
{
    let number = parseFloat(equation);
    return Math.cbrt(number);
}

//function to find the percentage of the number
function percent(equation)
{
    let number = parseFloat(equation);
    return number*100;
}

//functionn to find the factorial of the number
function factorial(equation)
{
    let number = parseFloat(equation);
    function fact(number)
    {
        if (number == 1 || number == 0) return 1;

        return number * fact(number - 1);
    }

    return fact(number);
}

// converting the given expression from infixtoPostfix
const precedence = (c) => {

    switch(c)
    {
        case '/':
            return 4;
        case '*':
            return 3;
        case '+': return 2;
        case '-' : return 1;
        default : return 0;

    }
}

const isDigit = (s) =>
{
    let temp =  s.charCodeAt(0) - '0'.charCodeAt(0);

    return (temp >= 0 && temp <= 9);
}
class Stack{

    constructor()
    {
        this.st = [];
        this.size = 0;
    }

    add = a => 
    {
        this.st.push(a);
        this.size++;
    }

    remove = () => {this.size-- ; this.st.pop();}

    empty = () => (this.size == 0);

    top = () => this.st[this.size-1];
}
const inTOPost = (s) => {

    ans = "";

    let st = new Stack();

    for (let i = 0; i < s.length; i++)
    {
        if (isDigit(s[i])) ans += s[i];
        else  
        {
            let before 
            while (!st.empty() && precedence(s[i]) < precedence(st.top())) 
            {
                ans += st.top();
                st.remove();
            }

            st.add(s[i]);
        }

    }

    while (!st.empty())
    {
        ans += st.top();
        st.remove();
    }

    return ans;
}

const calculate = (num1, num2, op) => {

    num1 = parseInt(num1);
    num2 = parseInt(num2);

    
    switch (op)
    {
        case '/':return num1/num2;
        case '*':return num1*num2;
        case '+':return num1+num2;
        case '-':return num1-num2;
        default : "Invalid operation";
    }
    
}

const solvePost = (s) =>
{
    st = new Stack();

    let n = s.length;

    for (let i=0; i<n; i++)
    {
        if (isDigit(s[i])) st.add(s[i]);
        else
        {
            let op = s[i];
            let num2 = st.top();
            st.remove();
            let num1 = st.top();
            st.remove();

            let ans = calculate(num1, num2, op);

            st.add(ans);
        }
    }

    console.log(st.top());
    return st.top();
}

s = "6+2/2-2*2";
solvePost(inTOPost(s));