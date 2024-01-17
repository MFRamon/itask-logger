import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

interface ICompletedTasksTableProps {
  completedTasks: GridRowsProp;
  columns: GridColDef[];
  children?: React.ReactNode
}

export default function CompletedTasksTable(props: ICompletedTasksTableProps) {  
    const { completedTasks, columns } = props;

    return (
      <>
        <Typography variant="h3" gutterBottom>
            Finished Tasks
        </Typography>
        <Paper>
            <DataGrid
            sx={{
                height: 500,
            }}
            rows={completedTasks}
            columns={columns}
            />
        </Paper>
      </>
    )
}
  