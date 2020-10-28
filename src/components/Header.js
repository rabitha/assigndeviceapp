import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { updateAdminLogin } from '../graphql/mutations';
class Header extends Component {
	logout = async () => {  
		console.log("clicked logout");
    	try {
    		const adminid = localStorage.getItem('adminid');
       		const updatevalue = { adminStatus: 'no',id:adminid};
       		//const updatevalue = { adminStatus: 'no',id:'74cba857-6ef4-4303-8038-2bdb529996f8'};
    		await API.graphql(graphqlOperation(updateAdminLogin, {input:updatevalue}));
        	localStorage.setItem('adminStatus',"no");  
        	localStorage.setItem('adminid',"");  
    		window.location.reload(false);  
     	}catch(err){
     		console.log("error",err);
     	}
	}
	render(){
		return (
		    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
			    <ul className="navbar-nav">
			      <li className="nav-item">
			        <Link className="nav-link" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars"></i></Link>
			      </li>
			    </ul> 
			    <ul className="navbar-nav ml-auto">
			    	<Link to="#" onClick={this.logout}>Logout</Link>
			    </ul>   
		  	</nav>  
		);
	}
}
export default Header;