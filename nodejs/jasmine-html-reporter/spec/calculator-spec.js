const calculator = require('./../calculator');

describe('Calculator Operations ',()=>{
    // sum of two numbers
    it('should give us the sum of i , j',()=>{
        const i = 10;
        const j = 4;
        const _actual = i + j; 
        const _expected = calculator.sum(i,j);
        expect(_expected).toEqual(_actual);
    });
    // difference of two numbers
    it('should give us the difference of i , j',()=>{
        const i = 10;
        const j = 4;
        const _actual = i - j; 
        const _expected = calculator.diff(i,j);
        expect(_expected).toEqual(_actual);
    });
    // product of two numbers
    it('should give us the product of i , j',()=>{
        const i = 10;
        const j = 4;
        const _actual = i * j; 
        const _expected = calculator.product(i,j);
        expect(_expected).toEqual(_actual);
    });
    // division of two numbers
    it('should give us the division of i , j',()=>{
        const i = 10;
        const j = 4;
        const _actual = i / j; 
        const _expected = calculator.div(i,j);
        expect(_expected).toEqual(_actual);
    });
});
