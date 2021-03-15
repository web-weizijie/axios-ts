import { isPlainObject, deepMerge } from '../helper/utils'
import { AxiosRequestConfig } from '../types'

const starts = Object.create(null)

function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const startKeysFromVal2 = ['url', 'params', 'data']

startKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Start
})

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  starts[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) config2 = {}

  const config = Object.create(null)

  for (const key in config2) {
    mergeFieId(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeFieId(key)
    }
  }

  function mergeFieId(key: string): void {
    const start = starts[key] || defaultStart
    config[key] = start(config1[key], config2[key])
  }

  return config
}
