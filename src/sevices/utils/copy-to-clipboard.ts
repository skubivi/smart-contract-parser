export const copyToClipboard = async (s: string | undefined) => {
    if (s === undefined) {
        console.error('Failed to copy')
        return false
    }
    try {
        await navigator.clipboard.writeText(s)
        return true
    } catch (err) {
        console.error('Failed to copy: ', err)
        return false
    }
}