import { FC } from "react"
import { TParsedInfo } from "../../sevices/types/jsonData"
import { Box, Divider } from "@mui/material"
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
                width: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'white',
                padding: 5,
                gap: 2,
                borderRadius: 10
            }}
        >
            {data.messages.length > 0 &&
                <ParsedInfoRow isHeader={true} />
            }
            <Divider orientation="horizontal" />
            {data.messages.map(message => {
                return (
                    <ParsedInfoRow data={message} key={message.date.toString()}/>
                )
            })}
        </Box>
    )
}

export default ParsedInfoTable