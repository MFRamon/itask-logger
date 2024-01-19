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
    // This represents the amount of minutes remaining for finishing the task
    timeToFinish: 20,
    finishedAt: 30,
    duration: 25,
    status: randomRole(),
    creationDate: new Date(),
  },
  {
    id: 2,
    description: randomTraderName(),
    timeToFinish: 20,
    finishedAt: 30,
    duration: 36,
    status: randomRole(),
    creationDate: new Date(),
  },
];

const CompletedTasksList = (props: ICompletedTasksTableProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  const { completedTasks = mockData } = props;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  console.log(completedTasks);

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
          <Grid item>
            <Paper
              id={"paper-containe-chart"}
              className={styles.chart}
              elevation={0}
            >
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
                    <ListItem alignItems="flex-start">
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

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText primary={`${task.duration} minutos`} />
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
