import { Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import { TMessageText, TParsedSingleMessage } from "../../../../sevices/types/jsonData";
import { getTextFromDate } from "../../../../sevices/utils/get-text-from-date";
import { copyToClipboard } from "../../../../sevices/utils/copy-to-clipboard";
import StyledSnackbar from "../../../styled-snackbar/styled-snackbar";

interface IOneRow {
    label?: string,
    value: TMessageText
}

const OneRow: FC<IOneRow> = ({
    label,
    value
}) => {
    let text = ''
    let type = 'text'
    if (typeof value === 'string') text = value
    else {
        text = value.text
        type = value.type
    }
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const handleClick = async () => {
        if (type === 'link') {
            const result = await copyToClipboard(text)
            if (result) setSnackBarMessage('Ссылка скопирована в буфер обмена')
            else setSnackBarMessage('Что-то пошло не так')
            setShowSnackbar(true)
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <Typography
                sx={{
                    width: '15%'
                }}
            >
                {label}
            </Typography>
            <Typography
                sx={{
                    textAlign: 'left',
                    maxWidth: '80%',
                    minWidth: '80%',
                    overflow: 'hidden',
                    ":hover": type === 'link' ? {
                        cursor: 'pointer',
                        background: 'lightgrey'
                    } : {}
                }}
                onClick={handleClick}
            >
                {text}
            </Typography>
            <StyledSnackbar state={showSnackbar} setState={setShowSnackbar} message={snackBarMessage}/>
        </Box>
    )
}

interface IOpenedInfoRow {
    data: TParsedSingleMessage
}

const OpenedInfoRow: FC<IOpenedInfoRow> = ({
    data
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: 1,
                padding: 5,
                marginLeft: -5,
                overflow: 'hidden',
                animation: 'slidein 1s ease-in-out forwards',
                borderTop: '1px solid grey',
                marginTop: 1
            }}
        >
            <OneRow label="Автор поста" value={data.from} />
            <OneRow label="Смарт контракт" value={data.smartContractAddress} />
            <OneRow label="Дата публикации поста" value={getTextFromDate(data.date)} />
            {getTextFromDate(data.date) !== getTextFromDate(data.edited) && <OneRow label='Дата изменения поста' value={getTextFromDate(data.edited)} />}
            {
                data.text.map(
                    (element, index) => 
                        <OneRow 
                            label={index === 0 ? 'Текст поста' : undefined} 
                            value={element} 
                            key={typeof element === 'string' ? element : element.text}
                        />
                )
            }
        </Box>
    )
}

export default OpenedInfoRow