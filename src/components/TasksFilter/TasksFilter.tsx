import { Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import styles from "@/components/SelectedTaskDetail/SelectedTaskDetail.module.css";
import Button from '@mui/material/Button';

interface ITasksCountProps {
  title: string;
  setSelectedFilter: (filterName: string) => void;
}

const TasksFilter = (props: ITasksCountProps) => {
  const { title, setSelectedFilter } = props || {};

  const handleShortDurationFilter = () => {
    setSelectedFilter("SHORT");
  };

  const handleMediumDurationFilter = () => {
    setSelectedFilter("MEDIUM");
  };

  const handleHighDurationFilter = () => {
    setSelectedFilter("HIGH");
  };

  const handleResetFilter = () => {
    setSelectedFilter("NONE");
  };

  return (
    <Fragment>
      <Paper elevation={0} className={styles.itemContainer}  sx={{ height: "142px", minHeight: "142px" }}>
        <Grid container direction={"row"}>
          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{"Filter the rows with the corresponding data"}</Typography>
          </Grid>
          <Grid item>
            <Button size="small" variant="outlined" onClick={handleShortDurationFilter}>Short</Button>
          </Grid>
          <Grid item>
            <Button size="small" variant="outlined" onClick={handleMediumDurationFilter}>Medium</Button>
          </Grid>
          <Grid item>
            <Button size="small" variant="outlined" onClick={handleHighDurationFilter}>Long</Button>
          </Grid>
          <Grid item>
            <Button size="small" variant="outlined" onClick={handleResetFilter}>Reset</Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default TasksFilter;
