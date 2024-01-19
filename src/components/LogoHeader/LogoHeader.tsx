import * as React from 'react';
import Image from 'next/image'
import Typography from '@mui/material/Typography';
import styles from '@/components/LogoHeader/LogoHeader.module.css'
import { Paper } from '@mui/material';

interface ILogoHeaderProps {
    //TODO: To difine interface
}


export default function LogoHeader(props: ILogoHeaderProps) {  

    return (
      <>
        <Image
          src="/memoji.svg"
          alt="Next.js Logo"
          width={200}
          height={200}
          priority
        />
        
        {/* <Typography variant="h6">
          Created By Ramon Manrique
        </Typography> */}
      </>
    )
}