import React, { useEffect, useState } from "react";

import { Row, Col, Label, Input, Button, FormGroup } from "reactstrap";

import Checkbox from "react-custom-checkbox";

import logo from "../../images/tunnin-logo.png";
// Constants
import {
    signup_profile,
    categories_list,
    signedup_profile,
    reg_step_2,
} from "../../constants/constants";

// Style
import "../../styles/signupprofile.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Action
import { signUpProfile } from "../../actions/signupProfile";
import { getFetch } from "../../actions/getFetch";
import { postFetch } from "../../actions/postFetch";

// Router
import { withRouter } from "react-router-dom";
import { fine_res } from "../../constants/api_env";

function Profile(props) {
    const [routeLoc, setRouteLoc] = useState("");

    useEffect(() => {
        dispatchSignUpProfile();
        dispatchCategories();
    }, []);

    const dispatchSignUpProfile = () => {
        dispatch(signUpProfile(signup_profile, null));
    };

    const dispatchCategories = () => {
        dispatch(getFetch(categories_list));
    };

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.signupProfile);
    const categories = useSelector((state) => state.signupCategories);
    const postApi = useSelector((state) => state.postFetch);

    const getProfile = () => {
        if (profile.hasOwnProperty("data")) {
            return (
                <form onSubmit={handleSubmit} className="container-fluid">
                    <h3 className="heading">
                        {profile.data.heading}
                        <img src={logo} alt="Logo" />
                    </h3>
                    <h5 className="subheading">{profile.data.subHeading}</h5>
                    <Row className="signup-second-form-wrapper">
                        {formList(profile.data)}
                        <Col className="pt-1" xs="12" sm="5" md="6" lg="6">
                            <Label className="formheading">
                                <p className="d-flex justify-content-between align-items-center">
                                    <span>{profile.data.categories}</span>
                                    <span className="select-all">
                                        (select all that apply to your practice)
                                    </span>
                                </p>
                            </Label>
                            <div className="checkbox-wrapper">
                                {formChecks(categories)}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="d-flex justify-content-center mb-5 mt-2"
                            xs="12"
                        >
                            <Button
                                color="primary"
                                size="lg"
                                type="submit"
                                // onClick={() => routeTo(profile.data.route)}
                            >
                                {profile.data.btnText}
                            </Button>
                        </Col>
                    </Row>
                </form>
            );
        }
    };

    const handleSubmit = (data) => {
        dispatch(signUpProfile(signedup_profile, form));
        if (postApi.hasOwnProperty("regStep1")) {
            let regStep1 = postApi.regStep1;
            console.log(":RegStep1:", regStep1);
            if (regStep1.hasOwnProperty("data")) {
                let regStep1Data = regStep1.data;
                if (regStep1Data.hasOwnProperty("id")) {
                    let trainerId = regStep1Data.id;
                    let userForm = {
                        trainerId: trainerId,
                        username: form["username"],
                        about: form["about"],
                        location: form["location"],
                        mobile: form["phone_num"],
                        trainer_Cat: form["trainer_cat"],
                        insta: form["insta_url"],
                        business: form["business_name"],
                    };

                    dispatch(postFetch(reg_step_2, userForm));
                    console.log("TrainerId: ", trainerId);
                    console.log("Form: ", userForm);
                }
            }
        }
        setRouteLoc(profile.data.route);
        console.log(profile.data.route);
        props.history.push(profile.data.route);
        //props.history.push(data);
    };

    if (postApi.hasOwnProperty("regStep2Status")) {
        let resStatus = postApi.regStep2Status;
        if (resStatus === fine_res) {
            props.history.push(routeLoc);
        }
    }

    const formChecks = (categories) => {
        if (categories.hasOwnProperty("data")) {
            let checks = categories.data.map((items, index) => {
                return (
                    <div className="checkboxes" key={index}>
                        <Checkbox
                            value={items._id}
                            key={items._id}
                            name="subscription-checkbox"
                            checked={false}
                            borderColor="#fff"
                            borderWidth={2}
                            borderRadius={2}
                            style={{ cursor: "pointer" }}
                            labelStyle={{
                                marginLeft: 5,
                                userSelect: "none",
                                color: "#fff",
                            }}
                            label={items.categoryName}
                            onChange={(e) =>
                                handleChangeCheck(
                                    e,
                                    items._id,
                                    items.categoryName
                                )
                            }
                        />
                    </div>
                );
            });
            return checks;
        }
    };

    let selected_categories = [];

    const handleChangeCheck = (event, value, name) => {
        if (event) {
            selected_categories.push(value);
        } else {
            selected_categories.pop(value);
        }
        form["trainer_cat"] = selected_categories;
    };

    const formList = (data) => {
        let formFields = data.formFields.map((item, index) => {
            return (
                <Col xs="12" sm="5" md="5" lg="5" key={index}>
                    <FormGroup className="mb-4">
                        <Label className="formheading">
                            <p>{item.labelName}</p>
                        </Label>
                        {item.type === "textarea" ? (
                            <Input
                                required
                                type={item.type}
                                placeholder={item.placeholder}
                                className="form-control"
                                sm={4}
                                onChange={(e) =>
                                    handleChange(item.key, e.target.value)
                                }
                            />
                        ) : (
                            <input
                                required
                                type={item.type}
                                placeholder={item.placeholder}
                                className="form-control"
                                onChange={(e) =>
                                    handleChange(item.key, e.target.value)
                                }
                            />
                        )}
                    </FormGroup>
                </Col>
            );
        });
        return formFields;
    };

    let form = {};

    const handleChange = (key, data) => {
        form[key] = data;
        console.log(form);
    };

    return <div className="profile">{getProfile()}</div>;
}

export default withRouter(Profile);
