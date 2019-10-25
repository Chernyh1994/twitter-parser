export default function ({ store, redirect }) {
  if (store.state.users.role) {
    return redirect('/')
  }
  // else if (!store.state.users.role) {
  //   return redirect('/auth')
  // }
}