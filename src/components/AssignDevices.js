import React,{Component} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listDevicess,listUserss,listAssignedDevicess } from '../graphql/queries';
import { createAssignedDevices } from '../graphql/mutations';

class AssignDevices extends Component {
  state = { listDevices: [],listUsers: [] }
  constructor(){
    super();
    this.state = {listnumberofItems:0,mppmailAddress: '',device: '',assigneddate: '',numberofItems: 0,returnStatus : '',loading: false};
  }
  onChange = (e) => {
    let Message = document.querySelector('.msg');
    Message.style.display = 'none';
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name === "numberofItems"){
      var index1 = e.target.selectedIndex;
      var optionElement1 = e.target.childNodes[index1];
      var noofDev =  optionElement1.getAttribute('value');
      console.log(noofDev);      
      this.setState({ numberofItems:noofDev });
    }
    if(e.target.name === "device"){
      console.log("listDevices");
     // console.log(this.state.listDevices);
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
     // var datanoofdev =  optionElement.getAttribute('datanoofdev');
      var datanumberofitems =  optionElement.getAttribute('datanumberofitems');
      var devicesid =  optionElement.getAttribute('devicesid');
      //console.log(this.state.listnumberofItems);
      this.listnumberofItems(devicesid,datanumberofitems);      
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.saveAssignedDevices();
     setTimeout(() => {
        this.setState({loading: false})
      },2000)
  }
  listnumberofItems = async (devicId,datanumberofitems) => {   
          let sum = 0,option ='',select='',totaloption = 0;
          let filter = {device: {eq: devicId},returnStatus: {eq: false}};
          const apiData1 = await API.graphql(graphqlOperation(listAssignedDevicess,{filter: filter}))
          const listAssignedDevs = apiData1.data.listAssignedDevicess.items
          console.log(devicId);
          console.log("data===");
          if(listAssignedDevs.length > 0 ){
              for (var k = 0;k < listAssignedDevs.length ; k++) {
                  sum += listAssignedDevs[k].numberofItems;
                }
             // console.log(sum);
              this.setState({ listnumberofItems:sum });             
          }else{
              this.setState({ listnumberofItems:0 });   
          }
          select = document.getElementById("numberofItems");
          var length = select.options.length;
          for (var l = length-1; l >= 0; l--) {
            select.options[l] = null;
          }
          totaloption = datanumberofitems - sum;
          //totaloption = datanumberofitems - this.state.listAssignedDevs;
          console.log(totaloption);
          console.log(datanumberofitems);
          if(totaloption === 0){
              option = document.createElement("option");
              option.text = "No devices available";
              option.value = 0;
              select.appendChild(option);              
          }else{
            for (var m = 0; m <= totaloption; m++) {
              option = document.createElement("option");
              option.text = m;
              option.value = m;
              select.appendChild(option);
            }       
          }
          console.log(select);
  }
  async componentDidMount() {
    try {
      const apiData1 = await API.graphql(graphqlOperation(listDevicess))
      const listDevices = apiData1.data.listDevicess.items
      for (var i = listDevices.length - 1; i >= 0; i--) {
        var deviceid = listDevices[i].id;        
        this.setState({ numberofItems:listDevices[i].numberofItems });
        var nosDevices = this.state.numberofItems;
        try{          
          console.log(listDevices);
          let filter = {device: {eq: deviceid},returnStatus: {eq: false}};
          const apiData1 = await API.graphql(graphqlOperation(listAssignedDevicess,{filter: filter}))
          const listAssignedDevices = apiData1.data.listAssignedDevicess.items
          if(listAssignedDevices.length > 0){
            var sum=0;
            for (var j = listAssignedDevices.length - 1; j >= 0; j--) {
              sum += listAssignedDevices[j].numberofItems;
            }
            if(nosDevices === sum ){
              listDevices[i].avail = 0;
            }else{
              listDevices[i].avail = nosDevices - sum;
            }
          }else{            
            listDevices[i].avail = nosDevices;
          }       
          console.log(listDevices);                             
        }catch(err){
          console.log('error:',err);
        }
      }
      this.setState({ listDevices });     
      const apiData2 = await API.graphql(graphqlOperation(listUserss))
      const listUsers = apiData2.data.listUserss.items
      this.setState({ listUsers })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  saveAssignedDevices = async () => {   
    const {mppmailAddress,device,assigneddate,numberofItems,returnStatus } = this.state;   
    if (mppmailAddress === '' || device === '' || assigneddate === '') {
      this.setState({ mppmailAddress: '',device: '',assigneddate: '' })
      return
    }
    try {
      if(this.state.numberofItems > 0){
        const { mppmailAddress,device,assigneddate,numberofItems,returnStatus } = this.state;
        const assigneddevicedetails = { mppmailAddress,device,assigneddate,numberofItems,returnStatus }
        console.log("assigneddevicedetails====");
        console.log(assigneddevicedetails);
        this.setState({ mppmailAddress: '',device: '',assigneddate: '',loading: true,numberofItems:0 })
        await API.graphql(graphqlOperation(createAssignedDevices, {input: assigneddevicedetails}))
        let successMessage = document.querySelector('.success-message');
        successMessage.innerHTML = 'Successfully created new record!';
        successMessage.style.display = 'block';
        document.getElementById('mppmailAddress').value = 0;
        document.getElementById('device').value = 0;
        document.getElementById('assigneddate').value = "";
        document.getElementById('numberofItems').value = 0;
        console.log('Successfully created new record!');
      }else{        
        let successMessage = document.querySelector('.danger-message');
        successMessage.innerHTML = 'Sorry...No devices available';
        successMessage.style.display = 'block';
      }
    }
    catch (err) {
      let successMessage = document.querySelector('.danger-message');
      successMessage.innerHTML = err;
      successMessage.style.display = 'block';
      console.log('error: ', err);
    }
  }
  render(){
    //https://www.youtube.com/watch?v=kxuKS_MIFCE
    let loading = this.state.loading ? <div style={{'color':'green','fontWeight':'bold','float':'left','fontSize':'30px'}}>Loading ...</div> : <div></div>;
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
                    <div className="msg success-message text-success" style={{'float':'left','fontWeight':'bold'}}><label></label></div>
                    <div className="msg danger-message text-danger" style={{'float':'left','fontWeight':'bold'}}><label></label></div>
                  </div>
                  {loading}
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
                            <option key={devices.id} devicesid={devices.id} datanumberofitems={devices.numberofItems} datanoofdev={devices.avail} value={devices.id}>{devices.itemName}-{devices.itemDetails}</option>
                          ))
                          }
                        </select>
                      </div>
                      <div className="form-group">                    
                        <div className="input-group date" id="assigningdate" data-target-input="nearest">
                          <input type="text" required id="assigneddate" onBlur={this.onChange} onChange={this.onChange} onFocus={this.onChange} name="assigneddate" placeholder="Enter Assigning Date" className="form-control datetimepicker-input" data-target="#assigningdate"/>
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