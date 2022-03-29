import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MusicNote from '@mui/icons-material/MusicNote';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function Home(props) {
    const [songTitle, setSongTitle] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('api/getAllDisplayableSongs').then((data) => {
            console.log(data.data);
            setSongTitle(data.data);
        });
    }, []);

    if (songTitle.length === 0) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={3}>
                    <CircularProgress />
                </Grid>
            </Grid>
        );
    } else {
        return (
            <>
                {songTitle
                    .filter((eachSong) => {
                        return eachSong.song_title.toLowerCase().includes(props.searchParams.toLowerCase());
                    })
                    .map((eachSong) => (
                        <List
                            Key={eachSong.id}
                            onClick={() => {
                                router.push({
                                    pathname: '/song',
                                    query: { id: eachSong.id },
                                });
                            }}
                            style={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                margin: '10px',
                                padding: '-10px',
                            }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MusicNote />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={eachSong.song_title + ' - ' + eachSong.song_buffer} />
                            </ListItem>
                        </List>
                    ))}
            </>
        );
    }
}
