import React,{ Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { createUsers } from '../graphql/mutations';

class AddUsers extends Component{
  constructor(){
    super();
    this.state = {mppmailAddress: '',employeeNumber: '',contactNumber: '',deskName: '',nameofUser: ''};
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.createUsers();
  }
  createUsers = async () => {      
    const { mppmailAddress,employeeNumber,contactNumber,deskName,nameofUser } = this.state;
    if (mppmailAddress === '' || employeeNumber === '' || contactNumber === '' || deskName === '' || nameofUser === '')  {
      this.setState({ mppmailAddress: '',employeeNumber: '',contactNumber: '',deskName: '',nameofUser: '' })
      return
    }
    try {
      const userdetails = { mppmailAddress,employeeNumber,contactNumber,deskName,nameofUser }
      await API.graphql(graphqlOperation(createUsers, {input: userdetails}))
      let successMessage = document.querySelector('.success-message');
      successMessage.innerHTML = 'User details successfully created!';
      successMessage.style.display = 'block';
     // document.querySelector(".success-message").classList.add("fadecls");
      document.getElementById('mppmailAddress').value = "";
      document.getElementById('employeeNumber').value = "";
      document.getElementById('contactNumber').value = "";
      document.getElementById('deskName').value = "";
      document.getElementById('nameofUser').value = "";
      console.log('User details successfully created!')
    } catch (err) {
      let successMessage = document.querySelector('.danger-message');
      successMessage.innerHTML = err;
      console.log('error: ', err)
    }
  }
  render(){
    return (
     <div className="content-wrapper">      
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Users form</h3>
                </div>
                <div className="col-md-6">
                  <div className="success-message text-success animated" style={{'float':'right'}}><label></label></div>
                  <div className="danger-message text-danger animated" style={{'float':'right'}}><label></label></div>
                </div>
                <form id="addUsersform" onSubmit={this.handleSubmit}>
                  <div className="card-body">
                    <div className="form-group">
                      <input type="email" required onChange={this.onChange} onFocus={this.onChange} name="mppmailAddress" className="form-control" id="mppmailAddress" placeholder="Enter Mpp Mail Address" defaultValue={this.state.mppmailAddress}/>
                    </div>
                    <div className="form-group">
                      <input type="number" required onChange={this.onChange} onFocus={this.onChange} name="employeeNumber" className="form-control" id="employeeNumber" placeholder="Enter Employee Number" defaultValue={this.state.employeeNumber}/>
                    </div>
                    <div className="form-group">
                      <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required onFocus={this.onChange} onChange={this.onChange} name="contactNumber" className="form-control" id="contactNumber" placeholder="Enter Contact Number like 999-999-9999" defaultValue={this.state.contactNumber}/>
                    </div>
                    <div className="form-group">
                      <input type="text" required onFocus={this.onChange} onChange={this.onChange} name="deskName" className="form-control" id="deskName" placeholder="Enter Deskname" defaultValue={this.state.deskName}/>                 
                    </div>
                    <div className="form-group">
                      <input type="text" required onChange={this.onChange} onFocus={this.onChange} name="nameofUser" className="form-control" id="nameofUser" placeholder="Enter Name of User" defaultValue={this.state.nameofUser}/>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>          
            <div className="col-md-3"></div>              
          </div>          
        </div>
      </section>
    </div>   
    );
  }
}
export default AddUsers;