// ========================== Equation solver =========================
// function to solve the matrix
function solver(arr)
{
    // size of the square matrix
    let n = arr.length;

    // // checking if the matrix is a square matrix
    // assert(n == arr[0].length);

    // // checking if it is not an empty matrix
    // assert(n >= 1);
    
    // If the size of matrix is 1 return the only element
    if (n === 1) return arr[0][0];

    // If the size of matrix is 2 return according to the formula
    if (n === 2)
    {
        return (arr[0][0]*arr[1][1] - arr[1][0]*arr[0][1]);
    }

    // Initialised ans and assigned to 0
    let ans = 0;

    // looping throgh 1 col only
    for (let i = 0; i< n; i++)
    {
        // getting to next iteration if the current element is 0
        if (arr[i][0] === 0) continue;

        // making a temporary variable to store the new matrix
        let temp = [];

        // looping through all the rows and columns to make the new matrix
        for (let r = 0; r < n; r++)
        {
            // if the element is present in the current row move ahead
            if (r === i) continue;

            let t = [];
            for (let c = 1; c < n; c++)
            {
                t.push(arr[r][c]);
            }

            temp.push(t);
        }

        ans += arr[i][0]*solver(temp)*Math.pow(-1, i);
    }

    return ans;
}

// function to convert a equation into an array of constants
function list_from_equation(equation)
{
    let ans = [];

    let v = "";
    let i = -1;
    while (equation[++i] !== '=')
    {
        if (equation[i] === ' ') continue;

        v += equation[i];

        if (equation[i] === '+' || equation[i] === '-') 
        {
            if (v.length === 1) ans.push(1);
            else ans.push(parseFloat(v));
            v = equation[i];
        }

    }

    ans.push(parseFloat(v));
    v = "";

    while (++i < equation.length)
    {
        v += equation[i];
    }
    ans.push(parseFloat(v));

    return ans;
}
// ====================== DOM =============

// number of variables
let num = 2

document.querySelector(".ok-btn").addEventListener("click", function(){

    num = document.querySelector("#variables").value;
    document.querySelector("#variables").value = "";

    document.querySelector(".input-equations").innerHTML = "";

    for (let i = 0; i < num; i++)
    {
        let input = document.createElement("input")
        input.type = "text";
        input.classList.add("form-control");
        input.classList.add("my-2");
        input.placeholder = `equation${i+1}`;
        input.id = `equation${i+1}`;
        document.querySelector(".input-equations").appendChild(input);
    }
})

document.querySelector(".solve-btn").addEventListener('click', function()
{
    const matrix = [];
    const constants = [];
    
    for (let i = 0; i < num; i++)
    {
        let equation = document.querySelector(`#equation${i+1}`).value;
        if (equation.length === 0) return;
        let temp = list_from_equation(equation);

        matrix.push(temp.slice(0, num));
        constants.push(temp[num]);
    }


    var a = solver(matrix);

    const answers = [];

    let i = 0;

    for (let i = 0; i < num; i++){

        const temp = [];

        matrix.forEach(element => {

            temp.push(element.slice(0));
        })

        for (let j = 0; j < num; j++) temp[j][i] = constants[j];

        answers.push(solver(temp) / a);

    };

    for (let i = 0; i < num; i++) answers[i] = (Math.round(answers[i]*100) / 100);

    document.querySelector(".answer").innerText = answers;

})

document.querySelector(".help").addEventListener("click", function()
{
    document.querySelector(".instructions").classList.toggle('hide');
})

// ================================= First page ==========================

// selecting all the options on the navbar
let options = document.querySelectorAll(".calc-opt");

// Iterating over all the options and adding click eventlistener to it
options.forEach((element, index) => {
    element.addEventListener('click', function(){
        options.forEach((e, i) => {
            e.classList.remove('active');

            document.querySelector(`.c${i+1}`).classList.add("hide");
        })

        element.classList.add('active');
        document.querySelector(`.c${index+1}`).classList.remove("hide");
        document.querySelector(".ham-info").innerText = element.innerText;
    })

});

// Adding event listener in hamburger menu
document.querySelector(".hamburger").addEventListener('click', function(){

    options.forEach(e => {
        
        e.classList.toggle('hide');
    })
})

// Adding event listener in window to caputre resize
if (window.outerWidth <= 768)
    {
        options.forEach(e => {
            if (!e.classList.contains("hide"))
            {
                e.classList.add("hide");
            }
        })
    }

    if (window.outerWidth > 768)
    {
        options.forEach(e => {
            e.classList.remove("hide");
        })
    }

window.addEventListener("resize", function(){

    if (this.outerWidth <= 768)
    {
        options.forEach(e => {
            if (!e.classList.contains("hide"))
            {
                e.classList.add("hide");
            }
        })
    }

    if (this.outerWidth > 768)
    {
        options.forEach(e => {
            e.classList.remove("hide");
        })
    }
})

// Eventlisterner on buttons to capture the click event
let num_keys = document.querySelectorAll(".numpad > .row > div");
const curr_screen = document.querySelector(".eq");
const ans_screen = document.querySelector(".ans_display");

num_keys.forEach(element => {
    element.addEventListener("click", function(){

        // console.log(element.innerText);

        switch (element.innerText) {
            case 'C':
                curr_screen.innerText = '0';
                ans_screen.innerText = '0';
                break;
            case '=':
                let equation = curr_screen.innerText;
                equation = equation.replace(/x/g, '*');
                ans_screen.innerText = Math.round(eval(equation)*100) / 100;
                break;
            case '':
                if (curr_screen.innerText.length === 1) curr_screen.innerText = '0';
                else curr_screen.innerText = curr_screen.innerText.slice(0, -1);
                break;
            case '.':
                if (curr_screen.innerText.includes('.')) break;
                curr_screen.innerText += element.innerText;
                break;
            case '1/x':
                let ans = 1/parseFloat(curr_screen.innerText);
                ans_screen.innerText = Math.round(ans * 100) / 100;
                break;
            case 'x^2':
                let n = parseFloat(curr_screen.innerText);
                ans_screen.innerText = n*n;
                break;
            case 'sqrt':
                ans_screen.innerText = Math.sqrt(parseFloat(curr_screen.innerText));
                break;
            case 'cbrt':
                let n1 = Math.cbrt(parseFloat(curr_screen.innerText))
                ans_screen.innerText = Math.round(n1 * 100) / 100;
                break;
            default:
                if (curr_screen.innerText === '0') curr_screen.innerText = element.innerText;
                else curr_screen.innerText += element.innerText;
                break;
        }
    })
})

// ======================== Currency Exchange ========================
// api link http://data.fixer.io/api/latest?access_key=af387b3a5fa22ddbe503371b8632f81a

fetch("http://data.fixer.io/api/latest?access_key=af387b3a5fa22ddbe503371b8632f81a").then(response => {
    return response.json();
}).then((data) => {
    let rates = data.rates;

    Object.entries(rates).forEach(([key, value]) => {
        let option = `<option value="${value}">${key}</option>`;

        let currency = document.querySelectorAll(".currency");
        currency.forEach(element => {
            element.innerHTML += option;
        })
    });
})

document.querySelector(".converter").addEventListener("click", function(){
    let from = document.querySelector("#currency1").value;
    let to = document.querySelector("#currency2").value;

    let ans = (to * document.querySelector(".currency-to-convert").value) / from;

    document.querySelector(".currency-converted").value = ans;
})

// ============================= Graph Plotter =======================
var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-5, 2, 5, -2]});
var p1 = b.create('point',[-1,1], {name:'A',size:0});
var p2 = b.create('point',[2,-1], {name:'B',size:0});
var li = b.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});