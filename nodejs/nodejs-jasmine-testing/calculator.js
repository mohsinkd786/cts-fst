const add = (i,j)=>{
    return i + j;
}
const diff = (i,j)=>{
    return i - j;
}
const multiply = (i,j)=>{
    return i * j;
}
const divide = (i,j)=>{
    return i / j;
}
const square = (i)=>{
    return i * i;
}
module.exports={
    _add : add,
    _diff : diff,
    _mul : multiply,
    _divide : divide,
    _square : square
}