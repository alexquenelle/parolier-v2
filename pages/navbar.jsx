import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import Home from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const router = useRouter();
    const cookies = new Cookies();
    const textInput_search = React.useRef(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem onClick={() => router.push('/')}>
                <IconButton size="large" color="inherit">
                    <Badge color="error">
                        <Home />
                    </Badge>
                </IconButton>
                <p>Home</p>
            </MenuItem>
            <MenuItem onClick={() => router.push('/settings')}>
                <IconButton size="large" color="inherit">
                    <Badge color="error">
                        <Settings />
                    </Badge>
                </IconButton>
                <p>Settings</p>
            </MenuItem>
            {cookies.get('adminConnected') ? (
                <MenuItem
                    onClick={() => {
                        cookies.remove('adminConnected');
                        router.push('/');
                    }}>
                    <IconButton size="large" color="inherit">
                        <Badge color="error">
                            <LogoutIcon />
                        </Badge>
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            ) : (
                <MenuItem onClick={() => router.push('/settings')}>
                    <IconButton size="large" color="inherit">
                        <Badge color="error">
                            <LoginIcon />
                        </Badge>
                    </IconButton>
                    <p>Login</p>
                </MenuItem>
            )}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            <MenuItem onClick={() => router.push('/')}>
                <IconButton size="large" color="inherit">
                    <Badge color="error">
                        <Home />
                    </Badge>
                </IconButton>
                <p>Home</p>
            </MenuItem>
            <MenuItem onClick={() => router.push('/settings')}>
                <IconButton size="large" color="inherit">
                    <Badge color="error">
                        <Settings />
                    </Badge>
                </IconButton>
                <p>Settings</p>
            </MenuItem>
            {cookies.get('adminConnected') ? (
                <MenuItem
                    onClick={() => {
                        cookies.remove('adminConnected');
                        router.push('/');
                    }}>
                    <IconButton size="large" color="inherit">
                        <Badge color="error">
                            <LogoutIcon />
                        </Badge>
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            ) : (
                <MenuItem onClick={() => router.push('/settings')}>
                    <IconButton size="large" color="inherit">
                        <Badge color="error">
                            <LoginIcon />
                        </Badge>
                    </IconButton>
                    <p>Login</p>
                </MenuItem>
            )}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '80px' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Parolier
                    </Typography>
                    <Search
                        onChange={(e) => {
                            props.funcSearch(e.target.value);
                        }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            inputRef={textInput_search}
                            defaultValue={''}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <CloseIcon
                            style={{
                                position: 'absolute',
                                right: '7px',
                                top: '7px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                textInput_search.current.value = '';
                            }}></CloseIcon>
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
