import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DashCard from '../../components/DashCard';
import GitHubApiClient from '../../githubApiClient';
import { HorizontalBar } from 'react-chartjs-2';
import gitHubLangColors from '../../github-lang-colors';

const RepoInfoCard = (props) => {
    const [languages, setLanguages] = useState(null);

    useEffect(() => {
        const getReposLanguages = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/repos/${props.repoFullName}/languages`);
            setLanguages(response);
        };

        getReposLanguages();
    }, [props.repoFullName]);

    const getLangageData = () => {
        if (!languages) {
            return {};
        }
        
        const datasets = Object.keys(languages).map((key) => {
            return {
                backgroundColor: gitHubLangColors[key],
                data: [languages[key]],
                label: key,
                barThickness: '20',
                barPercentage: 1.0
            }
        });

        return {
            labels: ['Languages'],
            datasets,
        }
    }

    return (
        <DashCard
            text={props.text}
            icon={props.icon}
            content={
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        {
                            languages &&
                                <HorizontalBar
                                    width="100%"
                                    data={getLangageData()}
                                    legend={{
                                        display: false,
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            xAxes: [{
                                                stacked: true,
                                                ticks: {
                                                    display: false,
                                                },
                                                gridLines: {
                                                    display:false
                                                },
                                            }],
                                            yAxes: [{
                                                stacked: true,
                                                gridLines: {
                                                    display:false
                                                } 
                                            }]
                                        }
                                    }}
                                />
                        }
                    </Grid>
                </Grid>
            }
        />
    );
}
 
export default RepoInfoCard;
