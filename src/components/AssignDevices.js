import React,{Component} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listDevicess,listUserss } from '../graphql/queries';
import { createAssignedDevices } from '../graphql/mutations';

class AssignDevices extends Component {
  state = { listDevices: [],listUsers: [] }
  constructor(){
    super();
    this.state = {mppmailAddress: '',device: '',assigneddate: '',numberofItems: '',returnStatus : ''};
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name === "device"){
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index]
      var datanoofdev =  optionElement.getAttribute('datanoofdev');
     // const { numberofItems } = datanoofdev;
      //this.setState({ numberofItems });
      /*console.log("on change no:of device=>");
      console.log(datanoofdev);*/
      var option ='',select='';
      select = document.getElementById("numberofItems");
      var length = select.options.length;
      for (var i = length-1; i >= 0; i--) {
        select.options[i] = null;
      }
      for (var j = 1; j <= datanoofdev; j++) {
        option = document.createElement("option");
        option.text = j;
        option.value = j;
        select.appendChild(option);
      }
     // console.log(numberofItems);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.saveAssignedDevices();
  }
  async componentDidMount() {
    try {
      const apiData1 = await API.graphql(graphqlOperation(listDevicess))
      const listDevices = apiData1.data.listDevicess.items
      this.setState({ listDevices })
      const apiData2 = await API.graphql(graphqlOperation(listUserss))
      const listUsers = apiData2.data.listUserss.items
        this.setState({ listUsers })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  saveAssignedDevices = async () => {      
    const {mppmailAddress,device,assigneddate,numberofItems,returnStatus } = this.state;
    if (mppmailAddress === '' || device === '' || assigneddate === '' || numberofItems === '') {
      this.setState({ mppmailAddress: '',device: '',assigneddate: '',numberofItems: '' })
      return
    }
    try {
      const assigneddevicedetails = { mppmailAddress,device,assigneddate,numberofItems,returnStatus }
      this.setState({ mppmailAddress: '',device: '',assigneddate: '',numberofItems: '' })
      await API.graphql(graphqlOperation(createAssignedDevices, {input: assigneddevicedetails}))
      let successMessage = document.querySelector('.success-message');
      successMessage.innerHTML = 'Successfully created new record!';
      successMessage.style.display = 'block';
      document.getElementById('mppmailAddress').value = 0;
      document.getElementById('device').value = 0;
      document.getElementById('assigneddate').value = "";
      document.getElementById('numberofItems').value = 0;
      console.log('Successfully created new record!');
    }
    catch (err) {
      let successMessage = document.querySelector('.danger-message');
      successMessage.innerHTML = err;
      console.log('error: ', err);
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
                    <h3 className="card-title">Assigning Devices form</h3>
                  </div>
                  <div className="col-md-6">
                    <div className="success-message text-success" style={{'float':'right'}}><label></label></div>
                    <div className="danger-message text-danger" style={{'float':'right'}}><label></label></div>
                  </div>
                  <form id="assignDeviceform" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="returnStatus" id="returnStatus" value="false"/>
                    <div className="card-body">
                      <div className="form-group">
                        <select className="form-control" required name="mppmailAddress" id="mppmailAddress" onChange={this.onChange}>
                          <option key="x0" value="0">Select a mail address</option>                    
                          {
                          this.state.listUsers && this.state.listUsers.map((users, i) => (
                            <option key={users.id} value={users.id}>{users.mppmailAddress}</option>
                          ))
                          }
                        </select>
                      </div>
                      <div className="form-group">
                        <select className="form-control" required name="device" id="device" onChange={this.onChange}>
                          <option key="x00" value="0">Select a device</option>
                          {
                          this.state.listDevices && this.state.listDevices.map((devices, i) => (
                            <option key={devices.id} datanoofdev={devices.numberofItems} value={devices.id}>{devices.itemName}-{devices.itemDetails}</option>
                          ))
                          }
                        </select>
                      </div>
                      <div className="form-group">                    
                        <div className="input-group date" id="assigningdate" data-target-input="nearest">
                          <input type="text" required id="assigneddate" onChange={this.onChange} onFocus={this.onChange} name="assigneddate" placeholder="Enter Assigning Date" className="form-control datetimepicker-input" data-target="#assigningdate"/>
                          <div className="input-group-append" data-target="#assigningdate" data-toggle="datetimepicker">
                            <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <select className="form-control" required name="numberofItems" id="numberofItems" onChange={this.onChange}>
                          <option key="0" value="0">Select number of devices</option>
                        </select>
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

export default AssignDevices;