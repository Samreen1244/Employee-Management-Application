import React , { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class LoginEmployeeComponent extends Component {

        constructor(props) {
            super(props)
    
            this.state = {
                id: this.props.match.params.id,
                firstName: '',
                emailId: ''
            }
            this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
            this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
            this.loginEmployee = this.loginEmployee.bind(this);
        }
    
        componentDidMount(){
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.State({firstName: employee.firstName,
                    emailId : employee.emailId
                });
            });
        }
    
        LoginEmployee = (e) => {
            e.preventDefault();
            let employee = {firstName: this.state.firstName, emailId: this.state.emailId};
            console.log('employee => ' + JSON.stringify(employee));
            console.log('id => ' + JSON.stringify(this.state.id));
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
        changeFirstNameHandler= (event) => {
            this.setState({firstName: event.target.value});
        }
    
        changeEmailHandler= (event) => {
            this.setState({emailId: event.target.value});
        }
    
        cancel(){
            this.props.history.push('/employees');
        }
    
        render() {
            return (
                <div>
                    <br></br>
                       <div className = "container">
                            <div className = "row">
                                <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    <h3 className="text-center">Login Employee</h3>
                                    <div className = "card-body">
                                        <form>
                                            <div className = "form-group">
                                                <label> First Name: </label>
                                                <input placeholder="First Name" name="firstName" className="form-control" 
                                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                            </div>
                                            
                                            <div className = "form-group">
                                                <label> Email Id: </label>
                                                <input placeholder="Email Address" name="emailId" className="form-control" 
                                                    value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                            </div>
    
                                            <button className="btn btn-success" onClick={this.loginEmployee}>Save</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
    
                       </div>
                </div>
            )
        }
    }
    

export default LoginEmployeeComponent