import { ROLE_ADMIN, ROLE_EDITOR } from '~/lib/Role'

export const getters = {
  /**
   * Destructuring state object improving performance
   *
   *
   * imRoot(state) => state.auth.user?.role
   * imRoot({ auth: { user }}) => user.role
   */

  /**
   * Checks if user is root
   */
  imAdmin({ auth: { user } }) {
    return user?.roles?.some(({ code }) => code === ROLE_ADMIN)
  },
  imEditor({ auth: { user } }, { imAdmin }) {
    return imAdmin || user?.roles?.some(({ code }) => code === ROLE_EDITOR)
  }
}
