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
            <TableRow key={repo.id} onClick={() => { window.open(repo.html_url, '_blank') }} style={{ cursor: 'pointer' }}>
                <TableCell>
                    {repo.full_name}
                </TableCell>
                <TableCell>
                    {repo.stargazers_count}
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
                                Stars
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
 
export default ReposCard;
