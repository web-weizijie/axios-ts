import { deepMerge, isPlainObject, normalizHeader } from './utils'
import { Methods } from '../types'

export function processHeaders(headers: any, data: any): any {
  normalizHeader(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(header: string) {
  let parsed = Object.create(null)
  if (!header) return parsed

  header.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) return
    if (val) val = val.trim()

    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Methods): any {
  if (!headers) return headers
  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
