import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { RepoIcon } from '@primer/octicons-react';
import GitHubApiClient from '../../githubApiClient';
import DashCard from '../../components/DashCard';
import orderBy from 'lodash.orderby';
import { withRouter } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import gitHubLangColors from '../../github-lang-colors'

const ReposCard = (props) => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const getRepos = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`${props.resource}/repos`);
            const orderedRepos = orderBy(response, ['pushed_at'], ['desc']);
            setRepos(orderedRepos);
        }

        getRepos();
    }, [props.resource]);

    const renderRepo = (repo) => {
        return (
            <TableRow key={repo.id} onClick={() => { props.history.push(`/${repo.full_name}`) }} style={{ cursor: 'pointer' }}>
                <TableCell>
                    {repo.full_name}
                </TableCell>
                <TableCell>
                    {
                        repo.language ? (
                            <Chip label={repo.language} style={{ backgroundColor: gitHubLangColors[repo.language] }} />
                        ) : (
                            "Not sure"
                        )
                    }
                </TableCell>
                <TableCell>
                    {repo.pushed_at}
                </TableCell>
            </TableRow>
        )
    }
    
    return (
        <DashCard
            icon={<Icon><RepoIcon size="medium" /></Icon>}
            text="Repos"
            content={
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Repo
                            </TableCell>
                            <TableCell>
                                Written In
                            </TableCell>
                            <TableCell>
                                Last Pushed At
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repos.map(renderRepo)}
                    </TableBody>
                </Table>
            }
        />
    );
}
 
export default withRouter(ReposCard);
