import * as React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomDate
} from '@mui/x-data-grid-generator';
import { Task } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import CompletedTasksTable from '@/components/CompletedTasksTable/CompletedTasksTable';
import MetaHead from '@/components/MetaHead/MetaHead';
import LogoHeader from '@/components/LogoHeader/LogoHeader';
import LogoSubheader from '@/components/LogoSubheader/LogoSubheader';
import TasksActions from '@/components/TasksActions/TasksActions';
import { Grid } from '@mui/material';

const roles = ['PENDING','IN-PROGRESS', 'STOPPED', 'FINISHED' ];

const randomRole = () => {
  return randomArrayItem(roles);
};

interface Task{
  id: string;
  description: string;
  duration: string;
  status: string; 
} 

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    description: randomTraderName(),
    // This represents the amount of minutes remaining for finishing the task
    timeToFinish: 20,
    finishedAt: 30,
    duration: 25,
    status: randomRole(),
    creationDate: new Date(),
  },
  {
    id: randomId(),
    description: randomTraderName(),
    timeToFinish: 20,
    finishedAt: 30,
    duration: 36,
    status: randomRole(),
    creationDate: new Date(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, description: '', duration: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'description' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const inter = Inter({ subsets: ['latin'] });
const isTaskFinished = (task:any) => task.status === 'FINISHED'

export default function Home() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const [selectedTask, setSelectedTask] = React.useState<Task>();
  const [finishedTaks, setFinishedTasks] = React.useState(rows.filter((task => task.status === 'FINISHED' )));

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    console.log({...rowModesModel});
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    console.log(newRow);
    console.log("Termino el update");
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));    
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setSelectedTask({id: params.row.id,description: params.row.description, duration: params.row.duration, status:params.row.status });
  };

  const columns: GridColDef[] = [
    { field: 'description', headerName: 'Description', width: 180, editable: true },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['PENDING','IN-PROGRESS', 'STOPPED', 'FINISHED', 'RESTART'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const columnsView: GridColDef[] = [
    { field: 'description', headerName: 'Description', width: 180, editable: true },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: false,
      type: 'singleSelect',
      valueOptions: ['PENDING','IN-PROGRESS', 'STOPPED', 'FINISHED', 'RESTART'],
    }
  ];

  const onHandleStartTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "IN-PROGRESS" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished))
  }
  

  const onHandleStopTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "STOPPED" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished))
  }

  const onHandleFinishTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "FINISHED" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished))
  }

  const onHandleRestartTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "PENDING" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished))
  }

  return (
    <>
      <MetaHead title={'Arkon Tasks Dashboard'}></MetaHead>
      <main className={styles.main}>
        <div className={styles.header}>
          <LogoHeader></LogoHeader>
        </div>

        <div className={styles.subheader}>
          <LogoSubheader></LogoSubheader>
        </div>
        
        {/* Content */}
        <Grid container spacing={2} className={styles.content}>
          <Grid item lg={6}>
            <Paper elevation={3}>
              <Stack spacing={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2  }} direction="row" useFlexGap flexWrap="wrap">
                  <Box
                    sx={{
                      height: 500,
                      width: '100%',
                      '& .actions': {
                        color: 'text.secondary',
                      },
                      '& .textPrimary': {
                        color: 'text.primary',
                      },
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      editMode="row"
                      rowModesModel={rowModesModel}
                      onRowModesModelChange={handleRowModesModelChange}
                      onRowEditStop={handleRowEditStop}
                      onRowClick={handleRowClick}
                      processRowUpdate={processRowUpdate}
                      slots={{
                        toolbar: EditToolbar,
                        footer: TasksActions
                      }}
                      slotProps={{
                        toolbar: { setRows, setRowModesModel },
                      }}
                    />
                  </Box>       
              </Stack>
            </Paper>
          </Grid>
          <Grid item lg={6}>
            <CompletedTasksTable completedTasks={finishedTaks} columns={columnsView}></CompletedTasksTable>
          </Grid>
        </Grid>
      </main>
    </>
  )
}
