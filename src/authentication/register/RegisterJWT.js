import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { signupWithJWT } from "../../redux/actions/auth/registerActions";
import { history } from "../../history";

class RegisterJWT extends React.Component {
  state = {
    email: "",
    password: "",
    nickname: "",
    confirmPass: "",
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.signupWithJWT(
      this.state.email,
      this.state.password,
      this.state.nickname
    );
  };

  render() {
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Nickname"
            required
            value={this.state.nickname}
            onChange={(e) => this.setState({ nickname: e.target.value })}
          />
          <Label>Nickname</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <Label>Email</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <Label>Password</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            value={this.state.confirmPass}
            onChange={(e) => this.setState({ confirmPass: e.target.value })}
          />
          <Label>Confirm Password</Label>
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            outline
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
          <Button color="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.register,
  };
};
export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT);
