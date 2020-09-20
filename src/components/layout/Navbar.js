//classbased componet 
import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({icon,title}) =>{
 
	return (
		<nav className="navbar bg-primary">
			<h1>
				<i className={icon}/> {title}
			</h1>
		</nav>
	);
}


	//default props for components
	Navbar.defaultProps = {
		title:'Github Finder',
		icon:'fa fa-github'
	};
	
	Navbar.propTypes = {
		title: PropTypes.string.isRequired,
		icon:  PropTypes.string.isRequired
	};

export default Navbar