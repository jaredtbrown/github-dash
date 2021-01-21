import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import orderBy from 'lodash.orderby';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '@material-ui/core/Icon';
import { RepoIcon } from '@primer/octicons-react';
import WorkflowRunsTable from '../../components/WorkflowRunsTable';
import GitHubApiClient from '../../githubApiClient';
import { Typography } from '@material-ui/core';
import theme from '../../theme';
import DashCard from '../../components/DashCard';

const Organization = (props) => {
    const [workflowRuns, setWorkflowRuns] = useState([]);
    const [numberOfRepos, setNumberOfRepos] = useState(0);

    useEffect(() => {
        const getRepos = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/orgs/${props.match.params.orgid}/repos`);
            setNumberOfRepos(response.length);
            return response;
        }

        const getAllRepoWorkflows = async () => {
            const repos = await getRepos();
            let allWorkflowRuns = [];
            for (const repo of repos) {
                const token = localStorage.getItem('token');
                const gitHubApiClient = new GitHubApiClient(token);
                const response = await gitHubApiClient.get(`/repos/${repo.full_name}/actions/runs`);
                allWorkflowRuns = [...allWorkflowRuns, ...response.workflow_runs];
            }

            const orderedRuns = orderBy(allWorkflowRuns, ['created_at'], ['desc']);
            setWorkflowRuns(orderedRuns);
        }
        getAllRepoWorkflows();
    }, [props.match.params.orgid]);

    const handleOnReposClick = () => {
        window.open(`https://github.com/${props.match.params.orgid}`)
    };

    return (
        <Grid container item xs={12} spacing={2} style={{ padding: 16, paddingTop: 80 }}>
            <Grid lg={3} md={6} xs={12} item>
                <DashCard
                    text={`${numberOfRepos} repos`}
                    icon={<Icon style={{ color: theme.palette.githubColors.yellow }}><RepoIcon size="medium" /></Icon>}
                    onClick={handleOnReposClick}
                />
            </Grid>
            <Grid item xs={12}>
                <WorkflowRunsTable workflowRuns={workflowRuns} />
            </Grid>
        </Grid>
    );
}
 
export default Organization;
