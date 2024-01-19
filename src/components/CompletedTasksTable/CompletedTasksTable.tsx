import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "@/components/CompletedTasksTable/CompletedTasksTable.module.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

interface ICompletedTasksTableProps {
  completedTasks: GridRowsProp;
  columns: GridColDef[];
  children?: React.ReactNode;
}

const CompletedTasksTable = (props: ICompletedTasksTableProps) => {
  const { completedTasks, columns } = props;
  console.log(completedTasks);

  return (
    <Fragment>
      <Card
        sx={{ minWidth: 275, minHeight: 500 }}
        className={styles.cardContainer}
      >
        <CardContent sx={{ padding: "0px" }}>
          <Grid
            container
            spacing={2}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {/* Header for container */}
            <Grid item id={"finished-tasks-title"} alignSelf={"flex-start"}>
              <Typography variant="h5">Finished Tasks</Typography>
            </Grid>

            {/* Chart for Data */}
            <Grid item>
              <Paper id={"paper-containe-chart"} className={styles.chart}>
                {/* Subheaders */}
                <Grid container direction={"column"} alignItems="flex-start">
                  <Grid item>
                    <Typography variant="body1">Finished Tasks</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Finished Tasks</Typography>
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
              <List
                sx={{
                  width: "400px",
                  overflow: "auto",
                  maxHeight: 200,
                  backgroundColor: "green",
                }}
              >
                {completedTasks.map((task, id) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <Grid
                        container
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                      >
                        <Grid item>
                          <ListItemText primary={task.description} />
                          <ListItemText primary={task.status} />
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container flexDirection={"row"}>
                          <ListItemText primary={task.duration} />
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default CompletedTasksTable;
