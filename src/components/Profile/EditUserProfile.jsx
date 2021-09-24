import React, { useEffect, useState } from "react";
import { Button, FormGroup, Label, Input, Row, Col } from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Action
import { userProfile } from "../../actions/userProfile";

// Router
import { withRouter } from "react-router-dom";

// Constants
import {
    user_profile,
    user_edit_profile,
    get_profile,
} from "../../constants/constants";

// Styles
import "../../styles/profile.scss";

// Actions
import { getFetchParam } from "../../actions/getFetchParam";

// Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import profileCover from "../../images/profile-cover.png";
import profileDp from "../../images/profile-dp.png";
function UserProfile(props) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.postFetch);
    const [settedProfile, setUserProfile] = useState("");

    const [userId2, setUserId] = useState();
    const [fullName, setFullyName] = useState("");
    const [usrname, setUsrname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [about, setAbout] = useState("");
    const [business, setBusiness] = useState("");
    const [dob, setDob] = useState("");
    const [profilePic, setProfilePic] = useState("");

    let userId;

    useEffect(() => {
        getUserTrainerId();
        dispatchUserProfile();
    }, []);

    const getUserTrainerId = () => {
        if (userInfo.hasOwnProperty("userLogged")) {
            if (userInfo.userLogged) {
                userId = userInfo.userLogged._id;
            }
        }
    };

    const dispatchUserProfile = () => {
        console.log(userId);
        setUserId(userId);
        if (props.history.location.pathname === "/edit-user-profile") {
            dispatch(userProfile(user_edit_profile));
        } else {
            dispatch(getFetchParam(get_profile, userId));
            dispatch(userProfile(user_profile));
        }
    };

    const users = useSelector((state) => state.userProfile);

    // User Profile
    const usersProfile = useSelector((state) => state.getApi);

    const getUpperPart = () => {
        if (users.hasOwnProperty("data")) {
            let upper = users.data;
            return (
                <Row className="mb-3">
                    <Col className="d-flex align-items-center col-6">
                        <h6 className="title m-0">
                            <i
                                className="icon-chevron-left"
                                onClick={() => props.history.goBack()}
                            ></i>
                            {upper.title}
                        </h6>
                    </Col>

                    {getBtns(upper.btns)}
                </Row>
            );
        }
    };

    const routeTo = (location) => {
        props.history.push(location);
    };

    const postEditedData = () => {
        var formdata = new FormData();
        formdata.append(
            "fullName",
            fullName === "" ? usersProfile.userProfile.fullName : fullName
        );
        formdata.append(
            "usrname",
            usrname === "" ? usersProfile.userProfile.username : usrname
        );
        formdata.append(
            "email",
            email === "" ? usersProfile.userProfile.email : email
        );
        formdata.append(
            "gender",
            gender === "" ? usersProfile.userProfile.gender : gender
        );
        formdata.append(
            "location",
            location === "" ? usersProfile.userProfile.location : location
        );
        formdata.append(
            "about",
            about === "" ? usersProfile.userProfile.about : about
        );
        formdata.append(
            "business",
            business === "" ? usersProfile.userProfile.business : business
        );
        formdata.append("dob", dob === "" ? usersProfile.userProfile.dob : dob);
        formdata.append(
            "profilePic",
            "C:/Users/moham/Desktop/tunnin/tunnin-frontend-dev/src/images/done.png"
        );

        console.log(
            fullName === "" ? usersProfile.userProfile.fullName : fullName
        );
        console.log(
            usrname === "" ? usersProfile.userProfile.username : usrname
        );
        console.log(email === "" ? usersProfile.userProfile.email : email);
        console.log(dob === "" ? usersProfile.userProfile.dob : dob);
        console.log(gender === "" ? usersProfile.userProfile.gender : gender);
        console.log(about === "" ? usersProfile.userProfile.about : about);
        console.log(
            business === "" ? usersProfile.userProfile.business : business
        );

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };
        fetch(
            "https://api.tunnin.io/users/update_trainer_profile/" + userId2,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    const getBtns = (data) => {
        let btns = data.map((items, index) => {
            return (
                <Col className="add-btn-wrapper col-6" key={index}>
                    {items.flag ? (
                        <Button
                            type="submit"
                            className="addBtn"
                            onClick={() => {
                                postEditedData();
                                routeTo(items.route);
                            }}
                        >
                            <i className={items.iconClass}></i>
                            {items.title}
                        </Button>
                    ) : (
                        ""
                    )}
                </Col>
            );
        });
        return btns;
    };

    const getProfile = () => {
        if (usersProfile.hasOwnProperty("userProfile")) {
            let profile = usersProfile.userProfile;
            return (
                <Col>
                    <div className="d-flex align-items-center">
                        <span className="profile-img-wrapper position-relative">
                            <img
                                alt="profile"
                                src={"https://api.tunnin.io/uploads/" + profile.profilePic}
                            />

                            {props.history.location.pathname ===
                            "/edit-user-profile" ? (
                                <span className="delete-overlay">
                                    <span className="delete-img-wrapper">
                                        <i className="icon-delete"></i>
                                    </span>
                                </span>
                            ) : (
                                ""
                            )}
                        </span>
                        <span className="profile-name-wrapper">
                            <span className="profile-name">
                                {profile.fullName}
                            </span>
                            <span className="username">{profile.username}</span>
                        </span>
                    </div>
                </Col>
            );
        }
    };

    const getProfileImages = () => {
        if (users.hasOwnProperty("data")) {
            let profileDetail = users.data.userDetails.coverImages.map(
                (data, index) => {
                    return (
                        <Col className="cover-images" key={index}>
                            <div className="position-relative">
                                <img src={profileCover} alt={data.alt} />
                                {props.history.location.pathname ===
                                "/edit-user-profile" ? (
                                    <span className="delete-overlay">
                                        <span className="delete-img-wrapper">
                                            <i className="icon-delete"></i>
                                        </span>
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </Col>
                    );
                }
            );
            return profileDetail;
        }
    };

    const getUserForm = () => {
        if (usersProfile.hasOwnProperty("userProfile")) {
            let profile = usersProfile.userProfile;
            return (
                <Row className={"user-profile-form-edit"}>
                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>Name</Label>
                            <Input
                                required
                                onChange={(e) => setFullyName(e.target.value)}
                                defaultValue={profile.fullName}
                                type={"text"}
                                name={profile.fullName}
                            />
                        </FormGroup>
                    </Col>

                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>Email</Label>
                            <Input
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                defaultValue={profile.email}
                                type={"email"}
                                name={profile.email}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>Category</Label>
                            <Input
                                required
                                defaultValue={profile.userType}
                                type={"text"}
                                name={profile.userType}
                            />
                        </FormGroup>
                    </Col>

                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>
                                Instagram Profile URL
                            </Label>
                            <Input
                                required
                                defaultValue={profile.insta}
                                type={"text"}
                                name={profile.insta}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>Username</Label>
                            <Input
                                required
                                onChange={(e) => setUsrname(e.target.value)}
                                defaultValue={profile.username}
                                type={"text"}
                                name={profile.username}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>Gender</Label>
                            <Input
                                required
                                onChange={(e) => setGender(e.target.value)}
                                defaultValue={profile.gender}
                                type={"text"}
                                name={profile.gender}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>Location</Label>
                            <Input
                                required
                                onChange={(e) => setLocation(e.target.value)}
                                defaultValue={profile.location}
                                type={"text"}
                                name={profile.location}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>DOB</Label>
                            <Input
                                required
                                onChange={(e) => setDob(e.target.value)}
                                defaultValue={profile.dob}
                                type={"text"}
                                name={profile.dob}
                            />
                        </FormGroup>
                    </Col>

                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>About</Label>
                            <Input
                                required
                                onChange={(e) => setAbout(e.target.value)}
                                defaultValue={profile.about}
                                type={"textarea"}
                                name={profile.about}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="4">
                        <FormGroup>
                            <Label className={"form-title"}>
                                Business Name
                            </Label>
                            <Input
                                required
                                onChange={(e) => setBusiness(e.target.value)}
                                defaultValue={profile.business}
                                type={"text"}
                                name={profile.business}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            );
        }
    };

    return (
        <div className="profiles">
            <Header />
            <div className="container-fluid">
                <Row>
                    <Col className="left-container">
                        <Sidebar />
                    </Col>
                    <Col>
                        <div className="profile-right-container">
                            <div className="profile-header mt-4">
                                {getUpperPart()}
                            </div>
                            <Row className="user-profile-wrapper">
                                {getProfile()}
                            </Row>
                            <Row className="profile-cover-wrapper">
                                {getProfileImages()}
                            </Row>
                            <form
                                onSubmit={() => console.log("sumited")}
                                className="tunnin-form"
                            >
                                {getUserForm()}
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default withRouter(UserProfile);
