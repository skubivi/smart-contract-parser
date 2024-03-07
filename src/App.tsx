import { Box } from "@mui/material"
import { FC, useState } from "react"
import JsonFileInput from "./components/json-file-input/json-file-input"
import { TParsedInfo } from "./sevices/types/jsonData"
import ParsedInfoTable from "./components/parsed-info-table/parsed-info-table"

const App: FC = () => {
  const [data, setData] = useState<TParsedInfo>({
    name: '',
    messages: []
  })

  const handleUpdateData = (newData: TParsedInfo) => {
    console.log(newData);
    setData(newData)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <JsonFileInput onClick={handleUpdateData}/>
      <ParsedInfoTable data={data} />
    </Box>
  )
}

export default App
