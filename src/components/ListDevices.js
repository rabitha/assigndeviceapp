import React, { Component }  from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listDevicess,listAssignedDevicess } from '../graphql/queries';
import { deleteDevices } from '../graphql/mutations';
//console.log(listDevicess);
class ListDevices extends Component {
//  state = { listDevices: [] }
  constructor(props){
      super(props);      
      this.state = { loading: true, listDevices: [] }
    }
  async componentDidMount() {
      setTimeout(() => {
        this.setState({loading: false})
      },2000)
    try {
      const apiData = await API.graphql(graphqlOperation(listDevicess))
      const listDevices = apiData.data.listDevicess.items
      for (var i = listDevices.length - 1; i >= 0; i--) {
        var deviceid = listDevices[i].id;
        try{          
          //console.log(deviceid)
          let filter = {device: {eq: deviceid},returnStatus: {eq: false}};
          const apiData1 = await API.graphql(graphqlOperation(listAssignedDevicess,{filter: filter}))
          const listAssignedDevices = apiData1.data.listAssignedDevicess.items
          //console.log(listAssignedDevices);
          if(listAssignedDevices.length > 0){
            var sum=0;
            for (var j = listAssignedDevices.length - 1; j >= 0; j--) {
              sum += listAssignedDevices[j].numberofItems;
            }
           // console.log(sum);
            listDevices[i].avail = sum;
          }else{            
            listDevices[i].avail = 0;
          }       
          //console.log(listDevices);  
          this.setState({ listDevices })                             
        }catch(err){
          console.log('error:',err);
        }
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }
  async del( devId,divId,availStatus) {
    if(availStatus === 0){
        console.log(availStatus);
        var del=window.confirm("Are you sure want to delete this record?");
    if (del===true && availStatus === 0){
      try {
       const deletedevicedetails = { 'id':devId }
        await API.graphql(graphqlOperation(deleteDevices, { input: deletedevicedetails}));
        let successMessage = document.querySelector('.success-message');
        successMessage.innerHTML = 'Device details deleted!';
        document.getElementById(divId).style.display = "none";
        } 
        catch (err) {
        let successMessage = document.querySelector('.danger-message');
        successMessage.innerHTML = 'Failed!';
        console.log('error: ', err);
      }
    }    
    }else{
        let successMessage = document.querySelector('.danger-message');
        successMessage.innerHTML = 'Unable to delete the row';
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
                    <h3 className="card-title">List devices</h3>
                  </div>
                <div className="col-md-6">
                  <div className="success-message text-success" style={{'float':'right'}}><label></label></div>
                  <div className="danger-message text-danger" style={{'float':'right'}}><label></label></div>
                </div>
                  <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                      <thead>
                      <tr>
                        <th>Item name</th>
                        <th>Buy date</th>
                        <th>Item Details</th>
                        <th>Total number of Items</th>
                        <th>Assigned no:of items</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>{loading}
                      {
                        this.state.listDevices.map((devices, i) => (
                          <tr key={"devices"+i} id={devices.itemName+i}>
                            <td>{devices.itemName}</td>
                            <td>{devices.buydate}</td>
                            <td>{devices.itemDetails}</td>
                            <td>{devices.numberofItems}</td>
                            <td>{devices.avail}</td>
                            <td colSpan={2}>
                            <button type="button" className="btn btn-danger" onClick={() => this.del(devices.id,devices.itemName+i,devices.avail)}>delete</button>
                            </td>
                          </tr>
                        ))
                      }
                      </tbody>
                      <tfoot>
                      <tr>               
                        <th>Item name</th>
                        <th>Buy date</th>
                        <th>Item Details</th>
                        <th>Total number of Items</th>
                        <th>Assigned no:of items</th>
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
export default ListDevices;