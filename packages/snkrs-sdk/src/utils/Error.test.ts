import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { CustomError } from './Error.ts'

describe('CustomError', () => {
	test('should correctly identify AbortError', () => {
		const abortError = new Error('Abort error')
		abortError.name = 'AbortError'
		assert.strictEqual(CustomError.isAbortError(abortError), true)
		assert.strictEqual(CustomError.isAbortError(new Error('Regular error')), false)
	})

	test('should correctly identify TimeoutError', () => {
		const timeoutError = new Error('Timeout error')
		timeoutError.name = 'TimeoutError'
		assert.strictEqual(CustomError.isTimeoutError(timeoutError), true)
		assert.strictEqual(CustomError.isTimeoutError(new Error('Regular error')), false)
	})

	test('should not identify non-Error objects as AbortError or TimeoutError', () => {
		const nonError = { name: 'AbortError' }
		assert.strictEqual(CustomError.isAbortError(nonError), false)
		assert.strictEqual(CustomError.isTimeoutError(nonError), false)
	})
})
