import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';//GithubSearch/github_finder/src/components/layout/Navbar.js
import Users from './components/users/Users';
import axios from 'axios'// api fetching package used to 
import './App.css';


class App	extends Component {
	state={
		users:[],
		loading: false,
	}
	
	async componentDidMount(){ //runs code as app starts 
		this.setState({loading:true});
		
		const res = await axios.get(`https://api.github.com/users?client_id=$
			{process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
			{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		
		this.setState({users:res.data,loading:false});
	}
	
  render(){
		// const name = 'John Doe';
		// const foo = ()=>'Bar';
		// const loading = false;
		// const showName= true;
		
		return (
			//JSX is the html code below java script synatx extention XML or html in a way
			// under the hood its actually javascript ,,, JSX needs one parent element such as the div 
			// we can use fragments instead of div or empty brackets <>
			//use classname instead of class
			//<React.Fragment>
			//	<h2>hello</h2>
			//</React.Fragment>
			// or no jsx 	return React.createElement('div',{className:'App'}, React.createElement('h1',null,'hello from react'));
				// {loading ? <h4>loading</h4> : <h2>not loading</h2>}
				// <h1>Hello {showName && name}</h1>
				// <h1>Hello {1+1}</h1>
				// <h1>Hello {foo()}</h1>
				// <h1>Hello {this.foo2()}</h1>
			
			
			<div className="App">
				<Navbar/>
				<div className='container'>
					<Users loading={this.state.loading} users={this.state.users}/>
				</div>
				
    	</div>
  	);
	}
}

export default App;
