const parse = require('../parse')

describe('Test Parser', () => {
  it("Should return nothing if we don't pass ref", () => {
    const result = parse()
    expect(result).toBe(undefined)
  })

  it("Should return nothing if we pass not lerna tag", () => {
    const result = parse('v0.0.1')
    expect(result).toBe(undefined)
  })

  it("Should return package name and version for not correct lerna tag values", () => {
    expect(parse('some-package@')).toBe(undefined)
    expect(parse('1.0.1@1.1.1')).toBe(undefined)
    expect(parse('some-package@some-package')).toBe(undefined)
    expect(parse('some-package')).toBe(undefined)
    expect(parse('1.0.1')).toBe(undefined)
  })

  it("Should return package name and version for correct lerna tag", () => {
    const result = parse('some-package@1.0.1')
    expect(result).toMatchObject({packageName: 'some-package', version: '1.0.1'})
  })
})
