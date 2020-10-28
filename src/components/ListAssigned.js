import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listAssignedDevicess,getDevices,getUsers } from '../graphql/queries';
import { updateAssignedDevices } from '../graphql/mutations';
//console.log(updateAssignedDevices);
class ListAssigned extends Component {
  state = { ListAssignedDevices: [] }
  async componentDidMount() {
    try {
       let filter = {
        returnStatus: {
            eq: false
        }
      };
      const apiData = await API.graphql(graphqlOperation(listAssignedDevicess,{filter:filter}))
      const listAssignedDevices = apiData.data.listAssignedDevicess.items
     // console.log(listAssignedDevices);
      for (var i = listAssignedDevices.length - 1; i >= 0; i--) {
        var mppmailAddressid = listAssignedDevices[i].mppmailAddress;
        var deviceid = listAssignedDevices[i].device;

        const apiData1 = await API.graphql(graphqlOperation(getDevices, {id:deviceid}));
        const getDevicedetails = apiData1.data.getDevices
        listAssignedDevices[i].itemName = getDevicedetails.itemName;
        listAssignedDevices[i].itemDetails = getDevicedetails.itemDetails;

        const apiData2 = await API.graphql(graphqlOperation(getUsers, {id:mppmailAddressid}));
        const getUsersdetails = apiData2.data.getUsers
        listAssignedDevices[i].mppmailAddr = getUsersdetails.mppmailAddress;
        //console.log(listAssignedDevices[i]);

       /* await API.graphql(graphqlOperation(getDevices,{id:deviceid})).then((devics)=>{
          console.log('devices details are',devics.data.getDevices);
        })*/
      }      
      this.setState({ listAssignedDevices })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  async returnAssigned( Id,divId ) { 
    var del=window.confirm("Are you sure want to return the device?");
    if (del===true){
      try{
        const updatevalue = { returnStatus:true,id:Id};
        await API.graphql(graphqlOperation(updateAssignedDevices, {input:updatevalue}));
        console.log("Successful");
        document.getElementById(divId).style.display = "none";
      } catch (err) {
        console.log('error: ',err);
      }
    }
  }
  render(){
    return (
     <div className="content-wrapper">    
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">List of Assigned Devices</h3>
                  </div>
                  <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                      <thead>
                      <tr>
                        <th>Assignee Mail address</th>
                        <th>Assigned Device-Details</th>
                        <th>Assigned Date</th>
                        <th>Number of Items</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.listAssignedDevices && this.state.listAssignedDevices.map((assigned, i) => (
                          <tr key={"assigned"+i} id={"assigned"+i} >
                            <td>{assigned.mppmailAddr}</td>
                            <td>{assigned.itemName}-{assigned.itemDetails}</td>
                            <td>{assigned.assigneddate}</td>
                            <td>{assigned.numberofItems}</td>
                            <td colSpan={2}>
                            <button type="button" className="btn btn-danger" onClick={() => this.returnAssigned(assigned.id,"assigned"+i)}>Return</button>
                            </td>
                          </tr>
                        ))
                      }
                      </tbody>
                      <tfoot>
                      <tr>            
                        <th>Assignee Mail address</th>
                        <th>Assigned Device-Details</th>
                        <th>Assigned Date</th>
                        <th>Number of Items</th>
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
export default ListAssigned;