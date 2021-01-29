import React, { useEffect, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';
import GitHubApiClient from '../../githubApiClient';
import gitHubLangColors from '../../github-lang-colors';
import WorkflowStatus from '../../components/WorkflowStatus';
import { withRouter } from 'react-router-dom';

const RepoItem = (props) => {
    const [lastDefaultBranchWorkflowRun, setLastDefaultBranchWorkflowRun] = useState(null);

    const { repo } = props;

    useEffect(() => {
        const getLastWorkflowRun = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            const response = await gitHubApiClient.get(`/repos/${repo.full_name}/actions/runs?branch=${repo.default_branch}`);
            const lastRun = response.workflow_runs[0];
            setLastDefaultBranchWorkflowRun(lastRun);
        };

        getLastWorkflowRun();
    }, [repo.full_name, repo.default_branch])

    return (
        <TableRow key={repo.id} onClick={() => { props.history.push(`/${repo.full_name}`) }} style={{ cursor: 'pointer' }}>
            <TableCell>
                {repo.full_name}
            </TableCell>
            <TableCell>
                {
                    lastDefaultBranchWorkflowRun &&
                    <WorkflowStatus
                        status={lastDefaultBranchWorkflowRun.status}
                        conclusion={lastDefaultBranchWorkflowRun.conclusion}
                    />
                }
            </TableCell>
            <TableCell>
                {
                    repo.language &&
                    <Chip label={repo.language} style={{ backgroundColor: gitHubLangColors[repo.language] }} />
                }
            </TableCell>
            <TableCell>
                {repo.pushed_at}
            </TableCell>
        </TableRow>
    );
}
 
export default withRouter(RepoItem);