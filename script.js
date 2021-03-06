const calcDefault = {
    a: "",
    b: "",
    op: undefined,
    acceptA: true,
    acceptB: false,
    acceptOp: false,
    writeContent: true,
    writePreview: false
}

let calc = {
    a: "",
    b: "",
    op: undefined,
    acceptA: true,
    acceptB: false,
    acceptOp: false,
    writeContent: true,
    writePreview: false
};

function addNum(str){
    if (calc.acceptA){
        if (calc.a == ""){
            calc.a = parseFloat(str);
        }
        else {
            calc.a = parseFloat(calc.a.toString()+str);
        }
    }
    else {
        if (calc.b == ""){
            calc.b = parseFloat(str);
        }
        else {
            calc.b = parseFloat(calc.b.toString()+str);
        }
    }
}

function updateCalc(e){
    const input = e.target.textContent;
    switch (input){
        case "enter":
            operate(calc.a, calc.b, calc.op);
            break;
        case "clear":
            clear();
            break;
        case ".":
            if (calc.acceptA && calc.a.toString().includes('.')){       
            }
            else if (calc.acceptB && calc.b.toString().includes('.')){
            }
            else {
                if (calc.acceptA){
                calc.a = `${calc.a}.`;
                }
                else {
                    calc.b = `${calc.b}.`;
                }
                addToScreen(input);
            }
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            addNum(input);
            addToScreen(input);
            break;
        case "+":
            if (calc.op){
                operate(calc.a, calc.b, calc.op);
                calc.op = add;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            else {
                calc.op = add;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            break;
        case "-":
            if (calc.op){
                operate(calc.a, calc.b, calc.op);
                calc.op = subtract;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            else {
                calc.op = subtract;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            break;
        case "/":
            if (calc.op){
                operate(calc.a, calc.b, calc.op);
                calc.op = divide;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            else {
                calc.op = divide;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            break;
        case "*":
            if (calc.op){
                operate(calc.a, calc.b, calc.op);
                calc.op = multiply;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            else {
                calc.op = multiply;
                calc.acceptA = false;
                calc.acceptB = true;
                addToScreen(input);
            }
            break;
        case "del":
            if (calc.acceptA){
                if (calc.a.toString().length === 1){
                    calc.a = ""
                }
                else {
                    calc.a = calc.a.toString().slice(0, calc.a.toString().length-1);
                    if (calc.a[calc.a.length-1] == "."){
                    }
                    else {
                        calc.a = parseFloat(calc.a)
                    }
                }
                screenContent.textContent = screenContent.textContent.slice(0, screenContent.textContent.length-1);
            }
            else if (calc.acceptB && calc.b === ""){
                calc.op = undefined;
                calc.acceptB = false;
                calc.acceptA = true;
                screenContent.textContent = screenContent.textContent.slice(0, screenContent.textContent.length-3);
            }
            else {
                if (calc.b.toString().length === 1){
                    calc.b = ""
                }
                else {calc.b = calc.b.toString().slice(0, calc.b.toString().length-1);
                    if (calc.b[calc.b.length-1] == "."){
                    }
                    else {
                        calc.b = parseFloat(calc.b)
                    }
                }   
                screenContent.textContent = screenContent.textContent.slice(0, screenContent.textContent.length-1);
            }
        default:
            break;
    }
}

function clearCalc () {
    calc = {
        a: "",
        b: "",
        op: undefined,
        acceptA: true,
        acceptB: false,
        acceptOp: false,
        writeContent: true,
        writePreview: false
    };
}

function clear(){
    clearCalc();
    screenContent.textContent = "";
    screenPreview.textContent = "";
}

function printError(){
    clear();
    screenContent.textContent = "ERROR";
    setTimeout( () => {
        screenContent.textContent = "";
        screenPreview.textContent = "";
    }, 500)
}

function add (a, b){
    return a+b;
}

function subtract (a, b){
    return a-b;
}

function multiply (a,b){
 return a*b;
}

function divide (a,b){
 return a/b;
}

function operate (a, b, op){
    if (a.toString().includes(".")){
        a = parseFloat(a)
    }
    if (b.toString().includes(".")){
        b = parseFloat(b)
    }
    if (b === "" && op === undefined){
    }
    else if (b === ""){
        printError();
    }
    else {
        const result = op(a, b);
        screenContent.textContent = result.toString().slice(0, 10);
        clearCalc();
        calc.a = result;
    }
}

function addToScreen(char){
    if (char == "+" || char == "-" || char == "/" || char == "*"){
        char = ` ${char} `;
    }
    else {
    }
    if (screenContent.textContent.length>14) {
    }
    else {
        screenContent.textContent += char;
    }
}

const screenPreview = document.querySelector('#screenPreview');
const screen = document.querySelector('#screen');
let screenContent = document.querySelector('#screenContent');
const buttons = document.querySelectorAll('button');
for (const button of buttons){
    button.addEventListener('click', updateCalc);
}   
