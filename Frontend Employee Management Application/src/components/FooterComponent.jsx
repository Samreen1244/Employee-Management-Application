import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <span className="text-muted"> <marquee  width = "100%" style={{color:'blue'}} >Employee Management Application</marquee ></span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
