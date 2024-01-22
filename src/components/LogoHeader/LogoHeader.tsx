import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";


const LogoHeader = () =>  {

  const getTodaysDate = () => {
    const f = new Intl.DateTimeFormat('es-MX',{
      dateStyle: 'full'
    })
    const formattedDate = f.format(new Date());
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return (
    <Fragment>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        padding={{xs: 2}}
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
              <Typography variant="body1">{getTodaysDate()}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                {"ramon.manfig@gmail.com"}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">Created By Ramon Manrique</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LogoHeader;
