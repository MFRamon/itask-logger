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
} from '@mui/x-data-grid-generator';
import { Task } from '@mui/icons-material';

const roles = ['PENDING','IN-PROGRESS', 'STOPPED', 'FINISHED', 'RESTART' ];

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
    duration: 25,
    status: randomRole(),
  },
  {
    id: randomId(),
    description: randomTraderName(),
    duration: 36,
    status: randomRole(),
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

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const [selectedTask, setSelectedTask] = React.useState<Task>();

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
    console.log(params.row);
    setSelectedTask({id: params.row.id,description: params.row.description, duration: params.row.duration, status:params.row.status });
    console.log(selectedTask);
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
    // {
    //   field: 'joinDate',
    //   headerName: 'Join date',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: false,
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

  const onHandleStartTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "IN-PROGRESS" };
      }
      return task;
    });

    setRows(modifiedTasks);
  }

  const onHandleStopTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "STOPPED" };
      }
      return task;
    });

    setRows(modifiedTasks);
  }

  const onHandleFinishTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "FINISHED" };
      }
      return task;
    });

    setRows(modifiedTasks);
  }

  const onHandleRestartTask = () => {
    const modifiedTasks = rows.map(task => {
      if (task.id === selectedTask?.id) {
          return { ...task, status: "PENDING" };
      }
      return task;
    });

    setRows(modifiedTasks);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.center}>
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </div>
        
        {/* Sidebar */}
        {/* <div className={styles.sidebar}>
          <Stack spacing={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2  }} direction="row" useFlexGap flexWrap="wrap">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={''}
              label="Age"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Button variant="contained" fullWidth size="large">Contained</Button>

            <Typography variant="h3" gutterBottom>
              Pending Tasks
            </Typography>

            <Typography variant="h5" gutterBottom>
              Filters
            </Typography>

            <Stack>
              <Chip label="Clickable Link" component="a" href="#basic-chip" clickable />
              <Chip
                label="Clickable Link"
                component="a"
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Stack>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Sandra Adams
                      </Typography>
                      {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Stack>
        </div> */}
        <div className={styles.sidebar}>
          <Button fullWidth variant="outlined" onClick={onHandleStartTask}>Start Task</Button>
          <Button fullWidth variant="outlined" onClick={onHandleStopTask}>Stop Task</Button>
          <Button fullWidth variant="outlined" onClick={onHandleFinishTask}>Finish Task</Button>
          <Button fullWidth variant="outlined" onClick={onHandleRestartTask}>Restart Task</Button>
        </div>

        {/* Content */}
        <div className={styles.content}>
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
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel },
                }}
              />
              
            </Box>       
          </Stack>

        </div>  

        {/* History */}
        {/* <div className={styles.history}>
          <Typography variant="h3" gutterBottom>
            Finished Tasks
          </Typography>
          
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </div>   */}

        {/* Footer */}
        {/* <div className={styles.footer}>
        </div>   */}
      </main>
    </>
  )
}
