import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { getTodaysDate } from "@/helpers";

const LogoHeader = () =>  {
  return (
    <Fragment>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        padding={{xs: 2}}
        data-testid={"logo-header"}
      >
        {/* <Grid item>
          <Image
            src="/memoji.svg"
            alt="Next.js Logo"
            width={200}
            height={200}
            priority
          />
        </Grid> */}

        <Grid item>
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant="body1" data-testid={"logo-header-date"}>{getTodaysDate()}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1" data-testid={"logo-header-email"}>
                {"ramon.manfig@gmail.com"}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1" data-testid={"logo-header-author"}>Created By Ramon Manrique</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LogoHeader;
