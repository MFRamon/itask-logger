import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styles from '@/components/LogoSubheader/LogoSubheader.module.css'

interface ILogoSubheaderProps {
    //TODO: To define interface
}


export default function LogoSubheader(props: ILogoSubheaderProps) {  

    return (
      <React.Fragment>
        <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <Paper elevation={1} className={styles.itemContainer}>
                  <Avatar sx={{ bgcolor: green[500], marginBottom: '10px' }} variant="rounded">
                    <AssignmentIcon />
                  </Avatar>
                  <Typography variant="h6">
                      Total Tasks
                  </Typography>
                  <Typography variant="body1">
                      100
                  </Typography>
                </Paper>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Paper elevation={1} className={styles.itemContainer}>
                  <Avatar sx={{ bgcolor: green[500], marginBottom: '10px' }} variant="rounded">
                    <AssignmentIcon />
                  </Avatar>
                  <Typography variant="h6">
                      Pending Tasks
                  </Typography>
                  <Typography variant="body1">
                      100
                  </Typography>
              </Paper>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Paper elevation={2} className={styles.itemContainer}>
                  <Avatar sx={{ bgcolor: green[500], marginBottom: '10px' }} variant="rounded">
                  <AssignmentIcon />
                  </Avatar>
                  <Typography variant="h6">
                      Pending Tasks
                  </Typography>
                  <Typography variant="body1">
                      100
                  </Typography>
              </Paper>
            </Grid>
        </Grid>
      </React.Fragment>
    )
}