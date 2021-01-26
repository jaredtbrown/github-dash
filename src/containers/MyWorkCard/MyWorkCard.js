import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import GitHubApiClient from '../../githubApiClient';
import Typography from '@material-ui/core/Typography';

const MyWorkCard = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            const user = await gitHubApiClient.get(`/user`);
            setUser(user);
        }

        getUser();
    }, []);

    const handleOnClick = () => {
        props.onClick(user.login)
    };

    return (
        <Card style={{ cursor: 'pointer' }} onClick={handleOnClick}>
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Avatar src={user.avatar_url} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            My Work
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
 
export default MyWorkCard;