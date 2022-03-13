import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'

/*
 * small react projects
 * github: intergoose
*/

const Header = ({ appName }) => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" color="inherit" component="div">
                    {appName}
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header
