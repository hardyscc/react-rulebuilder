import '@testing-library/jest-dom/extend-expect'
import crypto from 'crypto'

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr: Array<any>) => crypto.randomBytes(arr.length)
  }
})
