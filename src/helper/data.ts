import { isPlainObject } from './utils'

export function transformRequest(val: any): any {
  return isPlainObject(val) ? JSON.stringify(val) : val
}
