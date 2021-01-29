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
import RepoItem from '../RepoItem';

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
            <RepoItem key={repo.id} repo={repo} />
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
                                Latest Workflow Run
                            </TableCell>
                            <TableCell>
                                Language
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
