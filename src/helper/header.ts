import { isPlainObject, normalizHeader } from './utils'

export function processHeaders(headers: any, data: any): any {
  normalizHeader(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
