import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'
import { TextEncoder } from 'util'

global.TextEncoder = TextEncoder
