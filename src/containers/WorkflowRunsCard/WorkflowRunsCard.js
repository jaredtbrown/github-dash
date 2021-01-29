import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import orderBy from 'lodash.orderby';
import GitHubApiClient from '../../githubApiClient';
import { WorkflowIcon } from '@primer/octicons-react';
import DashCard from '../../components/DashCard';
import Icon from '@material-ui/core/Icon';
import WorkflowRun from '../WorkflowRun/index'

const WorkflowRunsCard = (props) => {
    const [workflowRuns, setWorkflowRuns] = useState([]);

    useEffect(() => {
        const getRepoWorkflowRuns = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            const response = await gitHubApiClient.get(`/repos/${props.repoFullName}/actions/runs`);
            const orderedRuns = orderBy(response.workflow_runs, ['created_at'], ['desc']);
            setWorkflowRuns(orderedRuns);
        }
        getRepoWorkflowRuns();
    }, [props.repoFullName]);

    const renderWorkflowRun = (run) => {
        return (
            <WorkflowRun key={run.id} run={run} repoFullName={props.repoFullName} />
        )
    };

    return (
        <DashCard
            text="Workflow Runs"
            icon={<Icon><WorkflowIcon size="medium" /></Icon>}
            content={
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Jobs
                            </TableCell>
                            <TableCell>
                                Created
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workflowRuns.map(renderWorkflowRun)}
                    </TableBody>
                </Table>
            }
        />
    );
}
 
export default WorkflowRunsCard;