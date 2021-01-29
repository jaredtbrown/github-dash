import React, { useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import WorkflowStatus from '../../components/WorkflowStatus';
import GitHubApiClient from '../../githubApiClient/index'

const WorkflowRun = (props) => {
    const [jobs, setJobs] = useState([]);

    const { run } = props;

    useEffect(() => {
        const getRunJobs = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            const response = await gitHubApiClient.get(`/repos/${props.repoFullName}/actions/runs/${run.id}/jobs`);
            setJobs(response.jobs);
        };

        getRunJobs();
    }, [run.id, props.repoFullName]);

    const renderJobs = (job, index) => {
        return (
            <div key={job.id}>
                <WorkflowStatus
                    status={job.status}
                    conclusion={job.conclusion}
                    text={job.name}
                />
                {
                    index + 1 !== jobs.length &&
                    <div style={{ borderTop: 'solid 2px white', width: 10, display: 'inline-block', marginLeft: 5, marginRight: 5 }} />
                }
            </div>
        )
    }

    return (
        <TableRow key={run.id} onClick={() => { window.open(run.html_url, '_blank') }} style={{ cursor: 'pointer' }}>
            <TableCell>
                <WorkflowStatus status={run.status} conclusion={run.conclusion} />&nbsp;
                {run.name}
            </TableCell>
            <TableCell style={{ display: 'flex'}}>
                {jobs.map(renderJobs)}
            </TableCell>
            <TableCell>
                {run.created_at}
            </TableCell>
        </TableRow>
    );
}
 
export default WorkflowRun;
