import { FC, useState } from "react"
import { TParsedSingleMessage } from "../../../../sevices/types/jsonData"
import { Box, Collapse, Divider, IconButton, Typography } from "@mui/material"
import { getTextFromDate } from "../../../../sevices/utils/get-text-from-date"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OpenedInfoRow from "../opened-info-row/opened-info-row";
import { copyToClipboard } from "../../../../sevices/utils/copy-to-clipboard";
import StyledSnackbar from "../../../styled-snackbar/styled-snackbar";

interface IParsedInfoRow {
    data?: TParsedSingleMessage
    isHeader?: boolean
}

const getTextFromSmartContractAddress = (s: string) => {
    if (s.length > 44) return s.slice(0, 44) + '...'
    return s
}

const ParsedInfoRow: FC<IParsedInfoRow> = ({
    data,
    isHeader
}) => {
    const [isOpened, setIsOpened] = useState(false)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const handleClick = () => {
        setIsOpened(prev => !prev)
    }
    if (isHeader) return (
        <Box
            sx={{
                width: 800,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                gap: 4
            }}
        >
            <Typography
                sx={{
                    width: 50,
                    textAlign: 'center'
                }}
            >
                Id
            </Typography>
            <Divider orientation="vertical"/>
            <Typography
                sx={{
                    width: 450,
                    textAlign: 'center'
                }}
            >
                Смарт контракт
            </Typography>
            <Divider orientation="vertical"/>
            <Typography
                sx={{
                    width: 100,
                    textAlign: 'center'
                }}
            >
                Дата поста
            </Typography>
            <Divider orientation="vertical"/>
            <IconButton
                size="small"
                sx={{
                    opacity: 0,
                    cursor: 'default'
                }}
                onClick={handleClick}
            >
                <ArrowDropDownIcon />
            </IconButton>
        </Box>
    )
    const handleCopyToClipboard = async () => {
        const result = await copyToClipboard(data?.smartContractAddress)
        if (result) setSnackBarMessage('Адрес смарт контракта скопирован в буфер обмена')
        else setSnackBarMessage('Что-то пошло не так')
        setShowSnackbar(true)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 800,
                border: '1px solid grey',
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 2
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    gap: 4
                }}
            >
                <Typography
                    sx={{
                        width: 50,
                        textAlign: 'center'
                    }}
                >
                    {data && data.id}
                </Typography>
                <Divider orientation="vertical"/>
                <Box
                    sx={{
                        width: 450
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: 'left',
                            cursor: 'pointer',
                            borderRadius: 2,
                            paddingLeft: 1,
                            paddingRight: 1,
                            width: 'fit-content',
                            ':hover': {
                                background: 'lightgrey'
                            }
                        }}
                        onClick={handleCopyToClipboard}
                    >
                        {data && getTextFromSmartContractAddress(data.smartContractAddress)}
                    </Typography>
                </Box>
                <Divider orientation="vertical"/>
                <Typography
                    sx={{
                        width: 100,
                        textAlign: 'center'
                    }}
                >
                    {data && getTextFromDate(data.date)}
                </Typography>
                <Divider orientation="vertical"/>
                <IconButton
                    size="small"
                    onClick={handleClick}
                    sx={{
                        transition: 'transform 0.4s ease-in-out',
                        transform: isOpened ? 'rotate(180deg)' : 'none'
                    }}
                >
                    <ArrowDropDownIcon />
                </IconButton>
            </Box>
            {data && 
                <Collapse in={isOpened}>
                    <OpenedInfoRow data={data} />
                </Collapse>
            }
            <StyledSnackbar state={showSnackbar} setState={setShowSnackbar} message={snackBarMessage}/>
        </Box>
    )
}

export default ParsedInfoRow