import React from 'react';
import {get} from '../../githubApi/index'

const Home = () => {
    const getStuff = async () => {
        const response = await get('https://api.github.com/user/repos');
        console.log(response);
    }

    return (<button onClick={getStuff}>show me the money</button>);
}
 
export default Home;