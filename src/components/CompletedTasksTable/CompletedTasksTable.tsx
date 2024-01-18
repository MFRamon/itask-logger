import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
  GridRowsProp,
  GridColDef,
} from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { LineChart } from '@mui/x-charts/LineChart';
import styles from '@/components/CompletedTasksTable/CompletedTasksTable.module.css';

// List
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


interface ICompletedTasksTableProps {
  completedTasks: GridRowsProp;
  columns: GridColDef[];
  children?: React.ReactNode
}

export default function CompletedTasksTable(props: ICompletedTasksTableProps) {  
    const { completedTasks, columns } = props;

    return (
      <React.Fragment>
        <Card sx={{ minWidth: 275, minHeight: 500 }} className={styles.cardContainer}>
          <CardContent >
            <Grid container spacing={2} direction={"column"}>
              {/* Header for container */}
              <Grid item>
                <Typography variant="h6">
                    Finished Tasks
                </Typography>
              </Grid>
              
              {/* Chart for Data */}
              <Grid item>
                <Paper id={"paper-containe-chart"} elevation={2} className={styles.chart}>
                  {/* Subheaders */}
                  <Grid container direction={"column"} alignItems="flex-start">
                    <Grid item>
                      <Typography variant="body1">
                          Finished Tasks
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                          Finished Tasks
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* Line Chart for Finished Tasks */}
                  <Grid item>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                          area: true,
                        },
                      ]}
                      width={300}
                      height={200}
                    />
                  </Grid>
                  
                 
                </Paper>
              </Grid>

              {/* Finished Tasks List */}
              <Grid item>
                <List sx={{ width: '100%', maxWidth: 360, overflow: 'auto', maxHeight: 200, }}> 
                    <ListItem alignItems="flex-start">
                      <Grid container flexDirection={"column"} justifyContent={"space-between"}>
                        <Grid item>
                          <ListItemText
                            primary="Brunch this weekend?"
                          />
                          <ListItemText
                            primary="40Mins"
                          />
                        </Grid>                    
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary="20Mins"
                          />
                        </Grid>
                      </Grid>    
                    </ListItem>  
                    <ListItem alignItems="flex-start">
                      <Grid container flexDirection={"column"} justifyContent={"space-between"}>
                        <Grid item>
                          <ListItemText
                            primary="Brunch this weekend?"
                          />
                          <ListItemText
                            primary="40Mins"
                          />
                        </Grid>                    
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary="20Mins"
                          />
                        </Grid>
                      </Grid>    
                    </ListItem>  
                    <ListItem alignItems="flex-start">
                      <Grid container flexDirection={"column"} justifyContent={"space-between"}>
                        <Grid item>
                          <ListItemText
                            primary="Brunch this weekend?"
                          />
                          <ListItemText
                            primary="40Mins"
                          />
                        </Grid>                    
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary="20Mins"
                          />
                        </Grid>
                      </Grid>    
                    </ListItem>  
                    <ListItem alignItems="flex-start">
                      <Grid container flexDirection={"column"} justifyContent={"space-between"}>
                        <Grid item>
                          <ListItemText
                            primary="Brunch this weekend?"
                          />
                          <ListItemText
                            primary="40Mins"
                          />
                        </Grid>                    
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary="20Mins"
                          />
                        </Grid>
                      </Grid>    
                    </ListItem>  
                    <ListItem alignItems="flex-start">
                      <Grid container flexDirection={"column"} justifyContent={"space-between"}>
                        <Grid item>
                          <ListItemText
                            primary="Brunch this weekend?"
                          />
                          <ListItemText
                            primary="40Mins"
                          />
                        </Grid>                    
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary="20Mins"
                          />
                        </Grid>
                      </Grid>    
                    </ListItem>  
                    <ListItem alignItems="flex-start">
                      <Grid container flexDirection={"column"} justifyContent={"space-between"}>
                        <Grid item>
                          <ListItemText
                            primary="Brunch this weekend?"
                          />
                          <ListItemText
                            primary="40Mins"
                          />
                        </Grid>                    
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary="20Mins"
                          />
                        </Grid>
                      </Grid>    
                    </ListItem>  
                    <ListItem alignItems="flex-start">
                      <Grid container flexDirection={"column"} justifyContent={"space-between"}>
                        <Grid item>
                          <ListItemText
                            primary="Brunch this weekend?"
                          />
                          <ListItemText
                            primary="40Mins"
                          />
                        </Grid>                    
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary="20Mins"
                          />
                        </Grid>
                      </Grid>    
                    </ListItem>  

                    <Divider variant="inset" component="li" />
                </List>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </React.Fragment>
    )
}
  