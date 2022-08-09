// 测试异步代码

function fetchData(error?: string) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if(error) {
        rej(error)
        return
      }
      res('peanut butter')
    }, 100)
  })
}

function callbackData(callback) {
  setTimeout(() => {
    callback(null, 'peanut butter')
  }, 100)
}


// Promise
test('promise', () => {
  return fetchData().then((data) => {
    expect(data).toBe('peanut butter')
  })
})



// Async Await
test('async await', async () => {
  try {
    const data = await fetchData()
    expect(data).toBe('peanut butter') 
  } catch (e) {
    expect(e).toMatch('error')
  }
})


// 回调
test('callback', (done) => {
  function callback(error, data) {
    if(error) {
      done(error)
      return
    }
    try {
      expect(data).toBe('peanut butter')
      done()
    } catch (error) {
      done(error)
    }
  }

  callbackData(callback)
})


// resolves / rejects
test('resolves', () => {
  return expect(fetchData()).resolves.toBe('peanut butter')
})


test('rejects', () => {
  return expect(fetchData('error')).rejects.toMatch('error')
})
