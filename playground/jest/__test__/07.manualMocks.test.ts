// 手动模拟

import user from './models/user'

jest.mock('./models/user')


test('手动模拟', () => {
  expect(user.getAuthorInfo()).toEqual({name: '张三'})
})