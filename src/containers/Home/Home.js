import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import GitHubApiClient from '../../githubApiClient'
import OrganizationCard from '../OrganizationCard';
import MyWorkCard from '../MyWorkCard';

const Home = (props) => {
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

    const handleOnOrgClick = (org) => {
        props.history.push(`/org/${org.login}`)
    };

    const handleOnMyWorkClick = (username) => {
        props.history.push(`/${username}`);
    };

    const renderOrganization = (org) => {
        return (
            <Grid lg={3} md={6} xs={12} item key={org.id}>
                <OrganizationCard login={org.login} onClick={() => handleOnOrgClick(org)} />
            </Grid>
        )
    }

    return (
        <Grid container item spacing={2} xs={12} style={{ padding: 16, paddingTop: 80 }}>
            <Grid lg={3} md={6} xs={12} item>
                <MyWorkCard onClick={handleOnMyWorkClick} />
            </Grid>
            {
                organizations.map(renderOrganization)
            }
        </Grid>
    );
}
 
export default Home;