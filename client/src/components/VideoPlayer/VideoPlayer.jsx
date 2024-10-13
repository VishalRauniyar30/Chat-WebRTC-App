import React, { useContext } from 'react'
import { Grid, Paper, Typography } from '@mui/material'

import { SocketContext } from '../../socketContext'
import videoStyles from './VideoPlayerStyles'


const VideoPlayer = () => {
    const classes = videoStyles();
    const { myVideo, userVideo, name, callAccepted, callEnded, stream, call } = useContext(SocketContext)
    return (
        <Grid container className={classes.gridContainer}>
            {stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h5' gutterBottom>{name || "Name"}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
                    </Grid>
                </Paper>
            )}
            {callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h5' gutterBottom>{call.name || "Name"}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video} />
                    </Grid>
                </Paper>
            )}
        </Grid>
    )
}

export default VideoPlayer