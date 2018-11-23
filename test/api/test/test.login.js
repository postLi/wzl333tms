import { login } from '../url/login.js'

describe('测试登录', function() {
  it('fangjian/123456应该能拿到token', function(done) {
    login('fangjian', '123456').then(res => {
      expect(res.access_token).to.not.be.empty
      done()
    }).catch(err => {
      done(err)
    })
  })
  it('fangjian/654321不能拿到token', function(done) {
    login('fangjian', '654321').then(res => {
      expect(res.access_token || '').to.not.be.empty
      done()
    }).catch(err => {
      expect(false)
      done(err)
    })
  })
})

