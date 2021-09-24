import React, { useEffect } from "react";

import { Button } from "reactstrap";

import { useState } from "react";
import Cookies from "universal-cookie";

import logo from "../../images/tunnin-logo.png";
import verify from "../../images/verify-email-2.png";
// Constants
import { signed_up } from "../../constants/constants";
import { verify_type } from "../../constants/constants";

// Router
import { useLocation } from "react-router-dom";

// Actions
import { SignedUp } from "../../actions/signedUp";
import { VerifyAction } from "../../actions/verify";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Router
import { withRouter } from "react-router-dom";

// Style
import "../../styles/verified.scss";

function Verify(props) {
  const cookies = new Cookies();

  const location = useLocation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    dispatchSignedupAction();
    dispatchVerify();
    authenticator();
  }, []);

  const authenticator = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: cookies.get("username"),
      password: cookies.get("password"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.tunnin.io/users/auth", requestOptions)
      .then((response) => response.json())
      .then((result) => setUserId(result.data._id))
      .catch((error) => console.log("error", error));

    if (userId) {
      var raw1 = { id: userId };

      var requestOptions = {
        method: "POST",
        body: raw1,
        redirect: "follow",
      };

      fetch("https://api.tunnin.io/users/getEmail_status", requestOptions)
        .then((response) => response.json())
        .then((result) => setAuth(result.emailStatus))
        .catch((error) => console.log("error", error));
    }
  };

  const dispatchSignedupAction = () => {
    dispatch(SignedUp(signed_up, location));
  };

  const dispatchVerify = () => {
    dispatch(VerifyAction(verify_type));
  };

  const verifiedData = useSelector((state) => state.verify);

  const routeToForm = (routeTo) => {
    props.history.push(routeTo);
  };

  const getVerified = () => {
    if (verifiedData.hasOwnProperty("data")) {
      return (
        <div className="container-fluid">
          <div className="page-logo-wrapper">
            <img src={logo} alt="Logo" />
          </div>
          <div className="verify-img">
            <img src={verify} alt="Reset Password" />
          </div>

          <h3 className="heading">{verifiedData.data.heading}</h3>
          <p className="text">{verifiedData.data.msg}</p>
          <div className="next-btn-wrapper">
            {auth ? (
              <Button
                color="primary"
                size="lg"
                onClick={() => routeToForm(verifiedData.data.route)}
              >
                {verifiedData.data.btnText}
              </Button>
            ) : (
              <Button
                disabled
                color="primary"
                size="lg"
                onClick={() => routeToForm(verifiedData.data.route)}
              >
                {verifiedData.data.btnText}
              </Button>
            )}
          </div>
        </div>
      );
    }
  };

  return <div className="verify">{getVerified()}</div>;
}

export default withRouter(Verify);
