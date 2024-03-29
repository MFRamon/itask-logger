import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
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
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridEditInputCell
} from "@mui/x-data-grid";
import { randomTraderName, randomId } from "@mui/x-data-grid-generator";
import { Task } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import CompletedTasksList from "@/components/CompletedTasksList/CompletedTasksList";
import MetaHead from "@/components/MetaHead/MetaHead";
import LogoHeader from "@/components/LogoHeader/LogoHeader";
import { Grid } from "@mui/material";
import Timer, { STATUSES } from "@/components/Timer/Timer";
import SelectedTaskDetail from "@/components/SelectedTaskDetail/SelectedTaskDetail";
import TasksTableToolbar from "@/components/TasksTableToolbar/TasksTableToolbar";
import Box from "@mui/material/Box";
import TasksFilters from "@/components/TasksFilters/TasksFilters";

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
    description: "Wash dishes",
    duration: 25,
    status: "PENDING",
    timeToFinish: 25,
    creationDate: new Date(),
    finishedDate: new Date(),
    completedTime: 0,
  },
  {
    id: randomId(),
    description: "Wash clothes",
    duration: 69,
    status: "FINISHED",
    timeToFinish: 36,
    creationDate: new Date(),
    finishedDate: new Date(Date.now() - 86400000),
    completedTime: 0,
  },
  {
    id: randomId(),
    description: "Buy medicine",
    duration: 25,
    status: "PENDING",
    timeToFinish: 25,
    creationDate: new Date(),
    finishedDate: new Date(),
    completedTime: 0,
  },
  {
    id: randomId(),
    description: "Go visit grandpa",
    duration: 78,
    status: "FINISHED",
    timeToFinish: 36,
    creationDate: new Date(),
    finishedDate: new Date(Date.now() - 86400000),
    completedTime: 0,
  },
  {
    id: randomId(),
    description: "Clean room",
    duration: 25,
    status: "FINISHED",
    timeToFinish: 25,
    creationDate: new Date(),
    finishedDate: new Date("2024-01-18"),
    completedTime: 0,
  },
  {
    id: randomId(),
    description: "Buy food",
    duration: 36,
    status: "FINISHED",
    timeToFinish: 36,
    creationDate: new Date(),
    finishedDate: new Date(),
    completedTime: 0,
  },
];

export default function Home() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [id, setId] = useState(-1);
  const [selectedFilter, setSelectedFilter] = useState("NONE");

  const selectedTask = rows.find((row) => row.id === id);
  const remainingMinutes = selectedTask?.timeToFinish;

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
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
    const updatedRow = { ...newRow, isNew: false, timeToFinish: newRow.duration };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    const rowId = params.row.id;
    setId(rowId);
  };

  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration (mins)",
      type: "number",
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max: 120,
            min: 1,
          }}
        />
      ),
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: false,
      type: "singleSelect",
      valueOptions: ["PENDING", "IN-PROGRESS", "STOPPED", "FINISHED"],
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      flex: 1,
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
    const modifiedTasks = rows.map((task) => {
      if (task.id === selectedTask?.id) {
        return { ...task, status: operation };
      }
      return task;
    });

    const selectedRow = modifiedTasks.find((row) => row.id === id);
    if (!selectedRow) return;

    if (operation === "RESET") {
      selectedRow.timeToFinish = selectedRow.duration;
    }

    if (operation === "FINISHED") {
      selectedRow.completedTime =
        selectedRow.duration - selectedRow.timeToFinish;
      selectedRow.finishedDate = new Date();
    }

    const rowIndex = modifiedTasks.findIndex((row) => row.id === id);
    modifiedTasks.splice(rowIndex, 1, selectedRow);

    setRows(modifiedTasks);
  };

  const handleFilteredRows = () => {
    return rows.filter((row) => {
      switch (selectedFilter) {
        case "SHORT":
          return row.duration < 30;
        case "MEDIUM":
          return row.duration > 30 || row.duration === 60;
        case "HIGH":
          return row.duration > 60;
        default:
          return true;
      }
    });
  };

  return (
    <>
      <MetaHead title={"Dashboard"}></MetaHead>
      <Box
        className={styles.main}
        pr={{ xl: 20, lg: 15, md: 10, sm: 2, xs: 2 }}
        pl={{ xl: 20, lg: 15, md: 10, sm: 2, xs: 2 }}
        mt={{ sm: 10, xs: 15 }}
      >
        <Box className={styles.header} >
          <LogoHeader></LogoHeader>
        </Box>

        <Box
          id="subheader-container"
          className={styles.subheader}
          mt={{ xs: 30, sm: 0, lg: 0, xl: 0 }}
          pb={{ xs: 5, sm: 5 }}
        >
          <Grid container spacing={2} padding={{ xs: 2 }}>
            <Grid item xl={3} lg={4} md={4} sm={12} xs={12}>
              <SelectedTaskDetail
                task={selectedTask as Task}
              ></SelectedTaskDetail>
            </Grid>

            <Grid item xl={3} lg={4} md={4} sm={12} xs={12}>
              <Timer
                rowId={id}
                setRows={setRows}
                selectedTask={selectedTask as Task}
                duration={selectedTask?.duration}
                minutes={remainingMinutes}
                handleStart={onHandleChangeStatusTask}
                handlePause={onHandleChangeStatusTask}
                handleReset={onHandleChangeStatusTask}
                handleFinish={onHandleChangeStatusTask}
              ></Timer>
            </Grid>

            <Grid item xl={3} lg={4} md={4} sm={12} xs={12}>
              <TasksFilters
                setSelectedFilter={setSelectedFilter}
                title="Filters:"
              ></TasksFilters>
            </Grid>
          </Grid>
        </Box>

        <Box
          id={"content-container"}
          className={styles.content}
          mt={{ xs: 10, sm: 0, lg: 0, xl: 0 }}
          pb={{ xs: 5, sm: 5 }}
          pt={{ xs: 8, md: 0, lg: 0, xl: 0 }}
        >
          <Grid
            container
            spacing={2}
            padding={{ xs: 2 }}
            sx={{ minHeight: "500px" }}
          >
            <Grid item xs={12} sm={12} md={6} lg={7} xl={6}>
              <Paper
                elevation={0}
                sx={{ borderRadius: "12px", height: "500px" }}
              >
                <DataGrid
                  rows={handleFilteredRows()}
                  columns={columns}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  onRowClick={handleRowClick}
                  processRowUpdate={processRowUpdate}
                  slots={{
                    toolbar: (props) => (
                      <TasksTableToolbar
                        {...props}
                        setSelectedFilter={setSelectedFilter}
                      />
                    ),
                  }}
                  slotProps={{
                    toolbar: { setRows, setRowModesModel, rows },
                  }}
                  sx={{ border: "0px" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={6}>
              <CompletedTasksList
                completedTasks={rows.filter(
                  (row) => row.status === STATUSES.FINISHED,
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
