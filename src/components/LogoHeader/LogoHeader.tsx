import React, { Fragment } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import styles from "@/components/LogoHeader/LogoHeader.module.css";
import { Grid, Paper } from "@mui/material";

interface ILogoHeaderProps {
  //TODO: To difine interface
}

const LogoHeader = (props: ILogoHeaderProps) => {
  return (
    <Fragment>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Grid item>
          <Image
            src="/memoji.svg"
            alt="Next.js Logo"
            width={200}
            height={200}
            priority
          />
        </Grid>

        <Grid item>
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant="body1">{"19 de Enero del 2024"}</Typography>
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
