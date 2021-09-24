import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// import moment from "moment";
import timeago from "time-ago";

// Styles
import "../../styles/ratings.scss";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

import { Avatar } from "@material-ui/core";

// Action
import { fetchHeader } from "../../actions/header";
import { getFetch } from "../../actions/getFetch";

// Constants
import {
    getHeader,
    trainer_user_type,
    user_logout,
} from "../../constants/constants";
import { fine_res } from "../../constants/api_env";

// Router
import { withRouter } from "react-router-dom";

import Cookies from "universal-cookie";

function Header(props) {
    const cookies = new Cookies();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] =
        useState(false);
    const [userType, setUserType] = useState({});
    const [Data, setData] = useState([]);
    const [userLoggedDetails, setUserLogged] = useState({});
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.postFetch);

    const dispatchCheckUser = () => {
        if (userInfo.hasOwnProperty("userLogged")) {
            setUserLogged(userInfo.userLogged);
            setUserType(userInfo.userLogged.userType);
        } else {
            setUserType(trainer_user_type);
        }
    };

    //   const data = new Date;

    const notificationImporter = () => {
        // console.log("001122check=========================001122");
        // console.log(localStorage.getItem("userId"));
        // console.log("001122check=========================001122");
        fetch(
            `https://api.tunnin.io/notifications/getAll/${localStorage.getItem("userId")}/5`
        )
            .then((res) => res.json())
            .then((data) => setData(data));
    };

    useEffect(() => {
        dispatchHead();
        dispatchCheckUser();
        notificationImporter();
    }, [userInfo.hasOwnProperty("userLogged"), Data.length]);

    const dispatchHead = () => {
        dispatch(fetchHeader(getHeader));
    };

    const getHead = useSelector((state) => state.header);

    const getPaths = () => {
        if (getHead.hasOwnProperty("data")) {
            let paths = getHead.data.paths.map((data, index) => {
                return <span className={data.class} key={index}></span>;
            });
            return paths;
        }
    };

    const getCredentials = () => {
        // console.log("User Logged Details: ", userLoggedDetails);
        if (userLoggedDetails) {
            return (
                <span>
                    <span className="name">{userLoggedDetails.fullName}</span>
                    <span className="email">{userLoggedDetails.email}</span>
                </span>
            );
        }
    };

    const getUserImage = () => {
        if (userLoggedDetails) {
            return (
                <img
                    src={
                        "https://api.tunnin.io/uploads/" +
                        userLoggedDetails.profilePic
                    }
                    alt="user-dp"
                    width="55"
                    height="55"
                />
            );
        }
    };

    const removeCookiesOrLogout = () => {
        cookies.remove("username");
        cookies.remove("password");
    };
    const getDropDownItems = () => {
        if (getHead.hasOwnProperty("data")) {
            let drops = getHead.data.dropdown.map((data, index) => {
                if (data.title === "Log out") {
                    return (
                        <a href="/">
                            <DropdownItem
                                key={index}
                                onClick={() => {
                                    removeCookiesOrLogout();
                                    // routeTo(data.route);
                                }}
                            >
                                <i className={data.iconClass}></i>
                                {data.title}
                            </DropdownItem>
                        </a>
                    );
                } else {
                    return (
                        <DropdownItem
                            key={index}
                            onClick={() => {
                                routeTo(data.route);
                            }}
                        >
                            <i className={data.iconClass}></i>
                            {data.title}
                        </DropdownItem>
                    );
                }
            });
            return drops;
        }
    };

    const getDropDownNotifications = () => {
        // if (getHead.hasOwnProperty("data")) {
        let drops = Data.map((data, index) => {
            return (
                <>
                    <DropdownItem
                        style={{
                            fontSize: "small",
                            borderBottom: "1px dotted #333",
                        }}
                        key={index}
                    >
                        <div style={{ display: "flex" }}>
                            <Avatar
                                style={{
                                    marginRight: "10px",
                                    alignSelf: "center",
                                }}
                            >
                                <img src={data.image} alt="profile pic"></img>
                            </Avatar>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <p style={{ marginTop: 0, marginBottom: 0 }}>
                                    {data.body.slice(0, 40)}...
                                </p>
                                <p style={{ marginTop: 0, marginBottom: 0 }}>
                                    {timeAgoFunction(data.datetime)}
                                </p>
                            </div>
                        </div>
                    </DropdownItem>
                    {/* <NotificationDropdown/> */}
                </>
            );
        });
        return drops;
        // }
    };

    const timeAgoFunction = (time) => {
        var epoch = +time + new Date().getTimezoneOffset() * -1; //for timeZone

        var t = new Date(+epoch);

        return timeago.ago(t);
    };

    const routeTo = (location) => {
        props.history.push(location);
    };

    const logout = () => {
        dispatch(getFetch(user_logout));
    };

    const logUser = useSelector((state) => state.getApi);

    if (logUser.hasOwnProperty("logout")) {
        if (logUser.logout.status === fine_res) {
            console.log("Fine");
            props.history.push("/signup");
        }
    }

    return (
        <div className="profile-actions d-flex align-items-center justify-content-end">
            {userType === trainer_user_type ? (
                <Dropdown
                    className="profile-dropdown"
                    isOpen={notificationDropdownOpen}
                    size="xs"
                    toggle={() =>
                        setNotificationDropdownOpen(!notificationDropdownOpen)
                    }
                >
                    <DropdownToggle>
                        <div className="user-notification-wrapper">
                            <span className="icon-Group-22380">
                                {getPaths()}
                            </span>
                            {/* {getDropDownItems()} */}
                        </div>
                    </DropdownToggle>
                    <DropdownMenu>{getDropDownNotifications()}</DropdownMenu>
                </Dropdown>
            ) : (
                ""
            )}
            <Dropdown
                className="profile-dropdown"
                isOpen={dropdownOpen}
                size="sm"
                toggle={toggle}
            >
                <DropdownToggle>
                    <div className="user-profile">
                        <span className="dp-wrapper">{getUserImage()}</span>
                        <span className="credentials">{getCredentials()}</span>
                        {userType === trainer_user_type ? (
                            <i className="icon-chevron-down"></i>
                        ) : (
                            ""
                        )}
                    </div>
                </DropdownToggle>
                <DropdownMenu>{getDropDownItems()}</DropdownMenu>
            </Dropdown>
            {userType === trainer_user_type ? (
                ""
            ) : (
                <a href="/">
                    <span
                        className="name user-logout"
                        style={{ color: "#fff" }}
                        onClick={() => logout()}
                    >
                        <i className="icon-logout name" />
                        LogOut
                    </span>
                </a>
            )}
        </div>
    );
}

export default withRouter(Header);
