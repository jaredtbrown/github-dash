import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import orderBy from 'lodash.orderby';
import GitHubApiClient from '../../githubApiClient';
import WorkflowStatus from '../../components/WorkflowStatus';
import Link from '@material-ui/core/Link';
import { WorkflowIcon } from '@primer/octicons-react';
import DashCard from '../../components/DashCard';
import Icon from '@material-ui/core/Icon';

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
            <TableRow key={run.id} onClick={() => { window.open(run.html_url, '_blank') }} style={{ cursor: 'pointer' }}>
                <TableCell>
                    <WorkflowStatus status={run.status} conclusion={run.conclusion} />&nbsp;
                    {run.name}
                </TableCell>
                <TableCell>
                    <Link color="inherit" href={run.repository.html_url} target="_blank" rel="noreferrer">{run.repository.name}</Link>
                </TableCell>
                <TableCell>
                    {run.created_at}
                </TableCell>
            </TableRow>
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
                                Repo
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