import Paper from "@mui/material/Paper"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Track } from "./Types"

export default function TrackGrid(table_data: Track[], columns: GridColDef[]) {
    let count = table_data && table_data.length
    const headerHeight = 50
    const rowHeight = 100
    const containerHeight =
        count > 3 ? rowHeight * 3 + headerHeight : rowHeight * count + headerHeight
    return (
        <Paper sx={{ elevation: 5, mx: "auto", width: 950, height: containerHeight }}>
            <div>hi</div>
            <DataGrid
                rowHeight={rowHeight}
                rows={table_data}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[30]}
                disableSelectionOnClick
                hideFooter={true}
            />
        </Paper>
    )
}
