import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button, FormGroup } from "reactstrap";
import Checkbox from "react-custom-checkbox";
import logo from "../../images/tunnin-logo.png";
// Constants
import { sign_up, signed_up, reg_step_1 } from "../../constants/constants";
// Actions
import { Signup } from "../../actions/Signup";
import { SignedUp } from "../../actions/signedUp";
import { postFetch } from "../../actions/postFetch";

// Material UI

import { TextField } from "@material-ui/core";

//Cookies

import Cookies from "universal-cookie";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Router
import { withRouter } from "react-router-dom";
// Styles
import "../../styles/signup.scss";
import { fine_res } from "../../constants/api_env";
function SignUp(props) {
  const dispatch = useDispatch();

  const cookies = new Cookies();

  // State
  const [formVal, setForm] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const [selected, setSelected] = useState("");
  const [routeLoc, setRouteLoc] = useState("");
  const [fullName, setF_Name] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPass] = useState("");
  const [c_pass, setC_Pass] = useState("");
  const [newsletter, setSubscribe] = useState(0);
  let checkValue = false;
  useEffect(() => {
    dispatchSignupAction();
  }, []);
  const dispatchSignupAction = () => {
    dispatch(Signup(sign_up, null));
  };

  // let passwordValid = document.getElementById("password");
  // let confirm_password = document.getElementById("confirm_password");

  // function validatePassword() {
  //   if (passwordValid.value != confirm_password.value) {
  //     confirm_password.setCustomValidity("Passwords Don't Match");
  //   } else {
  //     confirm_password.setCustomValidity("");
  //   }
  // }

  const signupState = useSelector((state) => state.signup);
  const postApi = useSelector((state) => state.postFetch);
  const getSignUp = () => {
    if (signupState.hasOwnProperty("data")) {
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password !== c_pass) {
              alert("Passwords don't match");
              // prompt("Passwords don't match");
              // console.log(confirm_password);
            } else {
              dispatch(
                postFetch(reg_step_1, {
                  fullName,
                  email,
                  password,
                  dob,
                  newsletter,
                })
              );

              cookies.set("username", email);
              cookies.set("password", password);
            }

            console.log({
              fullName,
              email,
              password,
              dob,
              newsletter,
            });
            formValue(signupState.data);
          }}
          className="container-fluid"
        >
          <h2 className="heading">
            {signupState.data.heading}
            <img src={logo} alt="Logo" />
          </h2>
          <p className="subheading">{signupState.data.subHeading}</p>
          <Row className="signup-first-form-wrapper">
            {/* {formDetail(signupState.data)} */}
            <Col xs="12" sm="5" md="5" lg="5">
              <FormGroup className="custom-input-wrapper">
                <Label className="formheading">
                  <p>Full Name</p>
                </Label>
                <input
                  required
                  type="text"
                  placeholder="Elias Manik"
                  className="form-control"
                  onChange={(e) => {
                    setF_Name(e.target.value);
                  }}
                />
                <span className="input-icons secondary">
                  <i className="icon-person"></i>
                </span>
                <span className="input-icons password">
                  <i
                    className=""
                    // onClick={() => togglePass(item, index)}
                  ></i>
                </span>
              </FormGroup>
            </Col>
            <Col xs="12" sm="5" md="5" lg="5">
              <FormGroup
                style={{ marginBottom: 2 }}
                className="custom-input-wrapper"
              >
                <Label className="formheading">
                  <p>Password</p>
                </Label>
                <input
                  required
                  id="password"
                  type={viewPass && selected === "pass" ? "text" : "password"}
                  // pattern=".{8,}"
                  minLength="8"
                  placeholder="***************"
                  className="form-control"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
                <span className="input-icons secondary">
                  <i className="icon-lock-unlock"></i>
                </span>
                <span className="input-icons password">
                  <i
                    className="icon-outline-visibility_off-24px"
                    onClick={() => togglePass("pass")}
                  ></i>
                </span>
              </FormGroup>
            </Col>
            <Col xs="12" sm="5" md="5" lg="5">
              <FormGroup className="custom-input-wrapper">
                <Label className="formheading">
                  <p>Email Address</p>
                </Label>
                <input
                  required
                  type="email"
                  placeholder="dodgeui2020@gmail.com"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <span className="input-icons secondary">
                  <i className="icon-mail"></i>
                </span>
                <span className="input-icons password">
                  <i
                    className=""
                    // onClick={() => togglePass(item, index)}
                  ></i>
                </span>
              </FormGroup>
            </Col>
            <Col xs="12" sm="5" md="5" lg="5">
              <FormGroup className="custom-input-wrapper">
                <Label className="formheading">
                  <p>Confirm Password</p>
                </Label>
                <input
                  id="confirm_password"
                  required
                  type={viewPass && selected === "c_pass" ? "text" : "password"}
                  placeholder="***************"
                  className="form-control"
                  onChange={(e) => {
                    setC_Pass(e.target.value);
                  }}
                />
                <span className="input-icons secondary">
                  <i className="icon-lock-unlock"></i>
                </span>
                <span className="input-icons password">
                  <i
                    className="icon-outline-visibility_off-24px"
                    onClick={() => togglePass("c_pass")}
                  ></i>
                </span>
              </FormGroup>
            </Col>
            <Col xs="12" sm="5" md="5" lg="5">
              <FormGroup className="custom-input-wrapper">
                <Label className="formheading">
                  <p>Date of Birth</p>
                </Label>

                <input
                style={{ width: "auto"}}
                  required
                  type="date"
                  placeholder="15-July-1996"
                  className="form-control"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />

                <span className="input-icons secondary">
                  <i className="icon-calender"></i>
                </span>
                <span className="input-icons password">
                  <i
                    className=""
                    // onClick={() => togglePass(item, index)}
                  ></i>
                </span>
              </FormGroup>
            </Col>
            <Col xs="12" sm="5" md="5" lg="5">
              <FormGroup className="subscription-checkbox-wrapper ">
                <Checkbox
                  name="subscription-checkbox"
                  onChange={() => {
                    handleChange("subscribe");
                  }}
                  borderColor="#fff"
                  borderWidth={3}
                  borderRadius={3}
                  style={{ cursor: "pointer" }}
                  labelStyle={{
                    marginLeft: 5,
                    userSelect: "none",
                    color: "#fff",
                  }}
                  label={signupState.data.subscribe}
                />
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-center" xs="12">
              {password === c_pass ? (
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  // onClick={() => formValue(signupState.data)}
                >
                  {signupState.data.btnText}
                </Button>
              ) : (
                <Button
                  // disabled
                  type="submit"
                  color="primary"
                  size="lg"
                  // onClick={() => formValue(signupState.data)}
                >
                  {signupState.data.btnText}
                </Button>
              )}
            </Col>
          </Row>
        </form>
      );
    }
  };
  let form = {};
  const handleChange = (key, data = "") => {
    if (key === "subscribe") {
      checkValue = !checkValue;
      if (checkValue) {
        checkValue = 1;
        setSubscribe(1);
      } else {
        checkValue = 0;
        setSubscribe(0);
      }
    }
    console.log(form);
    console.log({ fullName, email, password, dob, newsletter });
  };
  const formValue = (data) => {
    setForm(form);
    dispatch(SignedUp(signed_up, form));
    // dispatch(postFetch(reg_step_1, form_params));
    setRouteLoc(data.route);
    //props.history.push(data.route);
  };
  // console.log("SignUp:", postApi);
  if (postApi.hasOwnProperty("regStep1Status")) {
    let resStatus = postApi.regStep1Status;
    if (resStatus === fine_res) {
      props.history.push(routeLoc);
    }
  }
  const togglePass = (field) => {
    setSelected(field);
    setViewPass(!viewPass);
  };
  return <div className="signup">{getSignUp()}</div>;
}
export default withRouter(SignUp);
