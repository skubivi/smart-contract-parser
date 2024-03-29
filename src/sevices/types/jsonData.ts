export type TMessageText = string | {
    type: string
    text: string
}

export type TParsedSingleMessage = {
    id: number
    date: Date
    edited: Date
    from: string
    text: TMessageText[]
    smartContractAddress: string
}

export type TSingleMessage = {
    id: number
    date: string
    edited: string
    from: string
    type: string
    text: string | TMessageText[]
}

export type TJsonData = {
    name: string,
    messages: TSingleMessage[]
}

export type TParsedInfo = {
    name: string,
    messages: TParsedSingleMessage[]
}