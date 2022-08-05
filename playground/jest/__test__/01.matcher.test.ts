// 匹配器的使用

test('Common Matchers', () => {
  // toBe：使用 object.is 来精准匹配
  expect(1 + 2).toBe(3)

  // toEqual：递归检查数组或者对象的每个字段
  const data = { one: 1 }
  expect(data).toEqual({ one: 1 })
})


test('Truthiness', () => {
  // toBeNull：只匹配 null
  expect(null).toBeNull()

  // toBeUndefined：匹配 undefined
  expect(undefined).toBeUndefined()

  // toBeDefined：匹配已定义
  expect(1).toBeDefined()

  // toBeTruthy：匹配 if 语句为真
  expect(1 < 2).toBeTruthy()

  // toBeFalsy：匹配 if 语句为假
  expect(1 > 2).toBeFalsy()
})


test('Number', () => {
  const value = 2 + 2;
  // toBeGreaterThan：是否大于
  expect(value).toBeGreaterThan(3);

  // toBeGreaterThanOrEqual：是否大于或者等于
  expect(value).toBeGreaterThanOrEqual(3.5);

  // toBeLessThan：是否小于
  expect(value).toBeLessThan(5);

  // toBeLessThanOrEqual：是否小于等于
  expect(value).toBeLessThanOrEqual(4.5);
})


test('String', () => {
  // toMatch：是否匹配到正则或者字符串内容
  expect('term').toMatch(/t/)
})


test('Arrays and iterables', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  
  // toContain：用于检查数组或者可迭代对象是否包含特定项
  expect(shoppingList).toContain('milk')
})


test('Function Throw', () => {
  // toThrow：匹配函数是否抛出错误并检查错误内容是否一致
  expect(() => { throw new Error('undefined is not sdk') }).toThrow(/sdk/)
})


// 更多匹配器内容API：https://jestjs.io/zh-Hans/docs/expect