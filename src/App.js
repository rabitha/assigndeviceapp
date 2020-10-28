import React,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Adminlogin from './components/AdminLogin';
class App extends Component {   
    constructor(props) {
      super(props)
     /* if (props.user) {
        //alert("You can't login if you are logged in!")
        props.history.push('/');
      }*/
      console.log(props.history);
    }
    render(){
     // console.log(localStorage.getItem('adminStatus'));   
      //console.log("admin logged in====");
      const isLoggedIn = localStorage.getItem('adminStatus');
      const adminid = localStorage.getItem('adminid');
      //console.log(isLoggedIn);
      let components;
      if (isLoggedIn === "no" && adminid !== null ) {
       // components = <Adminlogin/>;
        return (
          <div className="Wrapper">
            <BrowserRouter>
              <Adminlogin/>
            </BrowserRouter>
          </div>
    );
        //components = <Redirect to="/Adminlogin" />;
      }else{
       // components = [<Header key='1'/>,<Sidebar key='2'/>,<Content key='3'/>];       
        return (
          <div className="Wrapper">
              <BrowserRouter>
               <Header key='1'/>
               <Sidebar key='2'/>
               <Content key='3'/>
              </BrowserRouter>
            </div>
        );
      }
      /*return (
          <div className="Wrapper">
              <BrowserRouter>
                {components}
              </BrowserRouter>
            </div>
        );*/
  }
}

export default App;