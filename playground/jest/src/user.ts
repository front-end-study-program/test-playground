import axios from 'axios'

class User {
  static all() {
    return axios.get('./user.json').then(res => res.data)
  }
}

export default User