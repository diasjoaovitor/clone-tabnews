import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'

import { TextEncoder } from 'node:util'

// jsdom doesn't expose `TextEncoder`, which the code under test needs
// eslint-disable-next-line unicorn/no-global-object-property-assignment
globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder
