import { Grid, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import styles from "@/components/SelectedTaskDetail/SelectedTaskDetail.module.css";
import { Chip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface ITasksCountProps {
  title: string;
  setSelectedFilter?: (filterName: string) => void;
}

const TasksFilters = (props: ITasksCountProps) => {
  const { title, setSelectedFilter } = props || {};

  const handleShortDurationFilter = () => {
    if(setSelectedFilter){
      setSelectedFilter("SHORT");
    }
  };

  const handleMediumDurationFilter = () => {
    if(setSelectedFilter){
      setSelectedFilter("MEDIUM");
    }
  };

  const handleHighDurationFilter = () => {
    if(setSelectedFilter){
      setSelectedFilter("HIGH");
    }
  };

  const handleResetFilter = () => {
    if(setSelectedFilter){
      setSelectedFilter("NONE");
    }
  };

  return (
    <Fragment>
      <Paper
        elevation={0}
        className={styles.itemContainer}
        sx={{ height: "142px", minHeight: "142px" }}
        data-testid={"tasks-filters"}
      >
        <Grid
          container
          direction={"column"}
          sx={{ minHeight: "105px" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Typography data-testid={"test-filters-title"} variant="h6">{title}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" gutterBottom data-testid={"test-filters-subtitle"}>
              {"Filter the tasks by their duration"}
            </Typography>
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              gap={1}
              justifyContent={"flex-start"}
            >
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
                  icon={<ClearIcon />}
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

export default TasksFilters;
