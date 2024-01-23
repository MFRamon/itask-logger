import { Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import styles from "@/components/SelectedTaskDetail/SelectedTaskDetail.module.css";
import { Chip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

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
        <Grid container direction={"column"} sx={{ minHeight: "105px" }} justifyContent={"space-between"}>

          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" gutterBottom>{"Filter the tasks by their duration"}</Typography>
          </Grid>

          <Grid item>
            <Grid container direction={"row"}  gap={1} justifyContent={"flex-start"}>
              <Grid item>
                <Chip
                  sx={{ borderRadius: "8px" }}
                  label={"Short"}
                  onClick={handleShortDurationFilter}
                />
              </Grid>
              <Grid item>
                <Chip
                  sx={{ borderRadius: "8px" }}
                  label={"Medium"}
                  onClick={handleMediumDurationFilter}
                />
              </Grid>
              <Grid item>
                <Chip
                  sx={{ borderRadius: "8px" }}
                  label={"High"}
                  onClick={handleHighDurationFilter}
                />
              </Grid>
              <Grid item>
                <Chip
                  sx={{ borderRadius: "8px" }}
                  label={"Reset"}
                  color="error"
                  icon={<ClearIcon/>}
                  onClick={handleResetFilter}
                />
              </Grid>
            </Grid>
          </Grid>


        </Grid>

      </Paper>
    </Fragment>
  );
};

export default TasksFilter;
