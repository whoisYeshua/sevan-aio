import { CustomError } from './Error.ts'

export const delay = (ms: number, { signal }: { signal?: AbortSignal } = {}) => {
	return new Promise((resolve, reject) => {
		const abortHandler = () => {
			clearTimeout(timeout)
			reject(CustomError.createAbortError(signal?.reason))
		}
		signal?.addEventListener('abort', abortHandler, { once: true })

		const timeout = setTimeout(() => {
			signal?.removeEventListener('abort', abortHandler)
			resolve(undefined)
		}, ms)
	})
}
