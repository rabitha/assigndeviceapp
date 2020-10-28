import React,{ Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createDevices } from '../graphql/mutations';

class AddDevices extends Component {
  constructor(){
    super();
    this.state = {itemName: '',buydate: '',itemDetails: '',numberofItems: ''};
  }
  onChange = (e) => {
    let Message = document.querySelector('.msg');
    Message.style.display = 'none';     
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.createDevices();
  }
  createDevices = async () => {      
    const { itemName,buydate,itemDetails,numberofItems } = this.state;
    if (itemName === '' || buydate === '' || itemDetails === '' || numberofItems === '') {
      this.setState({ itemName: '',buydate: '',itemDetails: '',numberofItems: '' })
      return
    }
    try {
      const devicedetails = { itemName,buydate,itemDetails,numberofItems }
      this.setState({ itemName: '',buydate: '',itemDetails: '',numberofItems: '' })
      await API.graphql(graphqlOperation(createDevices, {input: devicedetails}))
      let successMessage = document.querySelector('.success-message');
      successMessage.innerHTML = 'device details successfully added!';
      successMessage.style.display = 'block';
      document.getElementById('itemName').value = "";
      document.getElementById('buydate').value = "";
      document.getElementById('itemDetails').value = "";
      document.getElementById('numberofItems').value = "";
      console.log('device details successfully added!');
    }
    catch (err) {
      let successMessage = document.querySelector('.danger-message');
      successMessage.innerHTML = "found error";
      console.log('error: ', err);
    }
  }  
  render(){
/*const msgsuccess = {
    backgroundColor: "#28a745",
    padding: "2px",
    color: "#fff",
    marginTop: "10px",
    float:"right",
    display:"none"
  };
 const msgdanger = {    
    backgroundColor: "#dc3545",
    padding: "2px",
    color: "#fff",
    marginTop: "10px",
    float:"right",
    display:"none"
  };*/
    return (
      <div className="content-wrapper">    
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Add Device form</h3>
                  </div>
                  <div className="col-md-12">
                    <div className="msg success-message text-success" style={{'float':'left','fontWeight':'bold'}}><label></label></div>
                    <div className="msg danger-message text-success" style={{'float':'left','fontWeight':'bold'}}><label></label></div>
                  </div>
                  <form id="addDeviceform" onSubmit={this.handleSubmit}>
                    <div className="card-body">
                      <div className="form-group">
                        <input type="text" name="itemName" required onFocus={this.onChange} onChange={this.onChange} className="form-control" id="itemName" placeholder="Enter Item Name" defaultValue={this.state.itemName}/>
                      </div>
                      <div className="form-group">
                        <div className="input-group date" id="reservationdate" data-target-input="nearest">
                          <input type="text" required id="buydate" name="buydate" onFocus={this.onChange} placeholder="Enter Buy Date" className="form-control datetimepicker-input" data-target="#reservationdate" defaultValue={this.state.buydate}/>
                          <div className="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="text" required name="itemDetails" onFocus={this.onChange} onChange={this.onChange} className="form-control" id="itemDetails" placeholder="Enter Item Details" defaultValue={this.state.itemDetails}/>
                      </div>
                      <div className="form-group">
                        <input type="number" required name="numberofItems" onFocus={this.onChange} onChange={this.onChange} className="form-control" id="numberofItems" placeholder="Enter Number of Items" defaultValue={this.state.numberofItems}/>
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
export default AddDevices;