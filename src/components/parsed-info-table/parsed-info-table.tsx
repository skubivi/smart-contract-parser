import { FC } from "react"
import { TParsedInfo } from "../../sevices/types/jsonData"
import { Box } from "@mui/material"
import ParsedInfoRow from "./components/parsed-info-row/parsed-info-row"

interface IParsedInfoTable {
    data: TParsedInfo
}

const ParsedInfoTable: FC<IParsedInfoTable> = ({
    data
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {data.messages.map(message => {
                return (
                    <ParsedInfoRow data={message}/>
                )
            })}
        </Box>
    )
}

export default ParsedInfoTable