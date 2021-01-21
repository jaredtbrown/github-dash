import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import GitHubApiClient from '../../githubApiClient';
import { Typography } from '@material-ui/core';

const OrganizationCard = (props) => {
    const [organization, setOrganization] = useState({});

    useEffect(() => {
        const getOrganization = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            const organization = await gitHubApiClient.get(`/orgs/${props.login}`);
            setOrganization(organization);
        }

        getOrganization();
    }, [props.login]);

    return (
        <Card>
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Avatar src={organization.avatar_url} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            {organization.name}
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography>
                            {organization.description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
 
export default OrganizationCard;