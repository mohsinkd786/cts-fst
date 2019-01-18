const calculator = require('./../calculator');
// test suite
describe('Calculator operations',()=>{
    let i,j;
    beforeAll(()=>{
        //console.log(`Tests beforeAll()`);
        i = 10;
        j = 5;
    });
    beforeEach(()=>{
        //console.log(`Tests beforeEach()`);
    });
    it('should give us the sum of i, j',()=>{
        const _actual = i + j;
        const _expect = calculator.add(i,j);
        expect(_expect).toEqual(_actual);
    });
    it('should give us the difference of i,j',()=>{
        const _actual = i - j;
        const _expect = calculator.subtract(i,j);
        expect(_expect).toEqual(_actual);
    });
    it('should give us the product of i,j',()=>{
        const _actual = i * j;
        const _expect = calculator.multiply(i,j);
        expect(_expect).toEqual(_actual);
    });
    it('should give us the division of i,j',()=>{
        const _actual = i / j;
        const _expect = calculator.division(i,j);
        expect(_expect).toEqual(_actual);
    });
    it('should give us the square of i',()=>{
        const _actual = i * i;
        const _expect = calculator.square(i);
        expect(_expect).toEqual(_actual);
    });
});