import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "@/components/CompletedTasksList/CompletedTasksList.module.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";

import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomDate,
} from "@mui/x-data-grid-generator";
import { PieChart } from '@mui/x-charts/PieChart';


const roles = ["PENDING", "IN-PROGRESS", "STOPPED", "FINISHED"];

const randomRole = () => {
  return randomArrayItem(roles);
};

interface ICompletedTasksTableProps {
  completedTasks: GridRowsProp;
}

const mockData: GridRowsProp = [
  {
    id: 1,
    description: randomTraderName(),
    timeToFinish: 20,
    // finishedAt: 30,
    duration: 25,
    status: randomRole(),
    creationDate: new Date(),
  },
  {
    id: 2,
    description: randomTraderName(),
    // timeToFinish: 20,
    // finishedAt: 30,
    duration: 36,
    status: randomRole(),
    creationDate: new Date(),
  },
];

// Numbero de tareas terminadas 
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const CompletedTasksList = (props: ICompletedTasksTableProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  const { completedTasks = mockData } = props;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <Fragment>
      <Paper
        sx={{ minWidth: 275, minHeight: 500 }}
        className={styles.cardContainer}
        elevation={0}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          gap={3}
        >
          {/* Header for container */}
          <Grid item id={"finished-tasks-title"} alignSelf={"flex-start"}>
            <Typography variant="h5" gutterBottom>
              Finished Tasks
            </Typography>
          </Grid>

          {/* Chart for Data */}
          <Grid item >
            <Paper
              id={"paper-containe-chart"}
              className={styles.chart}
              elevation={0}
            >
              {/* Line Chart for Finished Tasks */}
              <Grid item>
              <LineChart
                  width={400}
                  height={300}
                  series={[
                    { data: pData, label: 'pv' },
                  ]}
                  xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
              </Grid>
            </Paper>
          </Grid>

          {/* TODO: Check Hydration */}
          {domLoaded && (
            <Grid
              item
              sx={{
                width: "100%",
                minHeight: "150px",
                maxHeight: "150px",
                height: "150px",
              }}
            >
              <List
                sx={{
                  overflow: "auto",
                  maxHeight: 200,
                }}
              >
                {completedTasks.map((task, id) => (
                  <>
                    <ListItem id={"1"} alignItems="flex-start">
                      <Grid
                        container
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                        sx={{ width: "80%" }}
                      >
                        <Grid item>
                          <ListItemText primary={task.description} />
                          <Chip
                            sx={{ borderRadius: "8px" }}
                            label={task.status}
                          />
                        </Grid>
                      </Grid>

                      {/* Le tomo x minutos */}
                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary={`${task.completedTime} minutes`}
                            secondary={task.finishedDate.toString()}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default CompletedTasksList;
