import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, CardText, CardTitle } from "reactstrap";

import Cookies from "universal-cookie";

//Date Formater
// import dateFormat from "dateformat";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Action
import { ListNotification } from "../../actions/notification";
import { getFetchParam } from "../../actions/getFetchParam";
import { postFetch } from "../../actions/postFetch";

// Router
import { withRouter } from "react-router-dom";

import { get_auth, notification_route } from "../../constants/constants";

import moment from "moment";

// Constants
import {
  listed_notification,
  trainer_user_type,
  upcoming_session,
  upcoming_client_sessions,
  client_user_type,
  upcoming,
  past,
  past_sessions,
  past_client_sessions,
  routeAgora,
} from "../../constants/constants";

// Styles
import "../../styles/notifications.scss";

// Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import App from "../Agora/App";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function Notification(props) {
  const forceUpdate = useForceUpdate();
  let lists;

  const cookies = new Cookies();
  const [userType, setUserType] = useState("");
  const [callAgora, setAgora] = useState(false);
  const [sessionType, setSessionType] = useState();
  const [sessionTime, setSessionTime] = useState(true);

  const dispatch = useDispatch();
  const getNotification = useSelector((state) => state.notification);

  const userInfo = useSelector((state) => state.postFetch);

  const sessions = useSelector((state) => state.getApi);

  const dispatchCheckUser = () => {
    if (userInfo.hasOwnProperty("userLogged")) {
      console.log("User: ", userInfo.userLogged.userType);
      if (userInfo.userLogged.userType === client_user_type) {
        setUserType(userInfo.userLogged.userType);
        dispatch(
          ListNotification(listed_notification, userInfo.userLogged.userType)
        );
        // UpComing Sessions By Default
        let userId = userInfo.userLogged._id;

        setSessionType(upcoming);
        dispatch(getFetchParam(upcoming_client_sessions, userId));
      } else {
        setUserType(userInfo.userLogged.userType);
        dispatch(
          ListNotification(listed_notification, userInfo.userLogged.userType)
        );
        // UpComing Sessions By Default
        let userId = userInfo.userLogged._id;
        setSessionType(upcoming);
        dispatch(getFetchParam(upcoming_session, userId));
      }
    }
  };

  useEffect(() => {
    dispatchCheckUser();
    dispatchNotification();
    dipatchGetCards();

    if (userInfo.hasOwnProperty("userLogged")) {
      if (userInfo.userLoginStatus === 200) {
        props.history.push(notification_route);
      }
    }
    dispatch(
      postFetch(get_auth, {
        username: cookies.get("username"),
        password: cookies.get("password"),
      })
    );
  }, [lists, userInfo.hasOwnProperty("userLogged")]);

  // userInfo = useSelector((state) => state.getFetch);
  const dipatchGetCards = () => {
    if (sessions.hasOwnProperty("upcomingSession")) {
    }
  };

  const dispatchNotification = () => {
    dispatch(ListNotification(listed_notification, userType));
  };

  const getCards = () => {
    if (sessionType === past) {
      if (sessions.hasOwnProperty("pastSession")) {
        lists = sessions.pastSession;
        console.log(lists);
      }
    } else {
      if (sessions.hasOwnProperty("upcomingSession")) {
        lists = sessions.upcomingSession;
      }
    }
    if (lists instanceof Array) {
      let cards = lists.map((data, index) => {
        // console.log("********1122********");
        var date = moment(data.from).format();
        // console.log("date : " + date);

        var todayDate = moment().format();
        // console.log("today : " + todayDate);

        const dateDifference = moment(date).diff(moment(todayDate));
        // console.log("diff : " + dateDifference);
        let statusLive = false;

        if (
          dateDifference / (1000 * 60) <= 0 &&
          dateDifference / (1000 * 60) >= -15
        ) {
          statusLive = true;
        } else if (dateDifference / (1000 * 60) > 0) {
          setTimeout(() => {
            // console.log("run timeout");
            statusLive = true;
            forceUpdate();
          }, dateDifference - 0);
        }
        // console.log("t diff : ");
        // console.log(dateDifference - 0);
        // console.log("***************************");
        // let btnLive = document.getElementsByClassName('btn-live')
        // console.log(btnLive.value)
        console.log(statusLive);

        return (
          <div key={index} className="session-cards">
            <Card
              body
              className={statusLive ? "cardLive" : "card-style cardNonLive"}
            >
              {/* <Card body className="cardLive"> */}
              <div className="card-content">
                <div>
                  <CardTitle tag="h5">{data.title}</CardTitle>
                  <CardText>
                    {getDate(data.from)}
                    {/* {fromDate} */}
                  </CardText>
                  <CardText>
                    {getTime(data.from)} - {getTime(data.to)}
                  </CardText>
                </div>
                {userType && userType === "user" ? (
                  <div>
                    {data.status !== "Booked" ? (
                      <CardText>{data.status}</CardText>
                    ) : (
                      ""
                    )}
                    {/* <Button onClick={() => { cardRouteUser(data, index) }}>View Details</Button> */}
                  </div>
                ) : (
                  <div>
                    <CardText className="session-amount">
                      ${data.price}
                    </CardText>
                    <CardText>{data.detail}</CardText>
                  </div>
                )}
              </div>
              {userType &&
              userType === trainer_user_type &&
              statusLive &&
              statusLive ? (
                <Button
                  className="btn-live"
                  onClick={() => {
                    cardRouteAgora(data);
                  }}
                >
                  Go Live
                </Button>
              ) : userType &&
                userType === trainer_user_type &&
                statusLive &&
                statusLive ? (
                <Button
                  className="btn-live"
                  onClick={() => {
                    cardRouteAgora(data);
                  }}
                >
                  Go Live
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    cardRouteUserDetails(data, index);
                  }}
                >
                  View Details
                </Button>
              )}
            </Card>
          </div>
        );
      });
      return cards;
    }
  };

  const getTime = (date) => {
    // console.log("************");
    // console.log("date1 : " + date);

    date = moment(date).format("hh:mm A");

    // console.log("date : " + date);
    // console.log("************");
    return date;
  };

  const getDate = (date) => {
    // console.log("************");
    // console.log("date1 : " + date);

    date = moment(date).format("DD MMMM, YYYY");

    // console.log("date : " + date);
    // console.log("time : " + time);

    // console.log("************");
    return date;
  };

  const cardRouteAgora = (data) => {
    props.history.push({
      pathname: routeAgora,
      sessionRes: data,
    });
  };

  const cardRoute = (data, index) => {
    if (data.golive === data.past) {
      props.history.push(data.routeTo);
    } else {
      //setAgora(true);
      props.history.push(data.routeToTest);
    }
  };

  const cardRouteUser = (data, index) => {
    props.history.push({
      pathname: data.routeTo,
      state: data,
    });
  };

  const cardRouteUserDetails = (data, index) => {
    data.routeTo = "/session-details";
    props.history.push({
      pathname: data.routeTo,
      state: data,
    });
  };

  const getBtns = () => {
    if (getNotification.hasOwnProperty("data")) {
      let btnList = getNotification.data.btns;
      if (userType !== trainer_user_type) {
        btnList = JSON.parse(JSON.stringify(getNotification.data.btns));
        for (let i = 0; i < btnList.length; i++) {
          btnList[i].flag = btnList[i].sessionType;
        }
      }

      let btns = btnList.map((data, index) => {
        if (data.title === "Upcoming Session") {
          return (
            <div key={index} className="session-btns">
              {data.flag ? (
                <Button
                  // style={{"backgroundColor" : "#D0A592", "color": "#262744"}}
                  color="outline-secondary"
                  className={sessionTime ? "true-btn active" : "true-btn"}
                  // className={props.location.hash === "#/upcoming-sessions" ? "true-btn" : "false-btn" }
                  // className="selected-session"
                  onClick={(e) => {
                    routeTo(data, index);
                    setSessionTime(true);
                    e.preventDefault();
                  }}
                >
                  {data.title}
                </Button>
              ) : (
                ""
              )}
            </div>
          );
        } else if (data.title === "+ Add New Session") {
          return (
            <div key={index} className="session-btns">
              {data.flag ? (
                <Button
                  color="outline-secondary"
                  className={data.sessionType ? "true-btn" : "false-btn"}
                  // className={"false-btn"}
                  onClick={() => {
                    removeCookies();
                    routeTo(data, index);
                  }}
                >
                  {data.title}
                </Button>
              ) : (
                ""
              )}
            </div>
          );
        } else {
          return (
            <div key={index} className="session-btns">
              {data.flag ? (
                <Button
                  color="outline-secondary"
                  className={sessionTime ? "true-btn" : "true-btn active"}
                  onClick={() => {
                    routeTo(data, index);
                    setSessionTime(false);
                  }}
                >
                  {data.title}
                </Button>
              ) : (
                ""
              )}
            </div>
          );
        }
      });
      return btns;
    }
  };
  const removeCookies = () => {
    cookies.set("name_of_class", "");
    cookies.set("category", "");
    cookies.set("start_date", "");
    cookies.set("end_date", "");
    cookies.set("start_time", "");
    cookies.set("end_time", "");
    cookies.set("session_price", "");
    cookies.set("about", "");
    cookies.set("what_you_need", "");
    cookies.set("name_of_trainer", "");
  };

  const routeTo = (data, index) => {
    if (data.sessionType) {
      let userId = userInfo.userLogged._id;
      console.log("Data: ", data);
      if (data.route === past) {
        // Past Sessions On Click
        if (userType === client_user_type) {
          setSessionType(past);
          dispatch(getFetchParam(past_client_sessions, userId));
        } else {
          setSessionType(past);
          dispatch(getFetchParam(past_sessions, userId));
        }
      } else {
        // UpComing Sessions On Click
        if (userType === client_user_type) {
          setSessionType(upcoming);
          dispatch(getFetchParam(upcoming_client_sessions, userId));
        } else {
          setSessionType(upcoming);
          dispatch(getFetchParam(upcoming_session, userId));
        }
      }
      dispatch(ListNotification(data.route, userType));
    } else {
      props.history.push(data.route);
    }
  };

  return (
    <div className="notifications">
      <Header />
      <div className="container-fluid">
        <Row>
          {userType === "user" ? (
            ""
          ) : (
            <Col className="left-container">
              <Sidebar />
            </Col>
          )}
          <Col sm="9" className="custom-offset">
            <div className="session-btn-wrapper">{getBtns()}</div>
            <div className="session-cards-wrapper">{getCards()}</div>
            {callAgora ? <App /> : ""}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default withRouter(Notification);
