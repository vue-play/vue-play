export const preventSelectStart = () => {
  document.onselectstart = () => false
}

export const preventSelectStop = () => {
  document.onselectstart = () => true
}
