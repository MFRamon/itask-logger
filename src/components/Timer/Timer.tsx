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
        <Grid direction={"column"} sx={{ minHeight: "105px" }}>
          <Typography variant="h6">Remaining Time:</Typography>
          <Typography variant="body1">
            {parseInt(minutes) < 10 ? "0" + minutes : minutes} :{" "}
            {parseInt(seconds) < 10 ? "0" + seconds : seconds}
            {" minutes"}
          </Typography>
          <Button onClick={handleTimerStart} variant="text">
            Start
          </Button>
          <Button onClick={handleTimerPause} variant="text">
            Pause
          </Button>
          <Button onClick={handleTimerFinish} variant="text">
            Finish
          </Button>
          <Button onClick={handleTimerReset} variant="text">
            Reset
          </Button>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Timer;
