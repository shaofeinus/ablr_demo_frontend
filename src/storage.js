const STATE_KEY = 'ablr-myinfo-oauth-state'

function saveState(state) {
  localStorage.setItem(STATE_KEY, state)
}

function verifyState(state) {
  const savedState = localStorage.getItem(STATE_KEY)
  return savedState && savedState === state
}

export {saveState, verifyState}