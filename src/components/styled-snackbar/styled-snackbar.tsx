import { Slide, Snackbar } from "@mui/material";
import { FC } from "react";

interface IStyledSnackbar {
    state: boolean,
    setState: (b: boolean) => void
    message: string
}

const StyledSnackbar: FC<IStyledSnackbar> = ({
    state,
    setState,
    message
}) => {
    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway')
            return

        setState(false)
    }
    return (
        <Snackbar 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={state}
            onClose={handleClose}
            autoHideDuration={1000}
            TransitionComponent={Slide}
            message={message}
        />
    )
}

export default StyledSnackbar