import * as React from 'react';
import Button from '@mui/material/Button';


interface ITasksActionsProps {
    //TODO: To define interface
}


export default function TasksActions(props: ITasksActionsProps) {  

    return (
      <>
        <Button fullWidth variant="outlined" onClick={() => {}}>Start Task</Button>
        <Button fullWidth variant="outlined" onClick={() => {}}>Stop Task</Button>
        <Button fullWidth variant="outlined" onClick={() => {}}>Finish Task</Button>
        <Button fullWidth variant="outlined" onClick={() => {}}>Restart Task</Button>
      </>
    )
}