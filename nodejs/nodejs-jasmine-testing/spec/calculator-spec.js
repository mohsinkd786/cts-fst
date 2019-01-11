const calculator = require('./../calculator');

describe('Feature : Calculator Operation ',()=>{
    let i,j;
    /*beforeAll(()=>{
        i = 10;
        j = 3;
        console.log('beforeAll() called');
    });*/
    beforeEach(()=>{
        i = 10;
        j = 3;
        console.log('beforeEach() called');
    });
    afterEach(()=>{
        i = 0;
        j = 0;
        console.log('afterEach() called');
    });
    /*afterAll(()=>{
        console.log('afterAll() called');
    });*/
    it('Scenario: Sum is ',()=>{
        const sum = calculator._add(i,j);
        const mockSum = i + j;
        console.log('SUM called');
        expect(sum).toBe(mockSum);
    });
    it('Scenario: Difference is ',()=>{
        const diff = calculator._diff(i,j);
        const mockDiff = i - j;
        console.log('DIFF called');
        expect(diff).toBe(mockDiff);
    });
    it('Scenario: Product is ',()=>{
        const product = calculator._mul(i,j);
        const mockProduct = i * j;
        console.log('MUL called');
        expect(product).toBe(mockProduct);
    });
    it('Scenario: Division is ',()=>{
        const division = calculator._divide(i,j);
        const mockDivision = i / j;
        console.log('DIV called');
        expect(division).toBe(mockDivision);
    });
    it('Scenario: Square is ',()=>{
        const square = calculator._square(i);
        const mockSquare = i * i ;
        console.log('SQR called');
        expect(square).toBe(mockSquare);
    });
});