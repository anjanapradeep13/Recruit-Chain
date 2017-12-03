import React, { Component } from 'react';
import * as API from '../api/API';
import ReactDOM from 'react-dom';
import { Route, Link,Switch } from 'react-router-dom';
import Candidate from './Candidate';
import Company from './Company';
import EducationInst from './EducationInst';
import Testlab from './Testlab';
import Policedept from './Policedept';
import Certification from './Certification';

import CompanyHome from './CompanyHome';
import CandidateHome from './CandidateHome';
import TestlabHome from './TestlabHome';
import EduHome from './EduInstHome';
import PolicedeptHome from './PolicedeptHome';
import CertificationHome from './CertificationHome';

import * as APInode from '../api/APInode';
import 'w3-css/w3.css';
import '../styles.css';

class Home extends Component {

state={visible:false,visible1:false,usertype:'',isLogged:true}

checkUser = (x) => {
  var u={username:x.username,password:x.password};
  this.setState({isLogged:true});
APInode.checkUser(u)
    .then((output) => {
      if(output.status=="False"){
        this.setState({isLogged:false, message1:"Login failed"});
        console.log("Failed");
      }
      else {
        console.log("Success");
        this.setState({isLogged:true, usertype:output.type});
      }
    });
};

  showDiv1() {
    this.setState({visible: !this.state.visible,visible1:false});
  }

  showDiv2() {
    this.setState({visible1: !this.state.visible1,visible:false});
  }
  render() {
    return (
      <div>

            <div className="btitle col-sm-12 col-md-12 col-lg-12">
            <h1 className="w3-text-white" style={{margin:"25px", fontWeight:"bold"}}>Employee Verification</h1>
            </div>
            <br/><br/><br/><br/><br/>

            <button onClick={() => this.showDiv1()}>SIGN IN</button>
            <button onClick={() => this.showDiv2()}>SIGN UP</button>

{this.state.visible ?
(this.state.isLogged ? (<form>
<div className="form-group row">
<div className="col-sm-2 col-md-2 col-lg-2">Username:</div>
 <div className="col-sm-10 col-md-10 col-lg-10">
 <input type="text" ref="fn" onChange={(event)=>{
                              this.setState({username: event.target.value});}} /></div></div>
<div className="form-group row">
<div className="col-sm-2 col-md-2 col-lg-2">Password:</div>
 <div className="col-sm-10 col-md-10 col-lg-10">
 <input type="password" ref="ln" onChange={(event)=>{
                              this.setState({password: event.target.value});}} /></div></div>
<div className="form-group row">
<div className="col-sm-4 col-md-4 col-lg-4">
<button type="button" className="w3-button w3-dark-grey" onClick={() => this.checkUser(this.state)}>Submit</button>
</div>
</div>
</form>):(this.state.usertype===1 ?
  (<CompanyHome />):((this.state.usertype===2 ?
    (<EduHome />):((this.state.usertype===3 ?
      (<TestlabHome />):((this.state.usertype===4 ?
        (<PolicedeptHome />):((this.state.usertype===5 ?
          (<CertificationHome />):((this.state.usertype===6 ?
            (<CandidateHome />):(null))))))))))))): null}

{this.state.visible1 ?
(
  <div calssName="w3-container w3-panel">
  <div className="row">
  <div className="col-sm-3 col-md-3 col-lg-3"><Link to='/'></Link></div>
  <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/company' className="links">Company</Link></div>
  <div className="col-sm-2 col-md-2 col-lg-2"><Link to='/eduinstitute' className="links">Education Institute</Link></div>
  <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/testlab' className="links">Test Lab</Link></div>
  <div className="col-sm-1 col-md-1 col-lg-1">  <Link to='/policedept' className="links">Police Dept</Link></div>
  <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/certification' className="links">Certification</Link></div>
  <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/candidate' className="links">Candidate</Link></div>
  <div className="col-sm-1 col-md-1 col-lg-1"></div>
    </div>

  <Switch>
  <Route exact path="/home" component={Home}/>
  <Route exact path="/company" component={() => <Company/>}/>
  <Route exact path="/eduinstitute" component={() => <EducationInst/>}/>
  <Route exact path="/testlab" component={() => <Testlab/>}/>
  <Route exact path="/policedept" component={() => <Policedept/>}/>
  <Route exact path="/certification" component={() => <Certification/>}/>
  <Route exact path="/candidate" component={() => <Candidate/>}/>
  </Switch>
</div>): null }


      </div>
    );
  }
}


export default Home;
