import React, {Component} from "react"
import {withRouter} from "react-router-dom"

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <>
          <section className="d-none-max-768">
            <div>
              Login Page
            </div>
          </section>
        </>
    )
  }
}

export default withRouter(Login)