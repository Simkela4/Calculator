const add = function(a,b) {
    let result = a + b;
    return result;
      
  };
  
const subtract = function(a,b) {
     let result =a - b;
      return result;
  };

const multiply = (arr)=> {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Input must be a non-empty array");
    }

    let result = arr.reduce((total, current)=>  total*current);
    return result;
  
  };

const divide=(arr)=> {
    if (!Array.isArray(arr) || arr.length===0){
        throw new Error("Input must be a non-empty array");
    }

    if (arr.includes(0)) {
        throw new Error("Cannot divide by zero");
    }

    let result = arr.reduce((total,current)=> total/current);
    return result;
}

const operate = function(a, operator, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply([a, b]);
        case '/':
            return divide([a, b]);
        default:
            throw new Error("Unsupported operator");
    }
};
