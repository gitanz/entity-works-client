
import { AutoAwesomeMosaic } from "@mui/icons-material"
import { ListItemIcon, MenuItem, MenuList, Paper, styled} from "@mui/material"

interface Props {
    className: string
}

const NavbarItem = styled(MenuItem)({
  paddingTop: 10,
  paddingBottom: 10
});

const NavbarItemIcon = styled(ListItemIcon) ({
    color: '#999',
    fontWeight: '100'
})

export default function Navbar(props: Props) {
    return (
        <>
            <div className={props.className}>
                <Paper sx={{ width: 320, maxWidth: '100%' }}>

                    <MenuList>
                        <NavbarItem>
                            <NavbarItemIcon>
                                <AutoAwesomeMosaic fontSize="medium" />
                            </NavbarItemIcon>
                        </NavbarItem>
                        <NavbarItem>
                            <NavbarItemIcon>
                                <AutoAwesomeMosaic fontSize="medium" />
                            </NavbarItemIcon>
                        </NavbarItem>
                        <NavbarItem>
                            <NavbarItemIcon>
                                <AutoAwesomeMosaic fontSize="medium" />
                            </NavbarItemIcon>
                        </NavbarItem>
                    </MenuList>
                    </Paper>
            </div>
        </>
    )
}
