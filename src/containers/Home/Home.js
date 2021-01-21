import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GitHubApiClient from '../../githubApiClient'
import OrganizationCard from '../OrganizationCard';
import MyWorkCard from '../MyWorkCard';

const Home = () => {
    const [organizations, setOrganizations] = useState([]);

    const getOrganizations = async () => {
        const token = localStorage.getItem('token');
        const gitHubApiClient = new GitHubApiClient(token);
        const organizations = await gitHubApiClient.get('/user/orgs');
        setOrganizations(organizations);
    }

    useEffect(() => {
        getOrganizations();
    }, []);

    const renderOrganization = (org) => {
        return (
            <Grid lg={3} md={6} xs={12} item key={org.id}>
                <OrganizationCard login={org.login} />
            </Grid>
        )
    }

    return (
        <Grid container spacing={2} xs={12} style={{ padding: 16 }}>
            <Grid lg={3} md={6} xs={12} item>
                <MyWorkCard />
            </Grid>
            {
                organizations.map(renderOrganization)
            }
        </Grid>
    );
}
 
export default Home;