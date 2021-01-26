import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import orderBy from 'lodash.orderby';
import filter from 'lodash.filter';
import Icon from '@material-ui/core/Icon';
import { RepoIcon, WorkflowIcon, GitPullRequestIcon, OrganizationIcon, CodeIcon } from '@primer/octicons-react';
import { Doughnut } from 'react-chartjs-2';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { countBy, toPairs, flow, head, last, maxBy, partialRight } from 'lodash';
import WorkflowRunsTable from '../../components/WorkflowRunsTable';
import GitHubApiClient from '../../githubApiClient';
import theme from '../../theme';
import DashCard from '../../components/DashCard';
import InfoCard from '../InfoCard';

const Organization = (props) => {
    const [workflowRuns, setWorkflowRuns] = useState([]);
    const [numberOfRepos, setNumberOfRepos] = useState(0);
    const [numberOfOpenPrs, setNumberOfOpenPrs] = useState(0);
    const [topLanguage, setTopLangague] = useState('');
    const [completedWorkflowRateData, setCompletedWorkflowRateData] = useState({
        total: 0,
        successful: 0,
        failed: 0,
        other: 0,
        rate: 0
    });

    useEffect(() => {
        const updateWorkflowRateDate = (runs) => {
            const completedWorkflowRuns = filter(runs, ['status', 'completed']);
            const numberOfSuccessfulWorkflows = filter(completedWorkflowRuns, ['conclusion', 'success']).length;
            const numberOfFailedWorkflows = filter(completedWorkflowRuns, ['conclusion', 'failure']).length;

            const numberOfCompletedWorkflows = completedWorkflowRuns.length;
            const numberOfOtherWorkflows = numberOfCompletedWorkflows - (numberOfSuccessfulWorkflows + numberOfFailedWorkflows);
            const successRate = () => {
                if (numberOfCompletedWorkflows === 0) {
                    return 0;
                }
                
                return Math.floor((numberOfSuccessfulWorkflows / numberOfCompletedWorkflows) * 100);
            };

            setCompletedWorkflowRateData({
                total: numberOfCompletedWorkflows,
                successful: numberOfSuccessfulWorkflows,
                failed: numberOfFailedWorkflows,
                other: numberOfOtherWorkflows,
                rate: successRate(),
            })
        };

        const getRepos = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/orgs/${props.match.params.orgid}/repos`);
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

            updateWorkflowRateDate(allWorkflowRuns);

            const orderedRuns = orderBy(allWorkflowRuns, ['created_at'], ['desc']);
            setWorkflowRuns(orderedRuns);
        }

        getAllRepoWorkflows();
    }, [props.match.params.orgid]);

    return (
        <Grid container item xs={12} spacing={2} style={{ padding: 16, paddingTop: 80 }}>
            <Grid lg={3} md={6} xs={12} item>
                <InfoCard
                    resource="orgs"
                    resourceId={props.match.params.orgid}
                />
            </Grid>
            <Grid lg={3} md={6} xs={12} item>
                <DashCard
                    text={`${completedWorkflowRateData.rate}% successful workflows`}
                    icon={<Icon><WorkflowIcon size="medium" /></Icon>}
                    content={
                        <Doughnut
                            legend={null}
                            data={{
                                datasets: [{
                                    backgroundColor: [theme.palette.githubColors.green, theme.palette.githubColors.red, 'gray'],
                                    data: [completedWorkflowRateData.successful, completedWorkflowRateData.failed, completedWorkflowRateData.other]
                                }],
                                labels: [
                                    'Successful',
                                    'Failed',
                                    'Other'
                                ]
                            }}
                        />
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <WorkflowRunsTable workflowRuns={workflowRuns} />
            </Grid>
        </Grid>
    );
}
 
export default Organization;
