import { mount } from '@vue/test-utils'
import Login from '@/components/auth/Login.vue'

describe('LoginComponent', () => {
  test('mounted Login component', () => {
    const wrapper = mount(Login)

    expect(wrapper.exists()).toBeTruthy()
  })
})
