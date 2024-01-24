import * as React from "react";
import Button from "@mui/material/Button";
import { randomId } from "@mui/x-data-grid-generator";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
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

  const handleClick = () => {
    const id: any = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, description: "", duration: "", status: 'PENDING', isNew: true },
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
