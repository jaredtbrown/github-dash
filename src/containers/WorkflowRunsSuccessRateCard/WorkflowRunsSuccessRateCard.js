import React, { useEffect, useState } from 'react';
import filter from 'lodash.filter';
import { WorkflowIcon } from '@primer/octicons-react';
import Icon from '@material-ui/core/Icon';
import { Doughnut } from 'react-chartjs-2';
import theme from '../../theme';
import DashCard from '../../components/DashCard';
import GitHubApiClient from '../../githubApiClient';

const WorkflowRunsCard = (props) => {
    const [successfulWorkflowRateData, setSuccessfulWorkflowRateData] = useState({
        successful: 0,
        other: 0,
        rate: 0
    });

    useEffect(() => {
        const getRepoWorkflowRunsSuccessRate = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            const response = await gitHubApiClient.get(`/repos/${props.repoFullName}/actions/runs`);

            const completedWorkflowRuns = filter(response.workflow_runs, ['status', 'completed']);
            const numberOfSuccessfulWorkflows = filter(completedWorkflowRuns, ['conclusion', 'success']).length;

            const numberOfCompletedWorkflows = completedWorkflowRuns.length;
            const numberOfOtherWorkflows = numberOfCompletedWorkflows - numberOfSuccessfulWorkflows;
            const successRate = () => {
                if (numberOfCompletedWorkflows === 0) {
                    return 0;
                }

                return Math.floor((numberOfSuccessfulWorkflows / numberOfCompletedWorkflows) * 100);
            };

            setSuccessfulWorkflowRateData({
                successful: numberOfSuccessfulWorkflows,
                other: numberOfOtherWorkflows,
                rate: successRate(),
            })
        }

        getRepoWorkflowRunsSuccessRate();
    }, [props.repoFullName]);

    console.log(successfulWorkflowRateData);
    return (
        <DashCard
            text={`Workflow Success Rate: ${successfulWorkflowRateData.rate}%`}
            icon={<Icon><WorkflowIcon size="medium" /></Icon>}
            content={
                <Doughnut
                    legend={{
                        display: false
                    }}
                    data={{
                        datasets: [{
                            backgroundColor: [theme.palette.githubColors.green, 'gray'],
                            data: [successfulWorkflowRateData.successful, successfulWorkflowRateData.other],
                        }],
                        labels: ['successful', 'other'],
                    }}
                />
            }
        />
    );
}
 
export default WorkflowRunsCard;