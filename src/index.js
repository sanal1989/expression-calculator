function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let strnumbers = "";
    let stack = [];
    let priority; 
    let newexpr = "";
    if(expr.search(" ")==-1){
        for(let i=0;i<expr.length;i++){
            if(expr[i+1]=="*" || expr[i+1]=="/" || expr[i+1]=="+" || expr[i+1]=="-"){
                newexpr=newexpr + expr[i];
                newexpr=newexpr + " ";
            }else if(expr[i]=="*" || expr[i]=="/" || expr[i]=="+" || expr[i]=="-"){
                newexpr=newexpr + expr[i];
                newexpr=newexpr + " ";
            }else{
                newexpr=newexpr + expr[i];
            }
        }
    }else{
        newexpr = expr;
    }
    function getP(token){
        if(token == "*" || token == "/"){
            return 3;
        }else if(token == "+" || token == "-"){
            return 2;
        }else if(token == "("){
            return 1;
        }else if(token == ")"){
            return -1;
        }else{
            return 0;
        }
    }
    for(let i = 0; i < newexpr.length; i++){
        priority = getP(newexpr.charAt(i));
        if(priority == 0){
            strnumbers = strnumbers + newexpr[i];
        }else if(priority == 1){
            stack.push(newexpr[i]);
        }else if(priority > 1){
            while(stack.length!=0){
                strnumbers = strnumbers + " ";
                if(getP(stack[stack.length-1]) >= priority){
                    strnumbers = strnumbers + stack.pop();
                }else{
                    break;
                }
            }
            stack.push(newexpr[i]);
        }else if(priority == -1){
            strnumbers = strnumbers + " ";
            while(getP(stack[stack.length-1]) != 1){
                strnumbers = strnumbers + stack.pop();
                if(stack.length == 0){
                    throw new Error("ExpressionError: Brackets must be paired");
                }
            }
            stack.pop();
        }
    }
    while(stack.length!=0){
        strnumbers = strnumbers + stack.pop();
    }
    let operand = "";
    let stecknum = [];
    for(let i = 0; i < strnumbers.length; i++){
        if(strnumbers[i] == ' '){
            continue;
        }else if(getP(strnumbers[i]) == 0){
            while(strnumbers[i] != " " && getP(strnumbers[i]) == 0){
                operand = operand + strnumbers[i++];
                if(strnumbers.length == i){
                    break;
                }
            }
            stecknum.push(Number.parseInt(operand));
            operand="";
        }
        if(getP(strnumbers[i]) > 1){
            let number1 = stecknum.pop();
            let number2 = stecknum.pop();
            if(strnumbers[i] =="+"){
                stecknum.push(number2 + number1);
            }else if(strnumbers[i] =="-"){
                stecknum.push(number2 - number1);
            }else if(strnumbers[i] =="*"){
                stecknum.push(number2 * number1);
            }else if(strnumbers[i] =="/"){
                stecknum.push(number2 / number1);
            }
        }
    }
    let result = stecknum.pop();
    if(result != "Infinity"){
        return result;
    }else{
        throw new Error("TypeError: Division by zero.");
    }

    

}

module.exports = {
    expressionCalculator
}