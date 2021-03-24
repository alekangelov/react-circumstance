function getPath(event: MouseEvent) {
  const path = []
  let currentElem: any = event.target
  while (currentElem) {
    path.push(currentElem)
    if (currentElem.parentElement) {
      currentElem = currentElem.parentElement
    } else {
      currentElem = null
    }
  }
  if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
    path.push(document)
  if (path.indexOf(window) === -1) path.push(window)
  return path
}

export default getPath
