import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Action
import { settings } from "../../actions/settings";
import { postFetch } from "../../actions/postFetch";

import Cookies from "universal-cookie";

// Router
import { withRouter } from "react-router-dom";

// Constants
import { setting_bank, bank_details_api } from "../../constants/constants";

// Styles
import "../../styles/settings.scss";

// Components
import SettingSidebar from "./Sidebar";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

function BankDetails(props) {
  const cookies = new Cookies();

  let bankDetailForm = {};
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [ssn, setSsn] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");

  const [uploadedImageFile, setUploadedFile] = useState([]);

  const dispatch = useDispatch();
  let postApi = useSelector((state) => state.postFetch);

  const initialValue = () => {
    const res = fetch(
      "https://api.tunnin.io/bank/getDetails/" + postApi.userLogged._id
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          console.log(data);
          setBankName(data.data.bankName);
          setAccountHolder(cookies.get("username"));
          setAccountNumber(data.data.accountNumber);
          setRoutingNumber(data.data.routingNumber);
          setSsn(data.data.ssn);
          setPostalCode(data.data.postalCode);
          setCountry(data.data.country);
          setAddress1(data.data.address1);
          setAddress2(data.data.address2);
          setCity(data.data.city);
          setDob(data.data.dob);
          setGender(data.data.gender);
          setEmail(data.data.email);
          setState(data.data.state);
        } else {
          console.log(data);
        }
      });
  };

  useEffect(() => {
    dispatchContact();
    initialValue();
  }, [postApi]);

  const dispatchContact = () => {
    dispatch(settings(setting_bank));
  };

  const getSettings = useSelector((state) => state.settings);

  const getBankDetails = () => {
    if (getSettings.hasOwnProperty("bank")) {
      let bankDetail = getSettings.bank;
      return (
        <div className="banks">
          <div className="settings-container">
            <h5 className="settings-heading">
              <i className="icon-info"></i>
              {bankDetail.title}
            </h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveDetails();
                props.history.push("/settings-bank-details");
              }}
              className="tunnin-form"
            >
              <Row>{getBankForm()}</Row>
              <div>
                <label> Verification Images</label>
                <div className="uploads-btn-wrapper">
                  <span className="uploads-btn">
                    <label htmlFor="fileUpload">
                      <i className="icon-cloud"></i>
                    </label>
                    <input
                      hidden
                      id="fileUpload"
                      type="file"
                      onChange={(e) => uploadedFile(e)}
                    />
                  </span>
                  <span className="uploads-btn">
                    <label htmlFor="fileUpload">
                      <i className="icon-cloud"></i>
                    </label>
                    <input
                      hidden
                      id="fileUpload"
                      type="file"
                      onChange={(e) => uploadedFile(e)}
                    />
                  </span>
                </div>
              </div>
              <div className="text-center">
                <Button type="submit" color="primary" className="action-btn">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  const uploadedFile = (event) => {
    let imageFile = event.target.files[0];
    if (uploadedImageFile < 2) {
      setUploadedFile(...uploadedImageFile, imageFile);
    }
  };

  const getBankForm = () => {
    // if (getSettings.hasOwnProperty("bank")) {
    //   let form = getSettings.bank.bankform.map((data, index) => {
    return (
      <>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Bank Name</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Address Line 1</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={address1}
              onChange={(e) => {
                setAddress1(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Account Holder Name</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={accountHolder}

              //   onChange={(e) => {
              //     setA( e.target.value);
              //   }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Address Line 2</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={address2}
              onChange={(e) => {
                setAddress2(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Account Number</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">City</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Routing Number</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={routingNumber}
              onChange={(e) => {
                setRoutingNumber(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">State</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">SSN (Last Four Digits)</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={ssn}
              onChange={(e) => {
                setSsn(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Gender</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Postal Code</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Email</Label>
            <Input
              required
              type="email"
              size="6"
              defaultValue={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Country</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label className="formheading">Date Of Birth</Label>
            <Input
              required
              type="text"
              size="6"
              defaultValue={dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
      </>
    );

    //   return form;
    // }
  };

  //   const getBankDetailsField = (field, data) => {
  //     console.log(field, data);
  //     bankDetailForm[field] = data;
  //   };

  const saveDetails = () => {
    let bodyFormData = new FormData();
    if (postApi.hasOwnProperty("userLogged")) {
      bodyFormData.append("userId", postApi.userLogged._id);
      console.log(postApi.userLogged._id);
      bodyFormData.append("bankName", bankName);
      bodyFormData.append("accountHolder", accountHolder);
      bodyFormData.append("accountNumber", accountNumber);
      bodyFormData.append("routingNumber", routingNumber);
      bodyFormData.append("ssn", ssn);
      bodyFormData.append("postalCode", postalCode);
      bodyFormData.append("country", country);
      bodyFormData.append("address1", address1);
      bodyFormData.append("address2", address2);
      bodyFormData.append("city", city);
      bodyFormData.append("dob", dob);
      bodyFormData.append("email", email);
      bodyFormData.append("gender", gender);
      bodyFormData.append("state", state);
      bodyFormData.append("images", uploadedImageFile);
    }

    // const postObj = {
    //   userId: postApi.userLogged._id,
    //   bankName: bankName,

    //   accountHolder: accountHolder,
    //   accountNumber: accountNumber,
    //   routingNumber: routingNumber,
    //   ssn: ssn,
    //   postalCode: postalCode,
    //   country: country,
    //   address1: address1,
    //   address2: address2,
    //   city: city,
    //   dob: dob,
    //   email: email,
    //   gender: gender,
    //   state: state,
    //   images: uploadedImageFile,
    // };

    console.log("#################");
    console.log(postApi.userLogged._id);
    console.log(bankName);
    console.log(accountHolder);
    console.log(accountNumber);
    console.log(routingNumber);
    console.log(ssn);
    console.log(postalCode);
    console.log(country);
    console.log(address1);
    console.log(address2);
    console.log(dob);
    console.log(email);
    console.log(gender);
    console.log(state);
    console.log(uploadedImageFile);

    // var requestOptions = {
    //   method: "POST",
    //   body: postObj,
    //   redirect: "follow",
    // };

    // console.log("#################");
    // console.log(postObj);
    // console.log("#################");

    // fetch("https://api.tunnin.io/bank", requestOptions)
    //   .then((response) => response.text())

    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));

    // console.log("Body Form Data: ", bodyFormData);
    // console.log("#################");
    dispatch(postFetch(bank_details_api, bodyFormData));
    // console.log("Bank Form: ", bankDetailForm);
  };

  const getSettingSidebar = () => {
    return <SettingSidebar />;
  };

  return (
    <div className="notifications">
      <Header />
      <div className="container-fluid">
        <Row>
          <Col className="left-container">
            <Sidebar />
          </Col>
          <Col>
            <Row className="h-100">
              <Col className="p-0 settings-sidebar-wrapper">
                {getSettingSidebar()}
              </Col>
              <Col sm="9">{getBankDetails()}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default withRouter(BankDetails);
