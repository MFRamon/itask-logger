import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { GridRowsProp } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "@/components/CompletedTasksList/CompletedTasksList.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";

import {
  randomTraderName,
  randomArrayItem,
} from "@mui/x-data-grid-generator";


const roles = ["PENDING", "IN-PROGRESS", "STOPPED", "FINISHED"];

const randomRole = () => {
  return randomArrayItem(roles);
};

interface ICompletedTasksTableProps {
  completedTasks: GridRowsProp;
}


const CompletedTasksList = (props: ICompletedTasksTableProps) => {
  const [domLoaded, setDomLoaded] = useState(false);
  
  const { completedTasks  } = props;

  const dates = (startDate: Date, num: number) => Array.from(
    { length: num },
    (_, i) =>  new Date(startDate.getTime() + (i * 60000 * 60 * 24)).toISOString().slice(8, 10)
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCountOfFinishedTasks = () => {
    let date = new Date();
    date.setDate(date.getDate() - date.getDay() - 6);
    const weekDays = dates(date, 7);

    const finalDatesArray: any = new Array(weekDays.length).fill(0);
    completedTasks.forEach((task) => {
        weekDays.forEach((day, index) => {
          if (task.finishedDate.toISOString().slice(8, 10) === day) {
              finalDatesArray[index] += 1;
          }
        })
    })
    
    console.log(finalDatesArray);
    return [weekDays, finalDatesArray]
  }

  const [weekDays, finalDatesArray] = getCountOfFinishedTasks();

  console.log(finalDatesArray);

  useEffect(() => {
    setDomLoaded(true);
    //getCountOfFinishedTasks();
  }, []);

  return (
    <Fragment>
      <Paper
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
                    { data: finalDatesArray, label: 'Finished Tasks' },
                  ]}
                  xAxis={[{ scaleType: 'point', data: weekDays }]}
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
              key={2}
                sx={{
                  overflow: "auto",
                  maxHeight: 200,
                }}
              >
                {completedTasks.map((task, id) => (
                  <>
                    <ListItem key={id} alignItems="flex-start">
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
                            color="success"
                          />
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText
                            primary={`${task.completedTime} minutes`}
                            secondary={task.finishedDate.toISOString()}
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
