import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'

import { SocketContext } from '../../socketContext'
import optionStyles from './OptionsStyles'

const Options = ({ children }) => {
    const { me, callAccepted, name, callEnded, setName, leaveCall, callUser } = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')
    const classes = optionStyles()
    
    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography style={{ marginBottom : '20px' }} gutterBottom variant='h6'> 
                                Account Info
                            </Typography>
                            <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                            <CopyToClipboard text={me} className={classes.margin}>
                                <Button style={{ marginTop : '20px' }} variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>
                                    Copy Your ID 
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography style={{ marginBottom : '20px' }} gutterBottom variant='h6'> 
                                Make A Call
                            </Typography>
                            <TextField label='ID to Call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                            {(callAccepted && !callEnded) ? (
                                <Button 
                                    style={{ marginTop : '20px' }}
                                    variant='contained' 
                                    color='secondary' 
                                    startIcon={<PhoneDisabled fontSize='large' />} 
                                    fullWidth 
                                    onClick={leaveCall}
                                    className={classes.margin}
                                >
                                    Hang Up
                                </Button>
                            ) : (
                                <Button
                                    style={{ marginTop : '20px' }}
                                    variant='contained' 
                                    color='primary' 
                                    startIcon={<Phone fontSize='large' />} 
                                    fullWidth 
                                    onClick={() => callUser(idToCall)}
                                    className={classes.margin}
                                >
                                    Call
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default Options