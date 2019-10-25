export default function ({ store, redirect }) {
    if (!store.getters.ROLE) {
      return redirect('/auth')
    }
  }