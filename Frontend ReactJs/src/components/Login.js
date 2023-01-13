import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import axios from 'axios';
const theme = createTheme();

const Login  = ()=> {
  const navigate = useNavigate();
  // const loc = useLocation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let data1 = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(data1);
    axios.post("http://localhost:8080/login",data1).then((res)=>{
      if(res.status===200){
        alert("Signed Up!!")
        // document.getElementById("proceed").style.visibility = "visible";
        // navigation.navigate("twoFA");
        console.log(res);
        // const qrc = res.data.qrc;
        navigate('/home',{state:{email:data1.email}});
      }
      else{
        alert("Error!!")
      }
    })
    .catch((e)=>{
      alert(e.message);
      // throw e;
    })
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            width:450,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography display="inline-flex" component="h1" variant="h3" color="#683bee">
        WELCOME TO NMS
        </Typography>
          <br />
          {/* <svg height="256" viewBox="0 0 256 256" width="256" xmlns="http://www.w3.org/2000/svg"><g fill="#000" stroke-miterlimit="10" stroke-width="0" transform="matrix(2.81 0 0 2.81 1.406593 1.406593)"><path d="m45 83.657c-.768 0-1.536-.293-2.121-.879l-21.379-21.379c-1.172-1.171-1.172-3.071 0-4.242 1.171-1.172 3.071-1.172 4.242 0l19.258 19.258 19.258-19.258c1.172-1.172 3.07-1.172 4.242 0 1.172 1.171 1.172 3.071 0 4.242l-21.379 21.379c-.586.586-1.353.879-2.121.879z"/><path d="m41.362 63.654c-.042 0-.085-.001-.128-.003-1.181-.05-2.223-.789-2.66-1.888l-8.547-21.484-4.866 10.387c-.494 1.055-1.553 1.728-2.717 1.728h-19.444c-1.657 0-3-1.343-3-3s1.343-3 3-3h17.536l6.998-14.938c.507-1.083 1.595-1.78 2.806-1.726 1.196.036 2.256.778 2.698 1.89l8.635 21.703 7.665-15.33c.51-1.02 1.591-1.677 2.692-1.658 1.14.003 2.179.652 2.683 1.674l4.129 8.385h28.158c1.657 0 3 1.343 3 3s-1.343 3-3 3h-30.024c-1.143 0-2.187-.649-2.691-1.675l-2.283-4.636-7.957 15.913c-.51 1.02-1.551 1.658-2.683 1.658z"/><path d="m4.764 41.399c-1.154 0-2.254-.67-2.749-1.795-3.962-9.024-2.025-19.352 4.935-26.312 9.25-9.251 24.304-9.251 33.556 0l4.494 4.495 4.494-4.494c9.251-9.251 24.303-9.253 33.556 0 6.96 6.959 8.897 17.287 4.935 26.311-.666 1.516-2.435 2.207-3.953 1.541s-2.207-2.436-1.541-3.953c2.961-6.743 1.516-14.458-3.683-19.656-6.911-6.911-18.158-6.913-25.071 0l-6.615 6.615c-1.172 1.172-3.071 1.172-4.242 0l-6.615-6.615c-6.912-6.911-18.159-6.911-25.071 0-5.198 5.198-6.644 12.914-3.683 19.657.666 1.517-.024 3.287-1.541 3.953-.394.171-.803.253-1.206.253z"/></g></svg>           */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' ,backgroundColor:"#683bee" }}>
            <LockOutlinedIcon />
            {/* <LoginSharpIcon /> */}
          </Avatar>
        
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="name1"
              autoComplete="Name"
              autoFocus
            /> */}
             <TextField
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email ID"
              name="email"
              autoComplete="text"
              autoFocus
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#683bee"}}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link sx={{color:"#683bee"}} href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;