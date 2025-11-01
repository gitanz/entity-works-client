import { AppBar, styled, TextField } from "@mui/material"
import "@vscode/codicons/dist/codicon.css"

interface Props {
    className: string
}

export default function Topbar(props: Props) {
    return (
        <>
            <AppBar 
                position="relative" 
                className={props.className}
                >
                <div>
                    <TextField
                        label="Search entity and resources by name"
                        variant="outlined"
                        size="small"
                        sx={{
                            "& .MuiFormControl-root": {
                                padding: "4px 8px",
                            },
                            "& .MuiInputBase-root": {
                                fontSize: "0.8rem",
                                height: "32px",
                                width: "25vw"
                            },
                            "& .MuiInputLabel-root": {
                                fontSize: "0.8rem",
                            },
                        }}
                        className="global-search"
                    />

                    <div className='codicon codicon-layout-sidebar-left'></div>
                    <div className='codicon codicon-layout-panel'></div>
                    <div className='codicon codicon-layout-sidebar-left'></div>
                </div>
            </AppBar>
        </>
    )
}
