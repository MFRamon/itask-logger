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


interface ICompletedTasksTableProps {
  completedTasks: GridRowsProp;
  columns: GridColDef[];
  children?: React.ReactNode
}

export default function CompletedTasksTable(props: ICompletedTasksTableProps) {  
    const { completedTasks, columns } = props;

    return (
      <React.Fragment>
        <Card sx={{ minWidth: 275, minHeight: 500 }}>
          <CardContent>
            <Grid container spacing={2} direction={"column"}>
              {/* Header for container */}
              <Grid item>
                <Typography variant="h6">
                    Finished Tasks
                </Typography>
              </Grid>
              {/* Chart for Data */}
              <Grid item>
                <Paper id={"paper-containe-chart"} elevation={3} className={styles.chart}>
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
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </Paper>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </React.Fragment>
    )
}
  