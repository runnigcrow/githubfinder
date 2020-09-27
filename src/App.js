import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';//GithubSearch/github_finder/src/components/layout/Navbar.js
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios'// api fetching package used to 

import GithubState from './context/github/GithubState'

import './App.css';


const App	= () =>{
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	//search github users 
	

	//get a single github user

	//get users repos
	const getUserRepos = async (username) =>{
		setLoading(true);
		
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
			{process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
			{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		
		setRepos(res.data);
		setLoading(false);
	};

	//clear users from state 


	//set alert
	const showAlert = (msg, type) => {
		setAlert({msg, type});
		//make it go away after a certain time 
		setTimeout(()=> setAlert(null),5000)
	};
		
	return (
		<GithubState>
		<Router>
			<div className="App">
				<Navbar />
				<div className='container'>
					<Alert
						alert={alert}
					/>
					<Switch>
						<Route 
							exact 
							path='/' 
							render={props => (
								<Fragment>
									<Search  
										setAlert={showAlert}
									/>
									<Users />	
								</Fragment>
							)} 
						/>
						<Route
							exact
							path="/about"
							component={About}
						/>
						<Route 
							exact 
							path='/user/:login' 
							render={props => (
								<Fragment>
									<User 
										{ ...props }
										getUserRepos={getUserRepos}
										repos={repos}
									/>	
								</Fragment>
						)} />
					</Switch>
				</div>
			</div>
		</Router>
		</GithubState>
	);
}

export default App;
