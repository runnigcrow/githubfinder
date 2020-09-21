import React, {Fragment, Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';//GithubSearch/github_finder/src/components/layout/Navbar.js
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios'// api fetching package used to 
import './App.css';


class App	extends Component {
	state={
		users:[],
		user:{},
		loading: false,
		alert: null,
	}

	//search github users 
	searchUsers =  async (text) =>{
		this.setState({ loading: true });
		
		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
			{process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
			{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		
		this.setState({users:res.data.items, loading:false});
	};

	//get a single github user
	getUser = async (username) =>{
		this.setState({ loading: true });
		
		const res = await axios.get(`https://api.github.com/users/${username}?client_id=$
			{process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
			{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		
		this.setState({user:res.data, loading:false});
	};

	//clear users from state 
	clearUsers = () => this.setState({users: [], loading:false});

	//set alert
	setAlert = (msg, type) => {
		this.setState({ alert:{ msg: msg, type: type } });
		//make it go away after a certain time 
		setTimeout(()=> this.setState({ alert:null }),5000)
	};

  render(){
		const{ users, user, loading} = this.state
		
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className='container'>
						<Alert
							alert={this.state.alert}
						/>
						<Switch>
							<Route 
								exact 
								path='/' 
								render={props => (
									<Fragment>
										<Search 
											searchUsers={this.searchUsers} 
											clearUsers={this.clearUsers} 
											showClear={users.length>0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users}/>	
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
										<User { ...props } getUser={this.getUser} user={user} loading={loading} />	
									</Fragment>
							)} />
						</Switch>
					</div>
				</div>
			</Router>
  	);
	}
}

export default App;
