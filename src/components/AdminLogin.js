import React,{ Component } from 'react';
import {Link,withRouter } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getAdminLogin } from '../graphql/queries';
import { updateAdminLogin } from '../graphql/mutations';

class AdminLogin extends Component {

  state = { adminFields: [] }
  constructor(){
    super();
    this.state = {adminemail: '',adminpwd: '',adminStatus:'yes'};
   // console.log(this.props.history);
   // this.props.history.push("/");
  }
  onChange = (e) => {
    let Message = document.querySelector('.danger-message');
    Message.style.display = 'none';     
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.checkAdminlogin();
  }  
  checkAdminlogin = async () => {   
    const { adminemail,adminpwd } = this.state;
    try {  
      const apiData = await API.graphql(graphqlOperation(getAdminLogin, {id:'74cba857-6ef4-4303-8038-2bdb529996f8'}));
     // const apiData = await API.graphql(graphqlOperation(getAdminLogin, {adminemail:adminemail}));
      const adminFields = apiData.data.getAdminLogin;
      if(adminFields.adminemail === adminemail && adminFields.adminpwd === adminpwd){
      // && adminFields.adminStatus === adminStatus){
        const updatevalue = { adminStatus: 'yes',id:adminFields.id};
        //const updatevalue = { adminStatus: 'yes',id:'74cba857-6ef4-4303-8038-2bdb529996f8'};
        await API.graphql(graphqlOperation(updateAdminLogin, {input:updatevalue}));
        //this.setState({ adminFields }); 
        localStorage.setItem('adminid',adminFields.id);  
        localStorage.setItem('adminStatus',"yes"); 
        //console.log(this.props);
        //this.props.history.push("/");
       window.location.reload(false);
       // console.log(this.state.adminFields);     
      }else{
        let Message = document.querySelector('.danger-message');
        Message.innerHTML = 'Login Failed...';
        Message.style.display = 'block';     
        //document.getElementById("danger-message").animate([{ opacity:0 }], { duration: 5000,iterations: Infinity});    
      }
    }catch(err){
      console.log('error: ', err); 
      let Message = document.querySelector('.danger-message');
      Message.innerHTML = 'Login Failed';
      Message.style.display = 'block';   
     // document.getElementById("danger-message").animate([{ opacity:0 }], { duration: 5000,iterations: Infinity}); 
    }
  }
  render(){
    return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to="/AdminLogin"><b>Admin</b>ADA</Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Admin Login</p>
            <div className="col-md-6">
              <div id="success-message" className="success-message text-success" style={{'float':'left','fontWeight':'bold'}}><label></label></div>
              <div id="danger-message" className="danger-message text-danger" style={{'float':'left','fontWeight':'bold'}}><label></label></div>
            </div>
              <form id="adminLoginform" onSubmit={this.handleSubmit}>
                <input type="hidden" name="adminStatus" id="adminStatus" value="yes"/>
                <div className="input-group mb-3">
                  <input type="email" className="form-control" required name="adminemail" id="adminemail" placeholder="Email" onFocus={this.onChange} onChange={this.onChange}/>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" required name="adminpwd" id="adminpwd" placeholder="Password" onFocus={this.onChange} onChange={this.onChange}/>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Log In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> 
    </div> 
    );
  }
}
export default AdminLogin;