import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGridApiContext } from '@mui/x-data-grid';
import { useDemoData, randomId } from '@mui/x-data-grid-generator';
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
    rows: GridRowModel
}

const CustomToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel, rows } = props;

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

    const handleShortDurationFilter = () => {
        const result = rows.filter((element: { duration: number; }) => element.duration < 30);
        setRows(result);
    }

    const handleMediumDurationFilter = () => {
        const result = rows.filter((element: { duration: number; }) => element.duration > 30 || element.duration === 60);
        setRows(result);
    }

    const handleHighDurationFilter = () => {
        const result = rows.filter((element: { duration: number; }) => element.duration > 60);
        setRows(result);
    }
  
    return (
      <GridToolbarContainer>
        <Button onClick={handleClick}>Add Row</Button>
        <Button onClick={handleShortDurationFilter}>Filter short</Button>
        <Button onClick={handleMediumDurationFilter}>Filter medium</Button>
        <Button onClick={handleHighDurationFilter}>Filter high</Button>
      </GridToolbarContainer>
    );
}

export default CustomToolbar