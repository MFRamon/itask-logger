import { Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import styles from "@/components/SelectedTaskDetail/SelectedTaskDetail.module.css"

interface ITasksCountProps {
    title: string;
    count: number;
}

const TasksCount = (props: ITasksCountProps) => {
    const { title, count } = props || {};

    return (
        <Fragment>
            <Paper elevation={2} className={styles.itemContainer}>
                <Typography variant="h6">
                  {title}
                </Typography>
                <Grid container direction={"column"}>
                  <Grid item>
                      <Typography variant='body1'>{count}</Typography>
                  </Grid>
                </Grid>
            </Paper>
        </Fragment>
    )
}

export default TasksCount;