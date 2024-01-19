import { Task } from "@/pages";
import { Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import styles from "@/components/SelectedTaskDetail/SelectedTaskDetail.module.css"

interface ISelectedTaskDetailProps {
    task: Task
}

const SelectedTaskDetail = (props: ISelectedTaskDetailProps) => {
    const { description, duration, status } = props.task || {}

    return (
        <Fragment>
            <Paper elevation={1} className={styles.itemContainer} sx={{height: '142px', minHeight: '142px'}}>
                <Typography variant="h6">
                    Selected Task: 
                </Typography>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Typography variant='body1'>{`Description:  ${description}`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>{`Duration:  ${duration} minutes`}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>{`Status:  ${status}`}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Fragment>
    )
}

export default SelectedTaskDetail;