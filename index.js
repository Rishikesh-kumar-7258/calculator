// The function can be made directly using a function in javascript but I am trying to developmy own algorith for this ProcessingInstruction.

// console.log("You can do it!");

function appear(e) {
    let area = document.getElementById("show");
    if (e == '') area.innerText = e;
    else area.innerText += e;
}

function del() {
    let area = document.getElementById("show");
    let s = area.innerText;

    area.innerText = s.substr(0, s.length - 1);
}

function solve() {
    let area = document.getElementById("show");
    let equation = area.innerText;
    area.innerText = solveme(equation);
}

function solveme(s)
{
    let  arr = ['/', 'x', '+', '-'];

    let num = [], sign = [];

    let i = 0, j = 0, n = s.length;
    let flag = false;
    if (s[j] == '-')
    {
        flag = true;
        i = j = 1;
    }

    while (j < n && i < n)
    {
        if (arr.includes(s[j]))
        {
            let a = parseFloat(s.substring(i,j));
            if (flag) 
            {
                a *= -1;
                flag = 0;
            }
            num.push(a);
            sign.push(s[j]);
            i = j + 1;
        }

        j++;
    }

    let a = parseFloat(s.substring(i,j));
    num.push(a);

    let ans = num[0];
    for( i=1, len = num.length; i < len; i++){
        let operator = sign[i-1];
        let number = num[i];

        switch (operator)
        {
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