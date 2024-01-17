import * as React from 'react';
import Typography from '@mui/material/Typography';


interface ILogoSubheaderProps {
    //TODO: To define interface
}


export default function LogoSubheader(props: ILogoSubheaderProps) {  

    return (
      <>
        <Typography variant="h1">
            Arkon Data
        </Typography>
        <Typography variant="body1" gutterBottom>
        This is a take home Challenge for a vacant as a software engineer
        </Typography>
      </>
    )
}