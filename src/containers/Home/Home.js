import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GitHubApiClient from '../../githubApiClient'
import OrganizationCard from '../OrganizationCard';

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
            <Grid item key={org.id}>
                <OrganizationCard login={org.login} />
            </Grid>
        )
    }

    return (
        <Grid container style={{ padding: 16 }}>
            {
                organizations.map(renderOrganization)
            }
        </Grid>
    );
}
 
export default Home;