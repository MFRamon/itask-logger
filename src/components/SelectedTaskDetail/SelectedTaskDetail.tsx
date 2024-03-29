import { Task } from "@/pages";
import { Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import styles from "@/components/SelectedTaskDetail/SelectedTaskDetail.module.css";

interface ISelectedTaskDetailProps {
  task: Task | undefined;
}

const SelectedTaskDetail = (props: ISelectedTaskDetailProps) => {
  const { id, description, duration, status, timeToFinish } = props.task || {};

  return (
    <Fragment>
      <Paper
        elevation={0}
        className={styles.itemContainer}
        sx={{ height: "142px", minHeight: "142px" }}
        data-testid="selected-task-detail"
      >
        <Grid container direction={"column"}>
          {props.task ? (
            <Fragment>
              <Typography variant="h6" data-testid="header-title">
                Selected Task:
              </Typography>
              <Grid item>
                <Typography
                  variant="body1"
                  data-testid={`task-${id}-description`}
                >{`Description: ${description}`}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  data-testid={`task-${id}-status`}
                >{`Status: ${status}`}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  data-testid={`task-${id}-duration`}
                >{`Duration:  ${duration} minutes`}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  data-testid={`task-${id}-remaining-time`}
                >{`Remaining minutes: ${timeToFinish}`}</Typography>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Grid item>
                <Typography
                  variant="body1"
                  data-testid={`selected-task-placeholder`}
                >
                  {"No task selected"}
                </Typography>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default SelectedTaskDetail;
