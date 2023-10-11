export const copyTextToClipboard = (text: string) => {
    const textElem = document.createElement('textarea')
    textElem.innerHTML = text
    document.body.appendChild(textElem)
    textElem.select()
    document.execCommand('copy')
    navigator.clipboard.writeText(textElem.value);
    document.body.removeChild(textElem)
}