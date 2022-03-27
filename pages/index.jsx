import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MusicNote from '@material-ui/icons/MusicNote';

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
            <>welcome to parolier-V2</>
            <br />
            <button onClick={() => router.push('/addSong')}>Add data</button>
            {/* <ol> */}
            {songTitle.map((eachSong) => (
                // <li key={eachSong.id}>
                //     <button
                //         type="button"
                //         onClick={() => {
                //             router.push({
                //                 pathname: '/song',
                //                 query: { id: eachSong.id },
                //             });
                //         }}>
                //         {eachSong.song_title} - {eachSong.song_buffer}
                //     </button>
                // </li>
                <List
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
            {/* </ol> */}
            {/* <List style={{ border: '1px solid black', borderRadius: '5px', margin: '10px', padding: '-10px' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MusicNote />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" />
                </ListItem>
            </List> */}
        </>
    );
}
