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
    if (n == 1) return arr[0][0];

    // If the size of matrix is 2 return according to the formula
    if (n == 2)
    {
        return (arr[0][0]*arr[1][1] - arr[1][0]*arr[0][1]);
    }

    // Initialised ans and assigned it to 0
    let ans = 0;

    // looping throgh 1 col only
    for (let i = 0; i< n; i++)
    {
        // getting to next iteration if the current element is 0
        if (arr[i][0] == 0) continue;

        // making a temporary variable to store the new matrix
        let temp = [];

        // looping through all the rows and columns to make the new matrix
        for (let r = 0; r < n; r++)
        {
            // if the element is present in the current row move ahead
            if (r == i) continue;

            let t = [];
            for (let c = 1; c < n; c++)
            {
                t.push(arr[r][c]);
            }

            temp.push(t);
        }

        ans += arr[i][0]*solver(temp)*((1&i == 0) ? 1 : -1);
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

        if (equation[i] === '+' || equation[i] === '-') 
        {
            ans.push(parseFloat(v));
            v = equation[i];
            continue;
        }

        v += equation[i];

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
    let matrix = [];
    let constants = [];
    let variables = [];
    
    for (let i = 0; i < num; i++)
    {
        let equation = document.querySelector(`#equation${i+1}`).value;
        let temp = list_from_equation(equation);
        
        matrix.push(temp.slice(0, -1));
        constants.push(temp[temp.length - 1])
    }

    let  a = solver(matrix);

})