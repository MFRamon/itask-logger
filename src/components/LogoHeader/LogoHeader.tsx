import React, { Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { getTodaysDate } from "@/helpers";
import Image from "next/image";

const LogoHeader = () => {
  return (
    <Fragment>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        padding={{ xs: 2 }}
        data-testid={"logo-header"}
      >
        <Grid item>
          <Image
            src="/memoji.png"
            alt="Ramon Memoji"
            width={200}
            height={200}
            priority
          />
        </Grid>

        <Grid item>
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant="body1" data-testid={"logo-header-date"}>
                {getTodaysDate()}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1" data-testid={"logo-header-email"}>
                {"ramon.manfig@gmail.com"}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1" data-testid={"logo-header-author"}>
                Created By Ramon Manrique
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LogoHeader;
