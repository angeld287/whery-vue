import {store} from '../store'

export default (to, from, next) => {
  if (store.getters.user.token) {
    next()
  } else {
    next('/signin')
  }
}
