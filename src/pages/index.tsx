import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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
} from "@mui/x-data-grid";
import {
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { Task } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import CompletedTasksList from "@/components/CompletedTasksList/CompletedTasksList";
import MetaHead from "@/components/MetaHead/MetaHead";
import LogoHeader from "@/components/LogoHeader/LogoHeader";
import { Grid } from "@mui/material";
import Timer, { STATUSES } from "@/components/Timer/Timer";
import SelectedTaskDetail from "@/components/SelectedTaskDetail/SelectedTaskDetail";
import CustomToolbar from "@/components/TasksTableToolbar/TasksTableToolbar";
import TasksEditStatusCell from "@/components/TasksEditStatusCell/TasksEditStatusCell";

const roles = ["PENDING", "IN-PROGRESS", "PAUSED", "FINISHED", "RESET"];

const randomRole = () => {
  return randomArrayItem(roles);
};

export interface Task {
  id: number;
  description: string;
  duration: number;
  status: string;
  timeToFinish: number;
}

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    description: randomTraderName(),
    duration: 25,
    status: randomRole(),
    timeToFinish: 25,
  },
  {
    id: randomId(),
    description: randomTraderName(),
    duration: 36,
    status: randomRole(),
    timeToFinish: 36
  },
];

// const inter = Inter({ subsets: ["latin"] });
const isTaskFinished = (task: any) => task.status === "FINISHED";

const initialSelectedTask: Task = { id: 0, description: "", duration: 0, status: "", timeToFinish: 0 };

export default function Home() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  
  const [selectedTask, setSelectedTask] = useState(initialSelectedTask);
  const [remainingMinutesSelectedTask, setRemainingMinutesSelectedTask] = useState(0);

  const [minutes, setMinutes] = useState(0);

  const [finishedTaks, setFinishedTasks] = useState(
    rows.filter((task) => task.status === "FINISHED"),
  );

  useEffect(() => {
    const currentTask = rows.find((task) => task.id === selectedTask?.id);
    if (!currentTask) {
      setSelectedTask(initialSelectedTask);
    } else {
      setSelectedTask({
        id: currentTask?.id,
        description: currentTask?.description,
        duration: currentTask?.duration,
        status: currentTask?.status,
        timeToFinish: currentTask?.duration - remainingMinutesSelectedTask
      });
    }
  }, [rows]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    console.log({ ...rowModesModel });
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

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    if(params.row.status === STATUSES.PENDING){
      setSelectedTask({
        id: params.row.id,
        description: params.row.description,
        duration: params.row.duration,
        status: params.row.status,
        timeToFinish: params.row.duration
      });
    }else{
      setSelectedTask({
        id: params.row.id,
        description: params.row.description,
        duration: params.row.duration,
        status: params.row.status,
        timeToFinish: params.row.duration - remainingMinutesSelectedTask
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
      // renderEditCell: TasksEditStatusCell,
      type: "singleSelect",
      valueOptions: ["PENDING", "IN-PROGRESS", "STOPPED", "FINISHED"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
              key={randomId()}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key={randomId()}
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
            key={randomId()}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={randomId()}
          />,
        ];
      },
    },
  ];

  const onHandleChangeStatusTask = (operation: string, currentMinutes: any) => {
    console.log(operation);
    console.log(currentMinutes);

    const modifiedTasks = rows.map((task) => {
      if (task.id === selectedTask?.id) {
        return { ...task, status: operation};
      }
      return task;
    });

    if (operation === "PAUSED") {
      console.log("se pauso la tarea");
      console.log(modifiedTasks);
    }

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished));
    // onHandleUpdateTime(currentMinutes);
  };

  const onHandleUpdateTime = (remainingMinutes: number) => {
    console.log(`Tiempo que viene del counter ${remainingMinutes}`);
    setRemainingMinutesSelectedTask(remainingMinutes);

    setSelectedTask({...selectedTask, timeToFinish: remainingMinutes});

    console.log(selectedTask);
  }

  useEffect(() => {
    setRemainingMinutesSelectedTask(minutes);
    setSelectedTask({...selectedTask, timeToFinish: remainingMinutesSelectedTask});
  },[minutes, remainingMinutesSelectedTask])

  return (
    <>
      <MetaHead title={"Dashboard"}></MetaHead>
      <main className={styles.main}>
        <div className={styles.header}>
          <LogoHeader></LogoHeader>
        </div>

        <div className={styles.subheader}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={12} xs={12}>
              <SelectedTaskDetail task={selectedTask}></SelectedTaskDetail>
            </Grid>
            <Grid item lg={3} md={4} sm={12} xs={12}>
              {selectedTask && (
                <Timer
                  duration={selectedTask.duration}
                  minutes={minutes}
                  setMinutes={setMinutes}
                  handleStart={onHandleChangeStatusTask}
                  handlePause={onHandleChangeStatusTask}
                  handleReset={onHandleChangeStatusTask}
                  handleFinish={onHandleChangeStatusTask}
                  getMinutes={onHandleUpdateTime}
                ></Timer>
              )}
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={2} className={styles.content}>
          <Grid item lg={7} md={6}>
            <Paper elevation={0} sx={{ borderRadius: "12px", height: "500px" }}>
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
                  toolbar: CustomToolbar,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel, rows },
                }}
                sx={{ border: "0px" }}
              />
            </Paper>
          </Grid>
          <Grid item lg={5} md={6}>
            <CompletedTasksList completedTasks={finishedTaks} />
          </Grid>
        </Grid>
      </main>
    </>
  );
}
