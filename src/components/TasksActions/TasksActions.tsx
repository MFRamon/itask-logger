import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


interface ITasksActionsProps {
    //TODO: To define interface
}


export default function TasksActions(props: ITasksActionsProps) {  

    return (
      <React.Fragment>
        <Stack direction="row" spacing={2}>
          <Button fullWidth variant="outlined" onClick={() => {}}>Start Task</Button>
          <Button fullWidth variant="outlined" onClick={() => {}}>Stop Task</Button>
          <Button fullWidth variant="outlined" onClick={() => {}}>Finish Task</Button>
          <Button fullWidth variant="outlined" onClick={() => {}}>Restart Task</Button>
        </Stack>
        
      </React.Fragment>
    )
}