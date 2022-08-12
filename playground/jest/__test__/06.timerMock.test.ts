// 计时器模拟

function timerGame(callback?) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}


describe('启用假定时器', () => {
  // 使用假定时器
  jest.useFakeTimers()
  jest.spyOn(globalThis, 'setTimeout')

  test('启用假定时器-test', () => {
    const callback = jest.fn()
    timerGame(callback)

    expect(callback).toHaveBeenCalledTimes(0)
  })
})


// 运行所有计时器
describe('运行所有计时器', () => {
  jest.useFakeTimers()

  test('运行所有计时器-test', () => {
    const callback = jest.fn();
    const cloneTimeGame = timerGame
    cloneTimeGame(callback);

    expect(callback).not.toBeCalled()
    
    // 运行所有定时器
    jest.runAllTimers()

    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})