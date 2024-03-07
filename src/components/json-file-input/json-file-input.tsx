import { FC, useRef } from "react"
import { readJsonFile } from "./utils";
import { TJsonData, TParsedInfo} from "../../sevices/types/jsonData";
import { parseSmartContracts } from "../../sevices/utils/parse-smart-contracts";
import { Button, Typography } from "@mui/material";

interface IJsonFileInput {
    onClick: (data: TParsedInfo) => void
}

const JsonFileInput: FC<IJsonFileInput> = ({
    onClick
}) => {
    const ref = useRef<HTMLInputElement>(null)

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const readedData = await readJsonFile(event.target.files[0]) as TJsonData
            const parsedData = parseSmartContracts(readedData)
            
            onClick(parsedData)
        }
    }

    const handleClick = () => {    
        if (ref.current) ref.current.click()
    }

    return (
        <>
            <input type="file" accept=".json,application/json" onChange={onChange} ref={ref} hidden/>
            <Button 
                onClick={handleClick}
                variant="outlined"
                color='primary'
                fullWidth
            >
                <Typography>
                    Загрузить JSON
                </Typography>
            </Button>
        </>
    )
}

export default JsonFileInput