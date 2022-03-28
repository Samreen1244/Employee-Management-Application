import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        //with in a constructor we have state obj 
        this.state = {
            // step 2 it will store the i/p data
            id: this.props.match.params.id,// with help params we get the id
            firstName: '',
            lastName: '',
            emailId: '',
            errors:{}
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            // we have made restapi call and inside EmployeeService we written getEmpById which internally call restapi by using axios
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            });
        }        
    }
    formvalidation = ()=>{
        const {firstName,lastName,emailId} = this.state;
        let isValid = true;
        const errors={};
        //const regex = /^[^/s@]+@[^/s@]+\.[^/s@]{2,3}$/i
    
        if(firstName.trim().length < 4){
            errors.firstNameLength="firstName must be of length 4 or more ";
            isValid=false;
        }
        if(lastName.trim().length < 4){
            errors.lastNameLength="last Name must be of length 4 or more ";
            isValid=false;
        }
        if(emailId.trim().length < 12){
            errors.emailId="InValid Email"
            isValid=false;
        }
        if(!emailId.includes("@")){
            errors.emailId$="Email Id should contain Special Char ";
            isValid=false;
        }
        if(!emailId.includes(".")){
            errors.emailId$="Invalid Email ";
            isValid=false;
        }
        
        this.setState({errors});
        return isValid;
    }
    onSubmit= (e) => {
        e.preventDefault();
        const isValid = this.formvalidation();
       //this.saveOrUpdateEmployee = () => toast('data saved', { position: toast.POSITION.TOP_CENTER });
        
    }
    // when we hit on save button then saveorupdateemp eventhandler get called
    saveOrUpdateEmployee = (e) => {
        
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));
        const isValid = this.formvalidation();

        // step 5
        if(this.state.id === '_add' && isValid){
            EmployeeService.createEmployee(employee).then(res =>{
        this.props.history.push('/employees'); 
            });
            this.saveOrUpdateEmployee = () => toast('data saved', { position: toast.POSITION.TOP_CENTER });   
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');// it will navigate to emp
            });
            
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }
    handleChange= (event) => {
        this.setState({firstName: event.target.value});
        this.setState({lastName: event.target.value});
        this.setState({emailId: event.target.value});
    }
   
    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Save Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    
    render() {
        const{errors} = this.state;
        return (
            <div>
                <br></br>
        
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form onSubmit={this.onSubmit}>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                                
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-primary" disabled= {(!this.state.firstName, !this.state.lastName, !this.state.emailId)} 
                                        onClick={this.saveOrUpdateEmployee}>Save</button>
                                        {Object.keys(errors).map((key)=>{
                                            return <div style={{color:"red"}} key={key} > {errors[key]}
                                             </div>
                                        })}

                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} 
                                        style={{marginLeft: "10px"}}>Cancel</button>
                                    
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
            
        )
    }
}

export default CreateEmployeeComponent
