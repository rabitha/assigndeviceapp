import React, { Component }  from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listUserss } from '../graphql/queries';
import { deleteUsers } from '../graphql/mutations';

class ListUsers extends Component {
  constructor(props){
      super(props);      
      this.state = { loading: true, listUsers: [] }
    }
  async componentDidMount() {
      setTimeout(() => {
        this.setState({loading: false})
      },2000)
    try {
      const apiData = await API.graphql(graphqlOperation(listUserss))
      const listUsers = apiData.data.listUserss.items
      if(listUsers.length>0){
        this.setState({ listUsers })
      }else{
        let successMessage = document.querySelector('.danger-message');
        successMessage.innerHTML = 'Empty List!';        
      }
    } catch (err) {
      console.log('error: ', err)
    }
  }
  async deleteFields( userId,divId ) {
    //console.log(userId);
    var del=window.confirm("Are you sure want to delete this record?");
    if (del===true){
      try {
       const deleteuserdetails = { 'id':userId }
        await API.graphql(graphqlOperation(deleteUsers, { input: deleteuserdetails}));
        let successMessage = document.querySelector('.success-message');
        successMessage.innerHTML = 'User details deleted!';
        document.getElementById(divId).style.display = "none";
        } 
        catch (err) {
        let successMessage = document.querySelector('.danger-message');
        successMessage.innerHTML = 'Failed!';
        console.log('error: ', err);
      }
    }
  }
  render(){
    let loading = this.state.loading ? <tr><td style={{'color':'green','fontWeight':'bold','float':'left','fontSize':'30px'}}>Loading ...</td></tr> :  <tr></tr>;
    return (
     <div className="content-wrapper">    
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">List Users</h3>
                </div>
                <div className="col-md-6">
                  <div className="success-message card-success" style={{'float':'right'}}><label></label></div>
                  <div className="danger-message text-danger" style={{'float':'right'}}><label></label></div>
                </div>
                <div className="card-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Mail Address</th>
                      <th>Employee Number</th>
                      <th>Contact Number</th>
                      <th>Desk name</th>
                      <th>Name of User</th> 
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{loading}
                    {
                        this.state.listUsers.map((users, i) => (
                          <tr key={"users"+i} id={users.employeeNumber+i}>
                            <td>{users.mppmailAddress}</td>
                            <td>{users.employeeNumber}</td>
                            <td>{users.contactNumber}</td>
                            <td> {users.deskName}</td>
                            <td> {users.nameofUser}</td>
                            <td colSpan={2}>
                            <button type="button" className="btn btn-danger" onClick={() => this.deleteFields(users.id,users.employeeNumber+i)}>delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot>
                    <tr>                
                      <th>Mail Address</th>
                      <th>Employee Number</th>
                      <th>Contact Number</th>
                      <th>Desk name</th>
                      <th>Name of User</th> 
                      <th>Actions</th>
                    </tr>
                    </tfoot>
                  </table>
                </div>
              </div>             
            </div>            
          </div>          
        </div>
      </section>
    </div>
    );
  }
}
export default ListUsers;