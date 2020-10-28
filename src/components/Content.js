import React from 'react';
import { Switch,Route} from 'react-router-dom';
import AddDevices from './AddDevices';
import ListDevices from './ListDevices';
import AddUsers from './AddUsers';
import ListUsers from './ListUsers';
import AssignDevices from './AssignDevices';
import ListAssigned from './ListAssigned';

function Content() {
  return (
     <Switch>
      <Route exact path="/" component={ListDevices}/>
      <Route path="/addDevices" component={AddDevices}/>
      <Route path="/listDevices" component={ListDevices}/>
      <Route path="/addUsers" component={AddUsers}/>
      <Route path="/listUsers" component={ListUsers}/>
      <Route path="/assignDevices" component={AssignDevices}/>
      <Route path="/listAssigned" component={ListAssigned}/>
     </Switch>
  );
}

export default Content;