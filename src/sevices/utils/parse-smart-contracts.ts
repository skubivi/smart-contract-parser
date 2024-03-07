import { TJsonData, TParsedInfo, TParsedSingleMessage } from "../types/jsonData";

enum RemovedLink {
    telegram = 't.me',
    youtube = 'youtube.com'
}

type TCheckIsThereSmartContract = {
    check: boolean,
    smartContractAddress: string
}

export const checkIsThereSmartContract = (link: string): TCheckIsThereSmartContract => {
    const pathArray = link.split('/')
    let check = true
    pathArray.forEach((pathSample) => {
        if (
            pathSample === RemovedLink.telegram || 
            pathSample === RemovedLink.youtube
        ) check = false
    })
    if (!check) return {
        check: false,
        smartContractAddress: '',
    }
    if (
        pathArray[pathArray.length - 1].length === 42 || 
        pathArray[pathArray.length - 1].length === 43 || 
        pathArray[pathArray.length - 1].length === 44 ||
        pathArray[pathArray.length - 1].length === 66 ||
        pathArray[pathArray.length - 1].split(':')[0].length === 66
    ) return {
        check: true,
        smartContractAddress: pathArray[pathArray.length - 1].split(':')[0]
    }
    return {
        check: false,
        smartContractAddress: ''
    }
}

export const parseSmartContracts = (data: TJsonData): TParsedInfo => {
    const groupName = data.name
    const messages = data.messages
    const parsedMessages: TParsedSingleMessage[] = []
    messages.forEach((message) => {
        if (message.type === 'service') return
        if (typeof message.text === 'string') return
        const messageDate = new Date(message.date)
        const messageEdited = new Date(message.edited)
        const messageFrom = message.from
        let check = false
        let smartContractAddress = ''
        message.text.forEach((messageText) => {
            if (typeof messageText === 'string') return
            if (messageText.type === 'link') {
                const isThereSmartContract = checkIsThereSmartContract(messageText.text)
                if (isThereSmartContract.check) {
                    check = true
                    smartContractAddress = isThereSmartContract.smartContractAddress
                }
            }
        })
        if (check) {
            const tempText = message.text
            tempText.filter(element => {
                if (!(typeof element === 'string')) return true
                return element.replace(/\n/g, '').length > 0
            })
            parsedMessages.push({
                date: messageDate,
                edited: messageEdited,
                from: messageFrom,
                text: message.text.filter(element => {
                    if (!(typeof element === 'string')) return true
                    return element.replace(/\n/g, '').length > 0
                }),
                smartContractAddress
            })
        }
    })
    return {
        name: groupName,
        messages: parsedMessages
    }
}