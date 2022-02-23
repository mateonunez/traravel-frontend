export default function isAdmin({ store, redirect }) {
  if (!store.getters.imAdmin) {
    return redirect('/')
  }
}
