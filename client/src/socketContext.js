import React, { createContext, useEffect, useRef, useState } from "react"
import { io } from 'socket.io-client'
import Peer from 'simple-peer/simplepeer.min.js'

const SocketContext = createContext()

// const socket = io('http://localhost:5000')
const socket = io('https://chat-web-rtc-app-backend.vercel.app/')

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState()
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('')

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()


    useEffect(() => {
        if (!stream) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream)
                myVideo.current.srcObject = currentStream
            })
            .catch(error => console.error('Error accessing media devices.', error))
        }
        socket.on('me', (id) => setMe(id))
    
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
        })
    }, [stream])
    
    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream
        }
    }, [myVideo, stream])

    const answerCall = () => {
        try {
            setCallAccepted(true)
    
            const peer = new Peer({ initiator : false, trickle : false, stream })
            
            peer.on('signal', (data) => {
                socket.emit('answerCall', { signal : data, to : call.from })
            })
            peer.on('stream', (currentStream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = currentStream
                }
            })
            peer.signal(call.signal)
    
            connectionRef.current =  peer
        } catch (error) {
            console.error('Error in answerCall:', error)
        }
    }

    const callUser = (id) => {
        try {
            if (!stream) {
                throw new Error("Media stream is not available")
            }
            const peer = new Peer({ initiator : true, trickle : false, stream :stream })
    
            peer.on('signal', (data) => {
                socket.emit('callUser', { userToCall : id, signalData : data, from : me, name })
            })
            peer.on('stream', (currentStream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = currentStream
                }
            })
            peer.on('error', (err) => {
                console.error('Peer connection error:', err)
            })
            socket.on('callAccepted', (signal) => {
                setCallAccepted(true)
                peer.signal(signal)
            })
            connectionRef.current =  peer
        } catch (error) {
            console.error('Error in callUser:', error)
        }
    }

    const leaveCall = () => {
        setCallEnded(true)

        connectionRef.current.destroy()
        window.location.reload()
    }
    return (
        <SocketContext.Provider value={{ 
            call, 
            callAccepted, 
            myVideo, 
            userVideo,  
            stream, 
            name, 
            setName, 
            callEnded, 
            me, 
            callUser, 
            leaveCall, 
            answerCall 
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext }