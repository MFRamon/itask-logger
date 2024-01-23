import React, { Fragment, useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography } from "@mui/material";
import styles from "@/components/Timer/Timer.module.css";

interface ITimerPropos {
  duration: any;
  handleStart: () => void;
  handlePause: () => void;
  handleFinish: () => void;
  handleReset: () => void;
  minutes: number;
}

export const STATUSES = {
  PENDING: "PENDING",
  STARTED: "IN-PROGRESS",
  RESET: "RESET",
  PAUSED: "PAUSED",
  FINISHED: "FINISHED",
};

const Timer = (props: any) => {
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
          // setMinutes((minutes: number) => minutes - 1);
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

  /*
  const sec = 60 - seconds;
  let min = duration - remainingMinutes

  if (sec !== 0) {
    min -= 1;
  }*/

  // Cuando se edita la duracion que se actualice el tiempo restante

  // Al borrar una task que se inicialice el reloj a cero
  // Al cambiar de task seleccionada que se inicialice el reloj al tiempo restante o la duracion
  // Si se cambia el status a finished que se guarde el tiempo que le tomo si la empezo o si no que se le deje terminarla

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
