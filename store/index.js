import { ROLE_ADMIN } from '~/lib/Role'

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
    return user?.roles?.includes(ROLE_ADMIN)
  }
}
