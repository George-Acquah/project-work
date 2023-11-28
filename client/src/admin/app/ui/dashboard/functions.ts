function getLinkClassName(currentPath: string, targetPath: string) {
  return currentPath.indexOf(targetPath) !== -1
    ? "text-lightBlue-500 hover:text-lightBlue-600"
    : "text-blueGray-700 hover:text-blueGray-500";
}

function getRedLinkClassName(currentPath: string, targetPath: string) {
  return currentPath.indexOf(targetPath) !== -1
    ? "text-red-500 hover:text-red-600"
    : "text-red-700 hover:text-red-500";
}

function getGreenLinkClassName(currentPath: string, targetPath: string) {
  return currentPath.indexOf(targetPath) !== -1
    ? "text-green-500 hover:text-green-600"
    : "text-green-900 hover:text-green-500";
}

function getIconClassName(currentPath: string, targetPath: string) {
  return currentPath.indexOf(targetPath) !== -1
    ? "opacity-75"
    : "text-blueGray-300";
}

function getRedIconClassName(currentPath: string, targetPath: string) {
  return currentPath.indexOf(targetPath) !== -1 ? "opacity-75" : "text-red-500";
}

function getGreenIconClassName(currentPath: string, targetPath: string) {
  return currentPath.indexOf(targetPath) !== -1
    ? "opacity-75"
    : "text-green-500";
}

export {
    getGreenIconClassName,
    getGreenLinkClassName,
    getIconClassName,
    getLinkClassName,
    getRedIconClassName,
    getRedLinkClassName
}
