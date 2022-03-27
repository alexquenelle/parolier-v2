import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Drawer } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { useRouter } from 'next/router';

const styles = (theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const DrawerComponent = (props) => {
    const { classes } = props;
    const router = useRouter();

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={props.toggleDrawerHandler}
            onKeyDown={props.toggleDrawerHandler}>
            {/* <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
            <ListItem button key={'Home'} onClick={() => router.push('/')}>
                <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                <ListItemText primary={'Home'} />
            </ListItem>
            <Divider />
            <ListItem button key={'Settings'} onClick={() => router.push('/settings')}>
                <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
                <ListItemText primary={'Settings'} />
            </ListItem>
        </div>
    );

    return (
        <Drawer open={props.open} onClose={props.toggleDrawerHandler}>
            {sideList()}
        </Drawer>
    );
};

export default withStyles(styles)(DrawerComponent);
