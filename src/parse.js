function parseTag(ref) {
  if (ref && typeof ref === 'string') {
    const tagPath = 'refs/tags/'
    const tagString = ref.replace(tagPath, '')
    const lernaTagRegex = /(.*[a-z]\w)@(.*[0-9]+.[0-9]+.[0-9]+)/

    if (tagString && lernaTagRegex.test(tagString)) {
      const data = tagString.match(lernaTagRegex)

      if (data && data[1] && data[2]) {
        return { packageName: data[1], version: data[2] }
      }
    }
  }
}

module.exports = parseTag
