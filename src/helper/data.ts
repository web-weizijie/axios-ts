import { isPlainObject } from './utils'

export function transformRequest(val: any): any {
  return isPlainObject(val) ? JSON.stringify(val) : val
}

export function transformResponse(val: any): any {
  if (typeof val === 'string') {
    try {
      val = JSON.parse(val)
    } catch (error) {
      // nothing
    }
  }

  return val
}
