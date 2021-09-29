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
    expect(parse('some-package@some-package')).toBe(undefined)
    expect(parse('some-package')).toBe(undefined)
    expect(parse('1.0.1')).toBe(undefined)
  })

  it("Should return package name and version for correct lerna tag", () => {
    expect(parse('some-package@2.0.1')).toMatchObject({
      scope: '',
      packageName: 'some-package',
      version: '2.0.1'
    })

    expect(parse('1.0.1@1.1.1')).toMatchObject({
      scope: '',
      packageName: '1.0.1',
      version: '1.1.1'
    })

    expect(parse('@1-2-3/1.0.1@1.1.1')).toMatchObject({
      scope: '@1-2-3',
      packageName: '1.0.1',
      version: '1.1.1'
    })

    expect(parse('@scope/test-test@1.0.1')).toMatchObject({
      scope: '@scope',
      packageName: 'test-test',
      version: '1.0.1'
    })

    expect(parse('@scope-test/test-test@1.1.1')).toMatchObject({
      scope: '@scope-test',
      packageName: 'test-test',
      version: '1.1.1'
    })

    expect(parse('@scope-test2/test2-test@0.0.1')).toMatchObject({
      scope: '@scope-test2',
      packageName: 'test2-test',
      version: '0.0.1'
    })

    expect(parse('@scope_test~1.test_dash/test2-test.pr~1_1@0.0.1')).toMatchObject({
      scope: '@scope_test~1.test_dash',
      packageName: 'test2-test.pr~1_1',
      version: '0.0.1'
    })
  })
})
