import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import * as API from '../api/API';
import * as APInode from '../api/APInode';
import ReactDOM from 'react-dom';

class EducationInst extends Component {
  state={
    name:"",location:"",id:'',
    message:'',message1:'',
    listall:[],username:'',password:''
  };

  addEdu = (x) => {
    var z={
  "$class": "org.acme.workvalid.EduInstitution",
  "institutionId": x.name+"."+x.location,
  "institutionName": x.name,
  "institutionLocation": x.location
};
  API.newedu(z)
      .then((output) => {
          //console.log("OUTPUT: "+output.CompanyName);
          this.setState({message:'Edu institute added.'});
          ReactDOM.findDOMNode(this.refs.nm).value = "";
          ReactDOM.findDOMNode(this.refs.loc).value = "";
      });
  };


  addRecord = (x) => {
    var z={
  "$class": "org.acme.workvalid.EducationRecord",
  "eduId": x.instid+"."+x.candidateid,
  "institutionId": x.instid,
  "EduLevel": x.level,
  "graduateDate": "null",
  "grade": "null",
  "candidate": x.candidateid
};
  API.addEduReport(z)
      .then((output) => {
          //console.log("OUTPUT: "+output.CompanyName);
          this.setState({message:'Edu record added.'});
          ReactDOM.findDOMNode(this.refs.nm).value = "";
          ReactDOM.findDOMNode(this.refs.loc).value = "";
      });
  };


    render() {
        return (
          <div className="w3-container w3-panel">
    <h3>Sign up - New Education Institute</h3>
  <form>
  <div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2">Name:</div>
   <div className="col-sm-10 col-md-10 col-lg-10">
   <input type="text" ref="nm" onChange={(event)=>{
                                this.setState({name: event.target.value});}} /></div>
  </div>

  <div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2">Location:</div>
   <div className="col-sm-10 col-md-10 col-lg-10">
   <input type="text" ref="loc" onChange={(event)=>{
                                this.setState({location: event.target.value});}} /></div>
  </div>

  <div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2">Password:</div>
   <div className="col-sm-10 col-md-10 col-lg-10">
   <input type="password" ref="ln" onChange={(event)=>{
                                this.setState({password: event.target.value});}} /></div>
  </div>

  <div className="form-group row">
  <div className="col-sm-4 col-md-4 col-lg-4">
  <button type="button" className="w3-button w3-dark-grey" onClick={() => this.addEdu(this.state)}>Submit</button>
  </div>
  </div>
  </form>
<font color="red">{this.state.message}</font>
</div>

        );
    }
}

export default EducationInst;
