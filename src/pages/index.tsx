import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
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
import Timer from "@/components/Timer/Timer";
import SelectedTaskDetail from "@/components/SelectedTaskDetail/SelectedTaskDetail";

const roles = ["PENDING", "IN-PROGRESS", "STOPPED", "FINISHED"];

const randomRole = () => {
  return randomArrayItem(roles);
};

export interface Task {
  id: string;
  description: string;
  duration: any;
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
    setRows((oldRows) => [
      ...oldRows,
      { id, description: "", duration: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "description" },
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

const inter = Inter({ subsets: ["latin"] });
const isTaskFinished = (task: any) => task.status === "FINISHED";

export default function Home() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [finishedTaks, setFinishedTasks] = useState(
    rows.filter((task) => task.status === "FINISHED"),
  );

  useEffect(() => {
    const currentTask = rows.find((task) => task.id === selectedTask?.id);
    setSelectedTask({
      id: currentTask?.id,
      description: currentTask?.description,
      duration: currentTask?.duration,
      status: currentTask?.status,
    });
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
    setSelectedTask({
      id: params.row.id,
      description: params.row.description,
      duration: params.row.duration,
      status: params.row.status,
    });
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
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "PENDING",
        "IN-PROGRESS",
        "STOPPED",
        "FINISHED",
        "RESTART",
      ],
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

  const columnsView: GridColDef[] = [
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
      width: 220,
      editable: false,
      type: "singleSelect",
      valueOptions: [
        "PENDING",
        "IN-PROGRESS",
        "STOPPED",
        "FINISHED",
        "RESTART",
      ],
    },
  ];

  const onHandleStartTask = () => {
    const modifiedTasks = rows.map((task) => {
      if (task.id === selectedTask?.id) {
        return { ...task, status: "IN-PROGRESS" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished));
  };

  const onHandleStopTask = () => {
    const modifiedTasks = rows.map((task) => {
      if (task.id === selectedTask?.id) {
        return { ...task, status: "STOPPED" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished));
  };

  const onHandleFinishTask = () => {
    const modifiedTasks = rows.map((task) => {
      if (task.id === selectedTask?.id) {
        return { ...task, status: "FINISHED" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished));
  };

  const onHandleRestartTask = () => {
    const modifiedTasks = rows.map((task) => {
      if (task.id === selectedTask?.id) {
        return { ...task, status: "PENDING" };
      }
      return task;
    });

    setRows(modifiedTasks);
    setFinishedTasks(modifiedTasks.filter(isTaskFinished));
  };

  return (
    <>
      <MetaHead title={"Arkon Tasks Dashboard"}></MetaHead>
      <main className={styles.main}>
        <div className={styles.header}>
          <LogoHeader></LogoHeader>
        </div>

        <div className={styles.subheader}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={12} xs={12}>
              <SelectedTaskDetail task={selectedTask!}></SelectedTaskDetail>
            </Grid>
            <Grid item lg={3} md={4} sm={12} xs={12}>
              {selectedTask && (
                <Timer
                  duration={20}
                  handleStart={onHandleStartTask}
                  handlePause={onHandleStopTask}
                  handleReset={onHandleRestartTask}
                  handleFinish={onHandleFinishTask}
                ></Timer>
              )}
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={2} className={styles.content}>
          <Grid item lg={7} md={6}>
            <Paper elevation={0} sx={{ borderRadius: "12px" }}>
              <Stack
                spacing={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
              >
                <Box
                  sx={{
                    height: 500,
                    width: "100%",
                    "& .actions": {
                      color: "text.secondary",
                    },
                    "& .textPrimary": {
                      color: "text.primary",
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
                    sx={{ border: "0px" }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item lg={5} md={6}>
            <CompletedTasksList>
              completedTasks={finishedTaks}
              columns={columnsView}
            </CompletedTasksList>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
