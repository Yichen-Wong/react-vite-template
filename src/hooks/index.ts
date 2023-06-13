import { useReducer } from "react"
import { AppDispatch, RootState } from "@/store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export function useReducerState<T>(initialState: T): [T, (action: Partial<T>) => void, () => void] {
    const reducer = (state: T, action: Partial<T>) => {
        return { ...state, ...action }
    }
    const [state, setState] = useReducer(reducer, initialState)
    const reset = () => {
        setState(initialState)
    }
    return [state, setState, reset]
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
