import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import theme from '../../theme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { ListItemIcon } from '@mui/material';
export default function BookingList() {
  return (
   <ThemeProvider theme={theme}>
     <List sx={{ width: '100%', maxWidth:{
       md: '40vw',
       sm:700,
       xs:300,
       sx:250 
     }, bgcolor: 'background.paper',marginLeft:{
       md:'auto',
       sm:'auto',
       xs:'90px',
       sx:'90px'
     },marginRight:'auto',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 10px',marginTop:'40px' }}>
      <ListItem alignItems="flex-start">
      
        {/* <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar> */}
        <ListItemIcon sx={{fontSize:'500px',color:'black'}}>
            <TimeToLeaveIcon/>
        </ListItemIcon>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
      <ListItemIcon sx={{fontSize:'500px',color:'black'}}>
            <TimeToLeaveIcon/>
        </ListItemIcon>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
      <ListItemIcon sx={{fontSize:'500px',color:'black'}}>
            <TimeToLeaveIcon/>
        </ListItemIcon>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
   </ThemeProvider>
    
  );
}
