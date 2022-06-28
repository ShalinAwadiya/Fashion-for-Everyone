import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Box } from "@mui/system";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Table = () => {
    const [rows, setRows] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const handleEdit = () => {
        setEdit(!isEdit);
    };

    const handleAdd = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1,
                ProductType: "",
                ProductLink: ""
            },
        ]);
        setEdit(true);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...rows];
        list[index][name] = value;
        setRows(list);
    };


    const handleSave = () => {
        setEdit(!isEdit);
        setRows(rows);
        console.log("saved : ", rows);
    };

    const handleConfirm = () => {
        setShowConfirm(true);
    };

    const handleRemoveClick = (i) => {
        const list = [...rows];
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
    };

    const handleNo = () => {
        setShowConfirm(false);
    };

    return (
        <TableBody>
            <Box margin={1}>
                <>
                    <Button onClick={handleAdd}>
                        <AddIcon onClick={handleAdd} />
                        ADD
                    </Button>
                    {rows.length !== 0 && (
                        <>
                            <Button align="right" onClick={handleEdit}>
                                <EditIcon />
                                EDIT
                            </Button>
                            <Button align="right" onClick={handleEdit}>
                                <SaveAltIcon />
                                SAVE
                            </Button>
                        </>
                    )}
                </>

                <TableHead>
                    <TableRow>
                        <TableCell sx={{minWidth:100}}>Product Type</TableCell>
                        <TableCell sx={{minWidth:100}}>Product Link</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>

                    {rows.map((row, i) => {
                        return (
                            <TableRow>
                                {
                                    isEdit ? (
                                        <>
                                            <TableCell sx={{minWidth:100}} component="th" scope="row" align="left">
                                                <TextField
                                                    value={row.ProductType}
                                                    name="ProductType"
                                                    onChange={(e) => handleInputChange(e, i)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="left">
                                                <TextField
                                                    value={row.ProductLink}
                                                    name="ProductLink"
                                                    onChange={(e) => handleInputChange(e, i)}
                                                />
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell component="th" scope="row" align="left">
                                                {row.ProductType}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="left">
                                                {row.ProductLink}
                                            </TableCell>
                                        </>
                                    )
                                }

                                <TableCell
                                    component="th"
                                    scope="row"
                                >
                                    {
                                        isEdit ? (
                                            <Button className="mr10" onClick={handleSave}>
                                                <SaveAltIcon />
                                            </Button>
                                        ) : (
                                            <Button className="mr10" onClick={handleConfirm}>
                                                <DeleteIcon />
                                            </Button>
                                        )
                                    }
                                </TableCell>
                                {
                                    showConfirm && (
                                        <div>
                                            <Dialog
                                                open={showConfirm}
                                                onClose={handleNo}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Confirm Delete"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Are you sure?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button
                                                        onClick={() => handleRemoveClick(i)}
                                                        color="primary"
                                                        autoFocus
                                                    >
                                                        Yes
                                                    </Button>
                                                    <Button
                                                        onClick={handleNo}
                                                        color="primary"
                                                        autoFocus
                                                    >
                                                        No
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    )
                                }
                            </TableRow>

                        );
                    })}
                </TableHead>
            </Box>
        </TableBody >
    )
}
export default Table;