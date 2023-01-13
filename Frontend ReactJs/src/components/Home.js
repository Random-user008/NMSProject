import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import AdbIcon from '@mui/icons-material/Adb';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Landing.css";
const styles = theme => ({
  // Load app bar information from the theme
  toolbar: theme.mixins.toolbar,
});
const pages = ['Add Device'];
const settings = ['Profile', 'Logout'];
const Home = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoad, setIsLoad] = React.useState(false);
  const [req, setReq] = React.useState(null);
  let location = useLocation();
  let userD = location.state.email;
  let count = 0;
  const data1 = {
    email: userD,
    name: "SomeName"
  }
  React.useEffect(() => {
    function fetchDevices() {
      axios.post("http://localhost:8080/land", data1).then((res) => {
        console.log(res.data);
        if(res.data==="No devices"){
          setIsLoad(false);
          return;
        }
        else{
          const js = JSON.stringify(res.data);
          const data = JSON.parse(js);
          const len = data.length;
          console.log(len);
          if (len !== 0) {
            setReq(data);
            setIsLoad(true);
          }
        }
        
      }).catch((err) => {
        alert(err);
      })
    }
    fetchDevices();
  }, [])
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (val) => {
    setAnchorElUser(null);
    if (val === 0) {
      navigate('/profile', { state: { email: userD } });
    }
    else {
      navigate('/');
    }
  };

  const buttonClick = (val) => {
    if (val === 1) {
      navigate('/adddet', { state: { userD: userD } });
    }
    else if (val === 2) {
      navigate('/editdet', { state: { userD: userD } });
    }
  };

  const raiseAlert = (val) =>{
      console.log(req[val]);
  }

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#683bee' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MonitorHeartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Network Management System
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link href='/adddet'><Typography textAlign="center">{page}</Typography></Link>
                  </MenuItem>
                ))} */}
                <Button onClick={buttonClick}>
                  <MenuItem key={pages[0]} onClick={handleCloseNavMenu}>
                    <Link href='/adddet'><Typography textAlign="center">{pages[0]}</Typography></Link>
                  </MenuItem>
                </Button>
                <Button onClick={buttonClick}>
                  <MenuItem key={pages[1]} onClick={handleCloseNavMenu}>
                    <Link href='/editdet'><Typography textAlign="center">{pages[1]}</Typography></Link>
                  </MenuItem>
                </Button>

              </Menu>
            </Box>
            <MonitorHeartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Network Management System
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                key={pages[0]}
                onClick={() => buttonClick(1)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[0]}
              </Button>
              <Button
                key={pages[1]}
                onClick={() => buttonClick(2)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[1]}
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color='secondary.main'>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={userD} >
                  <Typography textAlign="center" href="/home">Welcome {userD}!</Typography>
                </MenuItem>
                {settings.map((setting, index) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(index)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>

      </AppBar>
      <>
        <Typography textAlign="center" component="h1" variant="h3" color="black">
          WELCOME TO Network Management System
        </Typography>
        <br />
        <br />
        <div>
          {
            isLoad ? (<div>
              <Typography textAlign="center" component="h1" variant="h5" color="black">
                Your Devices
                <div className='cardFlex'>
                  {
                    req.map((data,index) => {
                      count = count+1;
                      return (
                        <div className='card'>
                          <p>{data['Device Name']}</p>
                          <p>{data['User ID']}</p>
                          <p>{data['IP']}</p>
                          <button onClick={()=>raiseAlert(index)} className='button' key={count} name={data['IP']}>Raise Alert!!</button>
                        </div>

                      )
                    })
                  }
                </div>

              </Typography>
            </div>) : (<div>
              <Typography textAlign="center" component="h1" variant="h5" color="black">
                No Devices Found
              </Typography>
            </div>)
          }
        </div>
        {/* <svg height="256" viewBox="0 0 256 256" width="256" xmlns="http://www.w3.org/2000/svg"><g fill="#000" stroke-miterlimit="10" stroke-width="0" transform="matrix(2.81 0 0 2.81 1.406593 1.406593)"><path d="m45 83.657c-.768 0-1.536-.293-2.121-.879l-21.379-21.379c-1.172-1.171-1.172-3.071 0-4.242 1.171-1.172 3.071-1.172 4.242 0l19.258 19.258 19.258-19.258c1.172-1.172 3.07-1.172 4.242 0 1.172 1.171 1.172 3.071 0 4.242l-21.379 21.379c-.586.586-1.353.879-2.121.879z"/><path d="m41.362 63.654c-.042 0-.085-.001-.128-.003-1.181-.05-2.223-.789-2.66-1.888l-8.547-21.484-4.866 10.387c-.494 1.055-1.553 1.728-2.717 1.728h-19.444c-1.657 0-3-1.343-3-3s1.343-3 3-3h17.536l6.998-14.938c.507-1.083 1.595-1.78 2.806-1.726 1.196.036 2.256.778 2.698 1.89l8.635 21.703 7.665-15.33c.51-1.02 1.591-1.677 2.692-1.658 1.14.003 2.179.652 2.683 1.674l4.129 8.385h28.158c1.657 0 3 1.343 3 3s-1.343 3-3 3h-30.024c-1.143 0-2.187-.649-2.691-1.675l-2.283-4.636-7.957 15.913c-.51 1.02-1.551 1.658-2.683 1.658z"/><path d="m4.764 41.399c-1.154 0-2.254-.67-2.749-1.795-3.962-9.024-2.025-19.352 4.935-26.312 9.25-9.251 24.304-9.251 33.556 0l4.494 4.495 4.494-4.494c9.251-9.251 24.303-9.253 33.556 0 6.96 6.959 8.897 17.287 4.935 26.311-.666 1.516-2.435 2.207-3.953 1.541s-2.207-2.436-1.541-3.953c2.961-6.743 1.516-14.458-3.683-19.656-6.911-6.911-18.158-6.913-25.071 0l-6.615 6.615c-1.172 1.172-3.071 1.172-4.242 0l-6.615-6.615c-6.912-6.911-18.159-6.911-25.071 0-5.198 5.198-6.644 12.914-3.683 19.657.666 1.517-.024 3.287-1.541 3.953-.394.171-.803.253-1.206.253z"/></g></svg>           */}
        <br />
        <Typography textAlign="center" component="p" variant="p" color="black">
          <b>A Network Management System (NMS) is a system used to manage and monitor the performance of network devices, such as routers and switches.</b>
        </Typography>
        <hr />
        <Typography textAlign="center" component="h1" variant="h5" color="black">
          <b>a Network Management System built using Java Spring, Reactjs, and MongoDB would be a web-based application that allows network administrators to manage and monitor the performance of their network devices, while storing data in MongoDB. Reactjs would be used to create the user interface and Java Spring would be used to build the backend.</b>
        </Typography>
      </>
    </>

  );
}

export default Home