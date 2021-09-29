function parseTag(ref) {
  if (ref && typeof ref === 'string') {
    const tagPath = 'refs/tags/'
    const tagString = ref.replace(tagPath, '')
    const lernaTagRegex = /^(@.*[a-z0-9-~._]\/)?(.*[a-z0-9-~._])@(.*[0-9]+.[0-9]+.[0-9]+)$/

    if (tagString && lernaTagRegex.test(tagString)) {
      const data = tagString.match(lernaTagRegex)

      const scope = data[1]
      const packageName = data[2]
      const version = data[3]

      if (data && packageName && version) {
        const hasScope = scope && scope.startsWith('@')

        if (hasScope) {
          return { scope: scope.replace('/', ''), packageName, version }
        } else {
          return { scope: '', packageName, version }
        }
      }
    }
  }
}

module.exports = parseTag
