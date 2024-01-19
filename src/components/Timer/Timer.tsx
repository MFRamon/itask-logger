import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography } from "@mui/material";
import styles from "@/components/Timer/Timer.module.css";

interface ITimerPropos {
  // TODO: Remove this any
  duration: any;
  handleStart: () => void;
  handlePause: () => void;
  handleFinish: () => void;
  handleReset: () => void;
}

const Timer = (props: any) => {
  const { duration, handleStart, handlePause, handleFinish, handleReset } =
    props;

  const [time, setTime] = useState(duration);
  const [minutes, setMinutes] = useState(duration);
  const [seconds, setSeconds] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleTimerStart = () => {
    setFlag(true);
    handleStart();
  };

  const handleTimerReset = () => {
    setFlag(false);
    setSeconds(0);
    setMinutes(time);
    handleReset();
  };

  const handleTimerPause = () => {
    setFlag(false);
    handlePause();
  };

  const handleTimerFinish = () => {
    setFlag(true);
    handleFinish();
  };

  useEffect(() => {
    setTime(duration);
    if (flag) {
      const interval = setInterval(() => {
        // @ts-ignore: Argument of type 'string' is not assignable to parameter of type 'number'.
        if (parseInt(seconds) === 0 && parseInt(minutes) !== 0) {
          setSeconds((seconds) => seconds + 59);
          setMinutes((minutes: number) => minutes - 1);
          // @ts-ignore: Argument of type 'string' is not assignable to parameter of type 'number'.
        } else if (parseInt(seconds) === 0 && parseInt(minutes) === 0) {
        } else {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
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
              {parseInt(minutes) < 10 ? "0" + minutes : minutes} :{" "}
              {parseInt(seconds) < 10 ? "0" + seconds : seconds}
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
