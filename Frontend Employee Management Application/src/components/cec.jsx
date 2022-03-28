import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import EmployeeService from '../services/EmployeeService';


class cec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstname: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    
  }

  componentDidMount(){

    // step 4
    if(this.state.id === '_add'){
        return
    }else{
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({firstName: employee.firstName
               // lastName: employee.lastName,
                //emailId : employee.emailId
            });
        });
    }        
}
saveOrUpdateEmployee = (values) => {
  values.preventDefault();
  let employee = {firstName: this.state.firstname};
    //lastName: this.state.lastname, emailId: this.state.emailId};
  console.log('employee => ' + JSON.stringify(employee));

  // step 5
  if(this.state.id === '_add'){
      EmployeeService.createEmployee(employee).then(res =>{
          this.props.history.push('/employees');
      });
  }else{
      EmployeeService.updateEmployee(employee, this.state.id).then( res => {
          this.props.history.push('/employees');
      });
  }
}

  validate(values) {
    let errors = {};
    if (!values.firstname) {
      errors.firstname = "Enter afirstname";
    } else if (values.firstname.length < 5) {
      errors.firstname = "Enter atleast 5 Characters in firstname";
    }

    return errors;
  }

  onSubmit(values) {

    let lastname = {
      id: this.state.id,
      firstName: values.firstname,
      targetDate: values.targetDate,
    };

    if (this.state.id === '_add') {
      EmployeeService.createEmployee(lastname).then(() =>
        this.props.history.push("/emplyees")
      );
    } else {
      EmployeeService.updateEmployee(this.state.id, lastname).then(() =>
        this.props.history.push("/employees")
      );
    }

    console.log(values);
  }
  cancel(){
    this.props.history.push('/employees');
}
  render() {
    let { firstname, lastname } = this.state;

    return (
      <div>
        <h3>Save Employee</h3>
        <div className="container">
          <div className = "card col-md-6 offset-md-3 offset-md-3">
          <Formik
            initialValues={{ lastname, firstname }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="alert alert-warning"
                />{" "}
                <fieldset className="form-group">
                  <label>lastname</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="lastName"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="firstName"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit" saveOrUpdateEmployee>Save</button>
                <button className="btn btn-danger" type="cancel">cancel</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      </div>
    );
  }
}

export default cec;
