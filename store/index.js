import { ROLE_ADMIN, ROLE_EDITOR } from '~/lib/Role'

export const getters = {
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
