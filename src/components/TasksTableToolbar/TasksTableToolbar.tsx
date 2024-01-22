import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useGridApiContext } from "@mui/x-data-grid";
import { useDemoData, randomId } from "@mui/x-data-grid-generator";
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
} from "@mui/x-data-grid";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  rows: GridRowModel;
  setSelectedFilter: (filterName: string) => void;
}

const TasksTableToolbar = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel, rows, setSelectedFilter } = props;

  const apiRef = useGridApiContext();

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
      <Button onClick={handleClick}>Add Row</Button>
    </GridToolbarContainer>
  );
};

export default TasksTableToolbar;
