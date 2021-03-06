import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import * as API from '../api/API';
import ReactDOM from 'react-dom';

class CompanyHome extends Component {
  state={
    name:'',location:'',id:'',
    message:'',username:'',password:'',newleaving:'',
    message1:'',newprofileid:'',newemployeed:'',showForm:false,
    allHistory:[], candHistory:[]
  };



addJobProfile = (x) => {
  var z={
  "$class": "org.acme.workvalid.JobProfile",
  "jobId": x.candidateid+"."+this.props.user+Math.floor((Math.random()*20)),
  "role": x.role,
  "skillSet": x.skills,
  "joiningDate": x.joining,
  "leavingDate": "N/A",
  "currEmployment": "Yes",
  "candidate": x.candidateid,
  "company": this.props.user,
  "companyName": x.companyname
};
API.newjob(z)
    .then((output) => {
        console.log("OUTPUT: "+output.CompanyName);
        this.setState({message:'Company added.'});
        /*ReactDOM.findDOMNode(this.refs.ref1).value = "";
        ReactDOM.findDOMNode(this.refs.ref2).value = "";
        ReactDOM.findDOMNode(this.refs.ref3).value = "";
        ReactDOM.findDOMNode(this.refs.ref4).value = "";
        ReactDOM.findDOMNode(this.refs.ref5).value = "";*/
    });
};

viewCandidateCompanyHistory = (x) => {
  var z={
    candidateID : x.candidateid
  };
  API.viewJobHistory(z)
      .then((output) => {
          console.log("OUTPUT: "+output.CompanyName);
          this.setState({message:'View Candidate History'});
          ReactDOM.findDOMNode(this.refs.ref6).value = "";
          var temp=[];
          for(var i=0;i<output.length;i++)
          {
          temp=this.state.candHistory.concat(output[i]);
          this.setState({candHistory:temp});
          }
      });
};

updateCompanyHistory = (x) => {
  var z={
    candidateID : x.candidateid,
    companyId : this.props.user
  };
  API.updateCompanyHistory(z)
      .then((output) => {
          console.log("OUTPUT: "+output[0].jobId);
          this.setState({message:'View Candidate History'});
          ReactDOM.findDOMNode(this.refs.ref7).value = "";
          var temp=[];
          this.state.showForm=true;
          for(var i=0;i<output.length;i++)
          {
          temp=this.state.allHistory.concat(output[i]);
          this.setState({allHistory:temp});
          }

      });


};

updatedData=(d)=>{
  var z={
  "$class": "org.acme.workvalid.ChangeEmployment",
  "currEmployment": d.newemployeed,
  "leavingDate": d.newleaving,
  "ProfileValue": d.newprofileid,
  "transactionId": "",
  "timestamp": Date.now()
};
  API.updateJobProfile(z)
      .then((output) => {
          console.log("OUTPUT: ");
          this.setState({message:'View Candidate History'});
          ReactDOM.findDOMNode(this.refs.ref8).value = "";
          ReactDOM.findDOMNode(this.refs.ref9).value = "";
          ReactDOM.findDOMNode(this.refs.ref10).value = "";
      });
};

    render() {
        return (
          <div className="w3-container w3-panel">
          <button type="button" style={{color:"#F78536",background:"white"}} className="btn btn-primary" data-toggle="modal" data-target="#newModal">Add Job Profile</button>



          <div className="modal fade" id="newModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <button type="button" ref="closeLogin" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                      <h3>Add Job Profile</h3>
                      <form>
                      <div className="form-group row">
                      <div className="col-sm-2 col-md-2 col-lg-2">Role:</div>
                       <div className="col-sm-10 col-md-10 col-lg-10">
                       <input type="text" ref="ref1" onChange={(event)=>{
                                                    this.setState({role: event.target.value});}} /></div>
                      </div>

                      <div className="form-group row">
                      <div className="col-sm-2 col-md-2 col-lg-2">Skills:</div>
                       <div className="col-sm-10 col-md-10 col-lg-10">
                       <input type="text" ref="ref2" onChange={(event)=>{
                                                    this.setState({skills: event.target.value});}} /></div>
                      </div>

                      <div className="form-group row">
                      <div className="col-sm-2 col-md-2 col-lg-2">Joining Date:</div>
                       <div className="col-sm-10 col-md-10 col-lg-10">
                       <input type="text" ref="ref3" onChange={(event)=>{
                                                    this.setState({joining: event.target.value});}} /></div>
                      </div>

                      <div className="form-group row">
                      <div className="col-sm-2 col-md-2 col-lg-2">Candidate:</div>
                       <div className="col-sm-10 col-md-10 col-lg-10">
                       <input type="text" ref="ref4" onChange={(event)=>{
                                                    this.setState({candidateid: event.target.value});}} /></div>
                      </div>

                      <div className="form-group row">
                      <div className="col-sm-2 col-md-2 col-lg-2">Company:</div>
                       <div className="col-sm-10 col-md-10 col-lg-10">
                       <input type="text" ref="ref5" onChange={(event)=>{
                                                    this.setState({companyname: event.target.value});}} /></div>
                      </div>

                      <div className="form-group row">
                      <div className="col-sm-4 col-md-4 col-lg-4">
                      <button type="button" className="w3-button w3-dark-grey" onClick={() => this.addJobProfile(this.state)}>Submit</button>
                      </div>
                      </div>
                      </form>
                      <font color="red">{this.state.message1}</font>
                      </div>
                  </div>
              </div>
          </div>






<div class="container">
<div class="col col-lg-6">
<br/>
  <h3>View Candidate History</h3>
  <form>
  <div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2">Enter Candidate ID:</div>
  <div className="col-sm-2 col-md-2 col-lg-2"><input type="text" ref="ref6" onChange={(event)=>{this.setState({candidateid: event.target.value});}} /></div>
</div>
<div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2"><button type="button" className="w3-button w3-dark-grey" onClick={() => this.viewCandidateCompanyHistory(this.state)}>Submit</button></div>
    </div>
    </form>

    {this.state.candHistory.map(f => {
           return ( <div  key={Math.random()}>
           <div >
           <ul className="w3-ul w3-border w3-right-blue">
                  <li>JOB ID: {f.jobId}</li>
                  <li>ROLE: {f.role}</li>
                  <li>SKILLS: {f.skillSet}</li>
                  <li>JOIN DATE: {f.joiningDate}</li>
                  <li>LEAVEING DATE: {f.leavingDate}</li>
                  <li>EMPLOYMENT: {f.currEmployment}</li></ul>
                    </div>
                    </div>
                  )
})
}
</div>
<div class="col col-lg-6">
    <h3>Modify Candidate History</h3>
    <form>
    <div className="form-group row">
    <div className="col-sm-2 col-md-2 col-lg-2">Enter Candidate ID:</div>
    <div className="col-sm-2 col-md-2 col-lg-2"><input type="text" ref="ref7" onChange={(event)=>{this.setState({candidateid: event.target.value});}} /></div>
  </div>
  <div className="form-group row">
    <div className="col-sm-2 col-md-2 col-lg-2"><button type="button" className="w3-button w3-dark-grey" onClick={() => this.updateCompanyHistory(this.state)}>Submit</button></div>
      </div>
      </form>
<div>
      {this.state.allHistory.map(f => {
             return ( <div  key={Math.random()}>
             <div >
             <ul className="w3-ul w3-border w3-right-blue">
                    <li>JOB ID: {f.jobId}</li>
                    <li>ROLE: {f.role}</li>
                    <li>SKILLS: {f.skillSet}</li>
                    <li>JOIN DATE: {f.joiningDate}</li>
                    <li>LEAVEING DATE: {f.leavingDate}</li>
                    <li>EMPLOYMENT: {f.currEmployment}</li></ul>
                      </div>
                      </div>
                    )
  })
  }
</div>
</div>
</div>
{this.state.showForm ? (
  <div>
<form>
  <div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2">Job ID:</div>
  <div className="col-sm-2 col-md-2 col-lg-2"><input type="text" ref="id" onChange={(event)=>{this.setState({newprofileid: event.target.value});}} /></div>
</div>
<div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2">Employeed Status:</div>
<div className="col-sm-2 col-md-2 col-lg-2"><input type="text" ref="id" onChange={(event)=>{this.setState({newemployeed: event.target.value});}} /></div>
</div>
<div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2">Leaving Date:</div>
<div className="col-sm-2 col-md-2 col-lg-2"><input type="text" ref="id" onChange={(event)=>{this.setState({newleaving: event.target.value});}} /></div>
</div>
<div className="form-group row">
  <div className="col-sm-2 col-md-2 col-lg-2"><button type="button" className="w3-button w3-dark-grey" onClick={() => this.updatedData(this.state)}>Submit</button></div>
</div>
</form>
  </div>
) : (null)}


         </div>
        );
    }
}

export default CompanyHome;
