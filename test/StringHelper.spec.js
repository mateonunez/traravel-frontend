import { kebapCase } from '~/lib/helpers/string'

describe('String Helper', () => {
  it('kebap case string cast', () => {
    expect(kebapCase('TestString')).toBe('test-string')
    expect(kebapCase('Test String')).toBe('test-string')
    expect(kebapCase('T#..st##Str1ng')).toBe('t-st-str1-ng')
  })
})
