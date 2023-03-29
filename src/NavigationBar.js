import React,{ useState, useEffect } from "react"
import Axios from "axios"
import {AppBar, Box, Toolbar, Typography, IconButton, Switch, FormControlLabel, FormGroup, MenuItem, Menu} from '@mui/material/';
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'

export default function NavigationBar(props){
    const [anchorEl, setAnchorEl] = useState(null)
    const [ loggedInUser, setLoggedInUser ] = useState({})

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null)
        props.logout()
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/api/loggedInUser")
        .then((response) => {
            setLoggedInUser(response.data)
        });
      }, [])

    return(
        <AppBar position="static" enableColorOnDark>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Simple Chat App
                </Typography>
                {props.isLoggedIn && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome {loggedInUser.username}
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}