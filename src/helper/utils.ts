const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): boolean {
  return typeof val === 'object' && val !== null
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function normalizHeader(headers: any, normalizedName: string): any {
  if (!headers) return headers
  Object.keys(headers).forEach(name => {
    if (
      name !== normalizedName &&
      normalizedName.toLocaleLowerCase() === name.toLocaleLowerCase()
    ) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          }
          result[key] = deepMerge(val)
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
