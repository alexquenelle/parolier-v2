import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MusicNote from '@mui/icons-material/MusicNote';

export default function Home() {
    const [songTitle, setSongTitle] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('api/getAll').then((data) => {
            console.log(data.data[0].song_title);
            setSongTitle(data.data);
        });
    }, []);

    return (
        <>
            {songTitle.map((eachSong) => (
                <List
                    Key={eachSong.id}
                    onClick={() => {
                        router.push({
                            pathname: '/song',
                            query: { id: eachSong.id },
                        });
                    }}
                    style={{ border: '1px solid black', borderRadius: '5px', margin: '10px', padding: '-10px' }}>
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
