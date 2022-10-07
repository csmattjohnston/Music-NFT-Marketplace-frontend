import { GridColDef } from "@mui/x-data-grid"
import CardMedia from "@mui/material/CardMedia"
import IconButton from "@mui/material/IconButton"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import Box from "@mui/material/Box"

export const COLUMNS: GridColDef[] = [
    { field: "id", headerName: "ID", width: 5, align: "center", headerAlign: "center" },
    {
        headerAlign: "center",
        field: "title",
        renderCell: () => {
            return (
                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                    <IconButton aria-label="play/pause">
                        <PlayCircleIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                </Box>
            )
        },
        headerName: "SONG",
        width: 100,
        editable: false,
        sortable: false,
    },
    {
        field: "image",
        align: "center",
        headerAlign: "center",
        headerName: "COVER",
        renderCell: (params) => {
            return (
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={params.row.image}
                    alt={params.row.description}
                />
            )
        },
        width: 200,
        editable: false,
        sortable: false,
    },
    {
        headerAlign: "center",
        field: "albumTitle",
        headerName: "ALBUM",
        width: 150,
        align: "center",
        editable: false,
    },
    {
        headerAlign: "center",
        field: "genre",
        headerName: "GENRE",
        width: 110,
        align: "center",
        editable: false,
    },
    {
        headerAlign: "center",
        field: "bpm",
        headerName: "BPM",
        width: 110,
        align: "center",
        editable: false,
    },
    {
        headerAlign: "center",
        field: "key",
        headerName: "KEY",
        width: 110,
        align: "center",
        editable: false,
        sortable: false,
    },
    {
        headerAlign: "center",
        field: "duration",
        headerName: "DURATION",
        width: 110,
        align: "center",
        editable: false,
    },
]

// onClick={() => playTrack(params.row.audio)
