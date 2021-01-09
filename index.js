console.log("You can do it!");

function appear(e) {
    let area = document.getElementById("show");
    if (e == '') area.innerText = e;
    else area.innerText += e;
    // console.log(e);
}

function del() {
    let area = document.getElementById("show");
    let s = area.innerText;

    area.innerText = s.substr(0, s.length - 1);
}

function isdigit(c) {
    let n = c - '0';
    if (n >= 0 && n <= 9) return true;
    return false;
}

function solve() {
    let area = document.getElementById("show");
    let equation = area.innerText;

    let numarr = [],signarr = [];
    let curr = 0;
    for (i = 0; i < equation.length; i++) {

        if (!isdigit(equation[i])) {
            signarr.push(equation[i])
            numarr.push(curr);
            curr = 0;
            continue;
        }

        let n = equation[i] - '0';
        curr = (curr*10) + n;
        // console.log(equation[i]);
    }
    numarr.push(curr);

    let ans = numarr[0];
    for( i=1; i<numarr.length; i++){
        let sign = signarr[i-1],num = numarr[i];
        if(sign == '+') ans += num;
        else if(sign == '-') ans -= num;
        else if(sign == 'x') ans *= num;
        else if(sign == '/') ans /= num;
    }

    area.innerText = ans;
}
