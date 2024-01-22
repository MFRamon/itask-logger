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
      >
        <Grid container direction={"column"}>
          {props.task ? (
            <Fragment>
              <Typography variant="h6">Selected Task:</Typography>
              <Grid item>
                <Typography variant="body1">{`Description:  ${description}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`Status:  ${status}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`Duration:  ${duration} minutes`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`Remaining minutes: ${timeToFinish}`}</Typography>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Grid item>
                <Typography variant="body1">{"No task selected"}</Typography>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default SelectedTaskDetail;
