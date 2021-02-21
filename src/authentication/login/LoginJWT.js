import React from "react";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap";
import { Mail, Lock } from "react-feather";
import { loginWithJWT } from "../../redux/actions/auth/loginActions";
import { connect } from "react-redux";
import { history } from "../../history";

class LoginJWT extends React.Component {
  state = {
    email: "m@bk.ru",
    password: "Maral_1",
    remember: false,
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.loginWithJWT(this.state);
  };
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button
                color="primary"
                outline
                onClick={() => {
                  history.push("/register");
                }}
              >
                Register
              </Button>
              <Button color="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps, { loginWithJWT })(LoginJWT);
