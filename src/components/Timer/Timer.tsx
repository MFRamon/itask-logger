import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography } from "@mui/material";
import styles from "@/components/Timer/Timer.module.css";

// interface ITimerPropos {
//   duration: any;
//   handleStart: () => void;
//   handlePause: () => void;
//   handleFinish: () => void;
//   handleReset: () => void;
// }

const STATUSES = {
  STARTED: "IN-PROGRESS",
  RESET: "PENDING",
  PAUSED: "STOPPED",
  FINISHED: "FINISHED",
};

const Timer = (props: any) => {
  const { duration, handleStart, handlePause, handleFinish, handleReset } = props;

  // El valor de la inicializacion solo se ejecuta en el primer render.
  // Agregar una columna de tiempo restante. 


  const [time, setTime] = useState(duration);
  const [minutes, setMinutes] = useState(duration);
  const [seconds, setSeconds] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleTimerStart = () => {
    setFlag(true);
    handleStart(STATUSES.STARTED, minutes);
  };

  const handleTimerReset = () => {
    setFlag(false);
    setSeconds(0);
    setMinutes(time);
    handleReset(STATUSES.RESET, minutes);
  };

  const handleTimerPause = () => {
    setFlag(false);
    handlePause(STATUSES.PAUSED, minutes);
  };

  const handleTimerFinish = () => {
    //TODO: Marcar el timer a 0 cuando una tarea se termina
    setFlag(true);
    handleFinish(STATUSES.FINISHED, minutes);
  };

  useEffect(() => {
    // setMinutes(duration);
    if (flag) {
      const interval = setInterval(() => {
        if (seconds === 0 && minutes !== 0) {
          setSeconds((seconds) => seconds + 59);
          setMinutes((minutes: number) => minutes - 1);
        } else if (seconds === 0 && minutes === 0) {
        } else {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setMinutes(duration);
    }
  }, [seconds, minutes, flag, duration]);


  return (
    <Fragment>
      <Paper
        elevation={1}
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
              {minutes < 10 ? "0" + minutes : minutes} :{" "}
              {seconds < 10 ? "0" + seconds : seconds}
              {" minutes"}
            </Typography>
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              justifyContent={"space-between"}
              spacing={1}
            >
              <Button
                onClick={handleTimerStart}
                variant="outlined"
                color="success"
                size="small"
              >
                Start
              </Button>
              <Button
                onClick={handleTimerPause}
                variant="outlined"
                color="info"
                size="small"
              >
                Pause
              </Button>
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
