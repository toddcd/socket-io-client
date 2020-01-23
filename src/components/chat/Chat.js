import React, {useContext, useState} from 'react';
import {CTX} from '../../Store'

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        '& > *': {
            //margin: theme.spacing(1),
            //width: theme.spacing(16),
            //height: theme.spacing(16),
        },
        width: '100%',
        //height: '100vh',
        margin: '20px',
        backgroundColor: '#499EBF',
        color: '#ffffff'
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    topicsWindow: {
        width: '30%',
        height: '100%',
        backgroundColor: '#fcfcfc',
    },
    chatWindow: {
        width: '70%',
        height: '400px',
        borderLeft: '1px solid grey',
        padding: '20px',
        backgroundColor: '#fcfcfc',
        color: 'grey'
    },
    chatBox: {
        width: '100%',
        backgroundColor: '#fcfcfc',
    },
    button: {width: '15%'},
    topicButton: {
        color: 'grey'
        //backgroundColor: '#898C1F',
        // '&:hover': {
        //     backgroundColor: '#BF9D73',
        // }
    },
    avatar: {
        //color: theme.palette.getContrastText(deepOrange[500]),
        //backgroundColor: deepOrange[500],
        backgroundColor: '#024873'
    },
    message: {
        textAlign: 'left',
    }
}));


const Chat = () => {
    const classes = useStyles();

    //CTX Store
    const {allChats, sendChatAction, user} = useContext(CTX);
    const topics = Object.keys(allChats)

    //Local State
    const [activeTopic, changeActiveTopic] = useState(topics[0]);
    const [textValue, handleChangedTextValue] = useState('');

    return (
        <Paper className={classes.root}>
            <Typography variant='h5' component='h5'>
                EvoChat
            </Typography>
            <Typography variant='subtitle1'>
                {activeTopic} Topics
            </Typography>
            <div id='windows' className={classes.flex}>
                <div className={classes.topicsWindow}>
                    <List>
                        {topics.map((topic, idx) =>
                            (<ListItem onClick={e => {
                                changeActiveTopic(e.target.innerText)
                            }} key={idx} button className={classes.topicButton}>
                                <ListItemText primary={topic}/>
                            </ListItem>)
                        )}
                    </List>
                </div>
                <div className={classes.chatWindow}>
                    <List>
                        {
                            allChats[activeTopic].map((chat, idx) => (
                                <div key={idx} className={classes.flex}>
                                    <Box mr={2} mb={1}>
                                        <Avatar key={idx} className={classes.avatar}>{chat.user}</Avatar>
                                    </Box>
                                    <Box className={classes.message} mb={1.5}>
                                        <Typography variant='caption'>{chat.time}</Typography>
                                        <Typography variant='body1'>{chat.msg}</Typography>
                                    </Box>
                                </div>
                            ))
                        }
                    </List>
                </div>
            </div>
            <div id='controls' className={classes.flex}>
                <TextField className={classes.chatBox}
                           id="outlined-basic"
                           label="Send a chat"
                           fullWidth
                           variant="outlined"
                           value={textValue}
                           onChange={e => handleChangedTextValue(e.target.value)}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <Button className={classes.button}
                                               variant="contained"
                                               color="primary"
                                               onClick={() => {
                                                   sendChatAction({from: user, msg: textValue, topic: activeTopic});
                                                   handleChangedTextValue('');
                                               }}
                                       >
                                           Send
                                       </Button>
                                   </InputAdornment>
                               ),
                           }}
                />
            </div>
        </Paper>
    );
};

export default Chat;
