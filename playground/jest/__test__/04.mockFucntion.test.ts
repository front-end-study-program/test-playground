import axios from "axios"
import User from '../src/user'
import defaultExport, {bar, foo} from '../src/bar-foo-baz';
// 模拟函数


// 使用 mock 函数
function forEach(items, callback) {
  for(let i = 0; i < items.length; i++) {
    callback(items[i])
  }
}
test('mock function', () => {
  const mockCallback = jest.fn(x => 42 + x)
  forEach([1, 2], mockCallback)
  // 此 mock 函数被调用了两次
  expect(mockCallback.mock.calls.length).toBe(2)

  // 第一次调用函数时的第一个参数是 1
  expect(mockCallback.mock.calls[0][0]).toBe(1)

  // 第二次调用函数时的第一个参数是 2
  expect(mockCallback.mock.calls[1][0]).toBe(2)

  // 第一次函数调用的返回值是 43
  expect(mockCallback.mock.results[0].value).toBe(43)

  console.log(mockCallback.mock.instances.length, 'length')

  console.log(mockCallback.mock.instances, 'instances')

  console.log(mockCallback.mock.lastCall, 'lastCall')
})


// .mock 属性
// 所有的 mock 函数都有这个特殊的 .mock属性，它保存了关于此函数如何被调用、调用时的返回值的信息。
// .mock 属性还追踪每次调用时 this的值，所以我们同样可以也检视（inspect） this
test('.mock', () => {
  const myMock1 = jest.fn()
  const a = new myMock1()
  console.log(myMock1.mock.instances, 'myMock instances')

  const myMock2 = jest.fn()
  const b = {}
  const bound = myMock2.bind(b)
  bound()
  console.log(myMock2.mock.instances, 'instances')
})



// Mock 的返回值
// Mock 函数也可以用于在测试期间将测试值注入代码
test('mock returning', () => {
  const myMock = jest.fn()
  console.log(myMock())
  // mockReturnValueOnce: 注入值生效一次。 mockReturnValue: 注入值
  myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(101)
  console.log(myMock(), myMock(), myMock(), myMock());
})


// 模拟模块
jest.mock('axios');
test('mock module', () => {
  const user = { name: '张三' };
  const res = { data: user };
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(res);
  return User.all().then(data => expect(data).toEqual(user))
})



// 模拟部分模块
// 模块的子集可以被模拟，模块的其他部分可以维持当前实现
jest.mock('../src/bar-foo-baz', () => {
  const originalModule = jest.requireActual('../src/bar-foo-baz');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});


// Mock的实现
// 在某些情况下用Mock函数替换指定返回值是非常有用的。 可以用 jest.fn 或 mockImplementationOnce方法来实现Mock函数
test('mock的实现', () => {
  const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

  myMockFn((err, val) => console.log(val));
  // > true

  myMockFn((err, val) => console.log(val));
  // > false
})

// 当 mockImplementationOne定义的实现逐个调用完毕时， 如果定义了jest.fn ，它将使用 jest.fn 
test('jest.fn mockImplementationOne', () => {
  const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default'
})

// 大多数情况下，我们的函数调用都是链式的，如果你希望创建的函数支持链式调用（因为返回了this），可以使用.mockReturnThis() 函数来支持
test('mockReturnThis', () => {
  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
  };
  
  // is the same as
  
  const otherObj = {
    myMethod: jest.fn(function () {
      return this;
    }),
  };
})


// Mock 名称
// 你可以为你的Mock函数命名，该名字会替代 jest.fn() 在单元测试的错误输出中出现。 用这个方法你就可以在单元测试输出日志中快速找到你定义的Mock函数
test('mockName', () => {
  const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
})


// 自定义匹配器
test('custom matcher', () => {
  const mockFunc = jest.fn((x?: string) => 'custom matcher').mockName('a mock name')
  mockFunc('1')
  mockFunc('2')
  // 模拟函数至少被调用了一次
  expect(mockFunc).toHaveBeenCalled();
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0)

  // 使用指定的参数至少调用了一次模拟函数
  expect(mockFunc).toHaveBeenCalledWith('1');

  // 对模拟函数的最后一次调用是使用指定的参数调用的
  expect(mockFunc).toHaveBeenLastCalledWith('2');
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual(["2"])
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe('2')

  // 所有调用和模拟的名称都作为快照写入
  expect(mockFunc).toMatchSnapshot();

  // 快照将检查模拟是否被调用了相同的次数
  // 以相同的顺序，使用相同的参数
  expect(mockFunc.mock.calls).toEqual([["1"], ["2"]])

  // 名称
  expect(mockFunc.getMockName()).toBe('a mock name')

})
