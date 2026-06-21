// import { useCallback, useEffect, useState } from 'react'


// export function useLocalStorage<T>(key: string, initialValue: T) {
//     // return null
//     const isClient = typeof window !== 'undefined'

//     const readValue = useCallback((): T => {
//         if (!isClient) return initialValue
//         try {
//             const item = window.localStorage.getItem(key)
//             return item ? (JSON.parse(item) as T) : initialValue
//         } catch {
//             return initialValue
//         }
//     }, [initialValue, isClient, key])

//     const [storedValue, setStoredValue] = useState<T>(readValue)

//     useEffect(() => {
//         Promise.resolve().then(() => setStoredValue(readValue()))
//     }, [readValue])

//     const setValue = useCallback(
//         (value: T | ((prev: T) => T)) => {
//             try {
//                 const valueToStore = value instanceof Function ? value(storedValue) : value
//                 setStoredValue(valueToStore)
//                 if (isClient) {
//                     window.localStorage.setItem(key, JSON.stringify(valueToStore))
//                 }
//             } catch {
//                 //TODO: ignore write errors
//             }
//         },
//         [isClient, key, storedValue]
//     )

//     return [storedValue, setValue] as const
// }