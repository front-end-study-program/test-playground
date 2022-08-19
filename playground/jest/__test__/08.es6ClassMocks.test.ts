// es6 类模拟
import SoundPlayer from '../src/player/sound-player'
import SoundPlayerConsumer from '../src/player/sound-player-consumer'
jest.mock('../src/player/sound-player')

// 自动模拟
describe('自动模拟', () => {

  beforeEach(() => {
    (SoundPlayer as jest.Mock).mockClear()
  })

  test('自动模拟-test', () => {
    new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
  })
})


