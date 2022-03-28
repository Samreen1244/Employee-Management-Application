import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = { // inside state object we created employee arrays which stores values
            // basically it make a restapi call andwe will store restapi call
            // responce into the emps obj and we iterate emp's obj and display values in table
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);// bind method:binding an event or method in the constructer
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
            return "Data deleted successfully";
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
        
    }

    componentDidMount(){//it'll imediatlly invoke and it is best place to axios call restapi call when components mounted
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});// set the data to the components
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    
    }

    render() {
        return (
            
            <div>
                 <h2 className="text-center">Employees List</h2>
                
                 <div className = "row">

                <button className="btn btn-dark" onClick={this.addEmployee}> Add Employee</button>
                 </div>
            
                 <br></br>
                
                 {/*<div className= " img "> it isfor table color */} 
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-primary">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-dark">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                           
                        </table>
                        </div> /*</div>*/
            
        )
    }
}

export default ListEmployeeComponent
