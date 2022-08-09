// 安装和卸载

const cityList = [];
function initializeCityDatabase() {
  cityList.push('hangzhou')
}


function clearCityDatabase() {
  cityList.pop()
}

function isCity(city) {
  return cityList.includes(city)
}

// 重复设置
// beforeEach 和 afterEach 会在每个测试执行前后都会执行一次
describe('重复设置', () => {
  beforeEach(() => {
    console.log('beforeEach')
    initializeCityDatabase()
  })
  
  afterEach(() => {
    console.log('beforeAfter')
    clearCityDatabase()
  })
  
  test('one', () => {
    console.log('one')
    expect(isCity('hangzhou')).toBeTruthy()
  })

  test('two', () => {
    console.log('two')
    expect(isCity('shanghai')).toBeFalsy()
  })
})

 

// 一次性设置
// beforeAll 和 afterAll 只会执行一次
describe('一次性设置', () => {
  beforeAll(() => {
    console.log('beforeAll')
    initializeCityDatabase()
  })
  afterAll(() => {
    console.log('afterAll')
    clearCityDatabase()
  })

  test('all one', () => {
    console.log('all one')
    expect(isCity('hangzhou')).toBeTruthy()
  })

  test('all two', () => {
    console.log('all two')
    expect(isCity('shanghai')).toBeFalsy()
  })
})


// 作用域
// 顶级的 beforeEach、afterEach、beforeAll、afterAll 会比在 describe 分组中的更早执行
beforeAll(() => console.log('global beforeAll'))
afterAll(() => console.log('global afterAll'))
beforeEach(() => console.log('global beforeEach'))
afterEach(() => console.log('global afterEach'))

describe('作用域', () => {
  beforeAll(() => console.log('local beforeAll'))
  afterAll(() => console.log('local afterAll'))
  beforeEach(() => console.log('local beforeEach'))
  afterEach(() => console.log('local afterEach'))
  test('', () => console.log('2 - test'))
})


// 执行顺序
// 在所有测试真正执行时，会先执行 describe 的函数体
describe('describe outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');

    test('test 1', () => console.log('test 1'));
  });

  console.log('describe outer-b');

  test('test 2', () => console.log('test 2'));

  describe('describe inner 2', () => {
    console.log('describe inner 2');

    test('test 3', () => console.log('test 3'));
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test 1
// test 2
// test 3