import { FC } from "react"
import { TParsedSingleMessage } from "../../../../sevices/types/jsonData"
import { Box, Divider, IconButton, Typography } from "@mui/material"
import { getTextFromDate } from "../../../../sevices/utils/get-text-from-date"

interface IParsedInfoRow {
    data?: TParsedSingleMessage
    isHeader?: true
}

const getTextFromSmartContractAddress = (s: string) => {
    if (s.length > 44) return s.slice(0, 44) + '...'
    return s
}

const ParsedInfoRow: FC<IParsedInfoRow> = ({
    data,
    isHeader
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 25,
                gap: 2
            }}
        >
            <Typography
                sx={{
                    width: 400
                }}
            >
                {data && getTextFromSmartContractAddress(data.smartContractAddress)}
            </Typography>
            <Divider orientation="vertical"/>
            <Typography>
                {data && getTextFromDate(data.date)}
            </Typography>
            <Divider orientation="vertical"/>
            <IconButton>
                
            </IconButton>
        </Box>
    )
}

export default ParsedInfoRow