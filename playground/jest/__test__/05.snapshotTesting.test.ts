// 快照测试

function getName(name: string) {
  return name
}

// jest 快照测试
test('快照测试', () => {
  expect(getName('张三')).toMatchSnapshot();
})


// 更新快照使用 jest --updateSnapshot
test('更新快照', () => {
  // expect(getName('李四')).toMatchSnapshot();
  expect(getName('李四1')).toMatchSnapshot();
})


// 内联快照
test('内联快照', () => {
  expect(getName('王五')).toMatchInlineSnapshot(`"王五"`)
})


// 属性匹配器
test('属性匹配器', () => {
  const user = {
    name: '赵六',
    id: Math.floor(Math.random() * 30),
    time: Date.now()
  }

  expect(user).toMatchInlineSnapshot({
  time: expect.any(Number),
  id: expect.any(Number) }, `
Object {
  "id": Any<Number>,
  "name": "赵六",
  "time": Any<Number>,
}
`)
})