import { isDate, isPlainObject, encode } from './utils'

export function formatUrls(url: string, params?: any): string {
  if (!params) return url
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    let values = []

    if (typeof val === 'undefined' || val === null) return
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      }

      if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
