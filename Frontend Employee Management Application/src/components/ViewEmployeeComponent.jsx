import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,//syntax for call id
            employee: {}// state obj has emp property and we just assign the responce data to employee property using setstate method. 
        }
    }

    componentDidMount(){
        // to make rstapi call then is to handle the responce
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }
    cancel(){
        this.props.history.push('/employees');
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Employee First Name: </label>
                            <div> { this.state.employee.firstName }</div> {//acessing obj fields
                            }
                        </div>
                        <div className = "row">
                            <label> Employee Last Name: </label>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Email ID: </label>
                            <div> { this.state.employee.emailId }
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-secondary" onClick={this.cancel.bind(this)} style={{marginLeft: "5px"}}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
