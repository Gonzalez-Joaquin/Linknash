const persistState = (key: string, state: any) => {
  localStorage.setItem(key, JSON.stringify(state))
}

const clearState = (key: string) => {
  localStorage.removeItem(key)
}

export { persistState, clearState }
