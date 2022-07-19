//Author: Minal Rameshchandra Khona (B00873733)
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Box } from "@mui/system";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Table = (props) => {
    return (
        <TableBody>
            <Box margin={1}>
                <>
                    <Button onClick={props.handleAdd}>
                        <AddIcon onClick={props.handleAdd} />
                        ADD
                    </Button>
                    {props.rows.length !== 0 && (
                        <>
                            <Button align="right" onClick={props.handleEdit}>
                                <EditIcon />
                                EDIT
                            </Button>
                            <Button align="right" onClick={props.handleEdit}>
                                <SaveAltIcon />
                                SAVE
                            </Button>
                        </>
                    )}
                </>

                <TableHead>
                    <TableRow>
                        <TableCell sx={{ minWidth: 100 }}>Product Type</TableCell>
                        <TableCell sx={{ minWidth: 100 }}>Product Link</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>

                    {props.rows.map((row, i) => {
                        return (
                            <TableRow>
                                {props.isEdit ? (
                                    <>
                                        <TableCell sx={{ minWidth: 100 }} component="th" scope="row" align="left">
                                            <TextField
                                                value={row.ProductType}
                                                name="ProductType"
                                                onChange={(e) => props.handleInputChange(e, i)}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <TextField
                                                value={row.ProductLink}
                                                name="ProductLink"
                                                onChange={(e) => props.handleInputChange(e, i)}
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
                                    scope="row">
                                    {props.isEdit ? (
                                        <Button className="mr10" onClick={props.handleSave}>
                                            <SaveAltIcon />
                                        </Button>
                                    ) : (
                                        <Button className="mr10" onClick={props.handleConfirm}>
                                            <DeleteIcon />
                                        </Button>
                                    )
                                    }
                                </TableCell>

                                {/* Delete Confirmation Dialog */}
                                {
                                    props.showConfirm && (
                                        <div>
                                            <Dialog
                                                open={props.showConfirm}
                                                onClose={props.handleNo}
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
                                                        onClick={() => props.handleRemoveClick(i)}
                                                        color="primary"
                                                        autoFocus
                                                    >
                                                        Yes
                                                    </Button>
                                                    <Button
                                                        onClick={props.handleNo}
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