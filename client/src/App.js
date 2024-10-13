import React from 'react'
import { AppBar, Typography } from '@mui/material'

import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import Options from './components/Options/Options'
import Notifications from './components/Notifications/Notifications'
import appStyles from './AppStyles'
  
  const App = () => {
    const classes = appStyles()
  
    return (
        <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar>
            <VideoPlayer />
            <Options>
                <Notifications />
            </Options>
        </div>
    )
}
  
export default App