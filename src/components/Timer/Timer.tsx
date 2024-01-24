import React, { Fragment, useEffect, useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import styles from "@/components/Timer/Timer.module.css";
import { Task } from "@/pages";

interface ITimerPropos {
  duration: number;
  handleStart: (status: string, minutes: number) => void;
  handlePause: (status: string, minutes: number) => void;
  handleFinish: (status: string, minutes: number) => void;
  handleReset: (status: string, minutes: number) => void;
  minutes: number;
  setRows: (rows: any) => void;
  rowId: number;
  selectedTask: Task;
}

export const STATUSES = {
  PENDING: "PENDING",
  STARTED: "IN-PROGRESS",
  RESET: "RESET",
  PAUSED: "PAUSED",
  FINISHED: "FINISHED",
};

const Timer = (props: ITimerPropos) => {
  const {
    duration,
    handleStart,
    handlePause,
    handleFinish,
    handleReset,
    minutes,
    setRows,
    rowId,
    selectedTask,
  } = props;

  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  const handleTimerStart = () => {
    setActive(true);
    handleStart(STATUSES.STARTED, minutes);
  };

  const handleTimerReset = () => {
    setActive(false);
    setSeconds(0);
    handleReset(STATUSES.RESET, minutes);
  };

  const handleTimerPause = () => {
    setActive(false);
    handlePause(STATUSES.PAUSED, minutes);
  };

  const handleTimerFinish = () => {
    setActive(false);
    handleFinish(STATUSES.FINISHED, minutes);
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        if (seconds === 0 && minutes !== 0) {
          setSeconds((seconds) => seconds + 59);
          setRows((rows: any) => {
            const newRows = [...rows];

            const selectedRow = newRows.find((row) => row.id === rowId);
            selectedRow.timeToFinish = minutes - 1;

            const rowIndex = newRows.findIndex((row) => row.id === rowId);
            newRows.splice(rowIndex, 1, selectedRow);

            return newRows;
          });
        } else if (seconds === 0 && minutes === 0) {
          setRows((rows: any) => {
            const newRows = [...rows];

            const selectedRow = newRows.find((row) => row.id === rowId);
            selectedRow.status = STATUSES.FINISHED;

            const rowIndex = newRows.findIndex((row) => row.id === rowId);
            newRows.splice(rowIndex, 1, selectedRow);

            return newRows;
          });
          setActive(false);
        } else {
          setSeconds((seconds) => seconds - 1);
        }
      }, 5);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, minutes, active, rowId, setRows]);

  const remainingMinutes = minutes < 10 ? "0" + minutes : minutes;
  const timerMinutes =
    selectedTask?.status === STATUSES.RESET ? duration : remainingMinutes;

  return (
    <Fragment>
      <Paper
        elevation={0}
        className={styles.itemContainer}
        sx={{ height: "142px", minHeight: "142px" }}
      >
        <Grid
          container
          direction={"column"}
          sx={{ minHeight: "105px" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Typography variant="h6">Remaining Time:</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" gutterBottom>
              {timerMinutes || "00"} : {seconds < 10 ? "0" + seconds : seconds}
              {" minutes"}
            </Typography>
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              gap={1}
              justifyContent={"flex-start"}
            >
              {selectedTask?.status === STATUSES.PENDING ||
              selectedTask?.status === STATUSES.PAUSED ||
              selectedTask?.status === STATUSES.RESET ||
              selectedTask?.status === STATUSES.FINISHED ? (
                <Button
                  onClick={handleTimerStart}
                  variant="outlined"
                  color="success"
                  size="small"
                >
                  {selectedTask?.status === STATUSES.PAUSED
                    ? "Resume"
                    : "Start"}
                </Button>
              ) : (
                <Button
                  onClick={handleTimerPause}
                  variant="outlined"
                  color="info"
                  size="small"
                >
                  Pause
                </Button>
              )}
              <Button
                onClick={handleTimerFinish}
                variant="outlined"
                color="error"
                size="small"
              >
                Finish
              </Button>
              <Button
                onClick={handleTimerReset}
                variant="outlined"
                color="warning"
                size="small"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Timer;
