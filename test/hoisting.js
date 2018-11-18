const expect = require('chai').expect;

describe('hoisting', () => {

  it('using var variable before initialize', () => {
    console.log(x);
    var x = 1;
  });


  it('using function before announcement', () => {
    hello();
    function hello() {
      console.log('world')
    }
  })

  it('using const arrow function before announcement', () => {
    //const dont hoist
    fn();
    const fn = () => console.log('foo');
  })

  it('using var arrow function before announcement', () => {
    //dont hoist in this situation neither
    fn();
    var fn = () => console.log('foo');
  })

  it('hoisting in for with var', () => {

    const arr = [1, 2, 3, 4]
    for (var i = 0; i < 3; i++) {

    }

    expect(arr[i]).to.equal(4)
  })

})