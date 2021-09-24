import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Card,
} from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";

import Cookies from "universal-cookie";

//Date Formater
import dateFormat from "dateformat";

import moment from "moment";

// Action
import { sessionModal } from "../../actions/sessionModal";
import { addSession } from "../../actions/addSession";
import { addedSession } from "../../actions/addedSession";
import { getFetch } from "../../actions/getFetch";

// Router
import { withRouter } from "react-router-dom";

// Constants
import {
    add_session,
    add_session_modal,
    edit_session_modal,
    categories_list,
    update_created_session_api,
    user_profile_pic,
    delete_profile_pic,
} from "../../constants/constants";

// Styles
import "../../styles/newsession.scss";

// Action
// import { postFetch } from "../../actions/postFetch";
import { postFetchParams } from "../../actions/postFetchParam";

// Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Popup from "./Popup";

function AddSession(props) {
    const cookies = new Cookies();

    let sessionForm = {};
    let imageLengthSession = 0;

    const dispatch = useDispatch();
    const [uploaded_image, setImage] = useState([]);
    const [uploadedImageFile, setUploadedFile] = useState([]);
    // const [form, setform] = useState({});
    const [editForm, setEditForm] = useState({});

    const newSession = useSelector((state) => state.addSession);

    const editSession = useSelector((state) => state.addedSession);

    const categories = useSelector((state) => state.signupCategories);

    const userFetch = useSelector((state) => state.postFetch);

    const dispatchCategories = () => {
        dispatch(getFetch(categories_list));
    };

    useEffect(() => {
        dispatchNewSession();
        dispatchEditSession();
        dispatchCategories();
        dispatchSetEditedImages();
    }, []);

    const dispatchSetEditedImages = () => {
        if (props.location.hasOwnProperty("sessionDetailedId")) {
            let sessionId = props.location.sessionDetailedId;
            if (sessionId.hasOwnProperty("images")) {
                setUploadedFile(sessionId.images);
            }
        }
    };

    const dispatchNewSession = () => {
        dispatch(addSession(add_session));
    };

    const dispatchEditSession = () => {
        if (Object.keys(editSession).length > 0) {
            setEditForm(editSession.addedNewSession);
        }
    };

    const getSessionTop = () => {
        if (newSession.hasOwnProperty("data")) {
            return (
                <Row className="mb-3">
                    <Col className="d-flex align-items-center col-sm-6">
                        <h6 className="title m-0">
                            <i
                                className="icon-chevron-left"
                                onClick={() => props.history.goBack()}
                            ></i>
                            {props.history.location.pathname === "/edit-session"
                                ? "Edit Session"
                                : newSession.data.title}
                        </h6>
                    </Col>
                    <Col className="add-btn-wrapper col-sm-6">
                        <Button
                            className="addBtn"
                            type="submit"
                            // onClick={() => dispatchAction()}
                        >
                            {props.history.location.pathname === "/edit-session"
                                ? "SAVE"
                                : newSession.data.btnTitle}
                        </Button>
                    </Col>
                </Row>
            );
        }
    };

    const dispatchAction = () => {
        dispatch(addedSession(sessionForm));
        if (props.history.location.pathname === "/edit-session") {
            // dispatch(sessionModal(edit_session_modal));
            props.history.push("/notification");
            dispatchEditCreatedSession();
        } else {
            dispatch(sessionModal(add_session_modal));
            dispatchCreateSession();
        }
    };

    const dispatchEditCreatedSession = () => {
        let bodyFormData = new FormData();
        if (props.location.hasOwnProperty("sessionDetailedId")) {
            let details = props.location.sessionDetailedId;
            if (details.hasOwnProperty("_id")) {
                let sessionId = details._id;
                if (userFetch.hasOwnProperty("userLogged")) {
                    bodyFormData.append("trainerId", userFetch.userLogged._id);
                    bodyFormData.append("catId", cookies.get("category"));
                    bodyFormData.append("title", cookies.get("name_of_class"));
                    bodyFormData.append(
                        "fromTime",
                        getEpochs(
                            combineDateAndTime(
                                cookies.get("start_date"),
                                cookies.get("s_time")
                            )
                        )
                    );
                    bodyFormData.append(
                        "toTime",
                        getEpochs(
                            combineDateAndTime(
                                cookies.get("end_date"),
                                cookies.get("e_time")
                            )
                        )
                    );
                    bodyFormData.append(
                        "fromDate",
                        getEpochs(
                            combineDateAndTime(
                                cookies.get("start_date"),
                                cookies.get("s_time")
                            )
                        )
                    );
                    bodyFormData.append(
                        "toDate",
                        getEpochs(
                            combineDateAndTime(
                                cookies.get("end_date"),
                                cookies.get("e_time")
                            )
                        )
                    );
                    bodyFormData.append(
                        "to",
                        combineDateAndTime(
                            cookies.get("end_date"),
                            cookies.get("e_time")
                        )
                    );
                    bodyFormData.append(
                        "from",
                        combineDateAndTime(
                            cookies.get("start_date"),
                            cookies.get("s_time")
                        )
                    );

                    bodyFormData.append("price", cookies.get("session_price"));
                    bodyFormData.append("userLimit", userFetch.userLogged._id);
                    bodyFormData.append(
                        "requirements",
                        cookies.get("what_you_need")
                    );
                    bodyFormData.append("detail", cookies.get("about"));
                    bodyFormData.append("images", uploadedImageFile);
                }

                console.log("Body Form Data: ", bodyFormData);

                dispatch(
                    postFetchParams(
                        update_created_session_api,
                        sessionId,
                        bodyFormData
                    )
                );

                // console.log(userFetch.userLogged._id);
                // console.log(sessionForm.category);
                // console.log(sessionForm.name_of_class);
                // console.log(sessionForm.start_date);
                // console.log(sessionForm.end_date);
                // console.log(sessionForm.start_time);
                // console.log(sessionForm.end_time);
                // console.log(sessionForm.session_price);
                // console.log(sessionForm.what_you_need);
                // console.log(sessionForm.about);
                // console.log(sessionForm.uploadedImageFile);

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
            }
        }
    };

    const dispatchCreateSession = () => {
        let bodyFormData = new FormData();
        if (userFetch.hasOwnProperty("userLogged")) {
            console.log("Uploaded Image: ", uploadedImageFile);
            bodyFormData.append("trainerId", userFetch.userLogged._id);
            bodyFormData.append("catId", cookies.get("category"));
            bodyFormData.append("title", cookies.get("name_of_class"));
            bodyFormData.append(
                "fromTime",
                getEpochs(
                    combineDateAndTime(
                        cookies.get("start_date"),
                        cookies.get("s_time")
                    )
                )
            );
            bodyFormData.append(
                "toTime",
                getEpochs(
                    combineDateAndTime(
                        cookies.get("end_date"),
                        cookies.get("e_time")
                    )
                )
            );
            bodyFormData.append(
                "fromDate",
                getEpochs(
                    combineDateAndTime(
                        cookies.get("start_date"),
                        cookies.get("s_time")
                    )
                )
            );
            bodyFormData.append(
                "toDate",
                getEpochs(
                    combineDateAndTime(
                        cookies.get("end_date"),
                        cookies.get("e_time")
                    )
                )
            );
            bodyFormData.append(
                "to",
                combineDateAndTime(
                    cookies.get("end_date"),
                    cookies.get("e_time")
                )
            );
            bodyFormData.append(
                "from",
                combineDateAndTime(
                    cookies.get("start_date"),
                    cookies.get("s_time")
                )
            );

            bodyFormData.append("price", cookies.get("session_price"));
            bodyFormData.append("userLimit", userFetch.userLogged._id);
            bodyFormData.append("requirements", cookies.get("what_you_need"));
            bodyFormData.append("detail", cookies.get("about"));
            bodyFormData.append("images", uploadedImageFile);
        }

        console.log("Body Form Data: ", bodyFormData);

        var requestOptions = {
            method: "POST",
            body: bodyFormData,
            redirect: "follow",
        };

        fetch("https://api.tunnin.io/session", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

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

    const popup = useSelector((state) => state.sessionModal);

    const getImages = () => {
        if (newSession.hasOwnProperty("data")) {
            return (
                <Row>
                    <Col sm="12">
                        <p className="upload-title">{newSession.data.upload}</p>
                    </Col>
                    <Col sm="8">
                        <Row>{getuploads()}</Row>
                    </Col>
                </Row>
            );
        }
    };

    const deleteImage = (data, index) => {
        // console.log("Data: ", data);
        // console.log("Index: ", index);
        // console.log("Image: ", uploadedImageFile);
        if (userFetch.hasOwnProperty("userLogged")) {
            let trainer_id = userFetch.userLogged._id;
            let delete_image = uploadedImageFile.splice(index, 1);
            dispatch(postFetchParams(delete_profile_pic, trainer_id, ""));
            setUploadedFile(delete_image);
        }
    };

    const getuploads = () => {
        console.log("Props.location: ", props.location);
        if (newSession.hasOwnProperty("data")) {
            let cards = newSession.data.cardList;
            let cardList = cards.map((data, index) => {
                return (
                    <Col sm="3" key={index}>
                        <Card className="uploads">
                            <label htmlFor="fileUpload">
                                <div className="d-none upload-icon-wrapper">
                                    {data.icon}
                                </div>
                                {props.history.location.pathname ===
                                "/add-new-session" ? (
                                    <i className="icon-cloud"></i>
                                ) : (
                                    <div>
                                        {props.location.sessionDetailedId
                                            ? getUploadedSessionImage(
                                                  props.location
                                                      .sessionDetailedId
                                              )
                                            : ""}
                                        <span
                                            className="delete-img-wrapper"
                                            onClick={() => {
                                                deleteImage(data, index);
                                            }}
                                        >
                                            <i className="icon-delete"></i>
                                        </span>
                                    </div>
                                )}
                            </label>
                            <input
                                hidden
                                id="fileUpload"
                                type="file"
                                onChange={(e) => uploadedFile(e)}
                            />
                        </Card>
                    </Col>
                );
            });
            return cardList;
        }
    };

    const getUploadedSessionImage = (data) => {
        if (data.hasOwnProperty("images")) {
            let length = data.images.length;
            // console.log("Length: ", length);
            if (imageLengthSession < length) {
                let image = data.images.map((item, index) => {
                    imageLengthSession = imageLengthSession + 1;
                    return (
                        <img
                            alt="session img"
                            src={"https://api.tunnin.io/uploads/" + item}
                            height="120"
                            width="120"
                            key={index}
                        />
                    );
                });
                return image;
            }
        }
    };

    const getUploadedImages = () => {
        if (uploaded_image) {
            let images = uploaded_image.map((data, index) => {
                return <span key={index}>{data}</span>;
            });
            return images;
        }
    };

    const ImageThumb = ({ image }) => {
        return <img src={URL.createObjectURL(image)} alt={image.name} />;
    };

    const uploadedFile = (event) => {
        let imageFile = event.target.files[0];
        if (uploadedImageFile < 4) {
            setUploadedFile(...uploadedImageFile, imageFile);
            // if (userFetch.hasOwnProperty("userLogged")) {
            //     let trainerId = userFetch.userLogged._id;
            //     let bodyFormData = new FormData();
            //     bodyFormData.append("profilePic", imageFile);
            //     dispatch(
            //         postFetchParams(user_profile_pic, trainerId, bodyFormData)
            //     );
            // }
        }
        let image = URL.createObjectURL(imageFile);
        // console.log("Images: ", imageFile);
        setImage((uploaded_image) => [
            ...uploaded_image,
            <img src={image} alt={image.name} style={{ height: "150px" }} />,
        ]);
        // console.log("Uploaded Image: ", uploaded_image);
    };

    const giveDate = (sec) => {
        return dateFormat(Number(sec), "isoDate");
    };

    const getForm = () => {
        if (newSession.hasOwnProperty("data")) {
            let form = newSession.data.sessionForm;
            let details = props.location.sessionDetailedId;
            let trainerAndCategory = props.location.trainerAndCategory;
            let formList = form.map((data, index) => {
                return (
                    <Col key={index} sm={data.size}>
                        {window.location.pathname === "/edit-session" ? (
                            <FormGroup>
                                <Label
                                    className={
                                        data.title !== ""
                                            ? "form-title"
                                            : "form-empty-title"
                                    }
                                >
                                    {data.title}
                                </Label>
                                {data.type === "select" ? (
                                    // <select className="form-control" name={data.name} defaultValue={editSession.addedNewSession[data.name]} onChange={(e)=>{getNewSession(data.name, e.target.value)}} >
                                    //     {getOptions(data.options)}
                                    // </select>
                                    <select
                                        className="form-control"
                                        name={data.name}
                                        onChange={(e) => {
                                            getNewSession(
                                                data.name,
                                                e.target.value
                                            );
                                        }}
                                    >
                                        {getOptions(categories.data)}
                                    </select>
                                ) : (
                                    <Input
                                        required
                                        placeholder={data.placeholder}
                                        type={data.type}
                                        name={data.name}
                                        defaultValue={
                                            data.placeholder === "Rolletser Fux"
                                                ? addEditSessionData(
                                                      data.name,
                                                      details.title
                                                  )
                                                : data.placeholder ===
                                                  "Lorem Ipsum"
                                                ? addEditSessionData(
                                                      data.name,
                                                      details.requirements
                                                  )
                                                : data.placeholder ===
                                                  "Brimbistram"
                                                ? addEditSessionData(
                                                      data.name,
                                                      trainerAndCategory.trainerName
                                                  )
                                                : data.title === "About"
                                                ? addEditSessionData(
                                                      data.name,
                                                      details.detail
                                                  )
                                                : data.title === "Session Price"
                                                ? addEditSessionData(
                                                      data.name,
                                                      details.price
                                                  )
                                                : data.placeholder === "From"
                                                ? addEditSessionData(
                                                      data.name,
                                                      giveDate(details.fromDate)
                                                  )
                                                : data.placeholder === "To"
                                                ? addEditSessionData(
                                                      data.name,
                                                      giveDate(details.toDate)
                                                  )
                                                : data.placeholder === "Start"
                                                ? addEditSessionData(
                                                      data.name,
                                                      details.fromTime
                                                  )
                                                : data.placeholder === "End"
                                                ? addEditSessionData(
                                                      data.name,
                                                      details.toTime
                                                  )
                                                : ""
                                        }
                                        // defaultValue={editSession.addedNewSession[data.name]}
                                        onChange={(e) => {
                                            getNewSession(
                                                data.name,
                                                e.target.value
                                            );
                                        }}
                                    />
                                )}
                            </FormGroup>
                        ) : (
                            <FormGroup>
                                <Label
                                    className={
                                        data.title !== ""
                                            ? "form-title"
                                            : "form-empty-title"
                                    }
                                >
                                    {data.title}
                                </Label>
                                {data.type === "select" ? (
                                    // <select className="form-control" name={data.name} defaultValue={editSession.addedNewSession[data.name]} onChange={(e)=>{getNewSession(data.name, e.target.value)}} >
                                    //     {getOptions(data.options)}
                                    // </select>
                                    <select
                                        className="form-control"
                                        name={data.name}
                                        onChange={(e) => {
                                            getNewSession(
                                                data.name,
                                                e.target.value
                                            );
                                        }}
                                    >
                                        {getOptions(categories.data)}
                                    </select>
                                ) : (
                                    <Input
                                        required
                                        placeholder={data.placeholder}
                                        type={data.type}
                                        name={data.name}
                                        // defaultValue={
                                        //     editSession.addedNewSession[
                                        //         data.name
                                        //     ]
                                        // }
                                        onChange={(e) => {
                                            getNewSession(
                                                data.name,
                                                e.target.value
                                            );
                                        }}
                                    />
                                )}
                            </FormGroup>
                        )}
                    </Col>
                );
            });
            return formList;
        }
    };

    const addEditSessionData = (name, value) => {
        // console.log(name + " :0: " + value);
        getNewSession(name, value);
        return value;
    };

    const getNewSession = (key, value) => {
        var tempValue = value;
        if (key === "start_time" || key === "end_time") {
            var timedifference = new Date().getTimezoneOffset();
            var timeAndDate = moment(
                dateFormat(Number(Date.now()), "isoDate") + " " + value
            );

            var theTempTime = moment()
                .hour(timeAndDate.hours())
                .minute(timeAndDate.minutes())
                .add(timedifference, "minutes");

            var theFutureTime = moment()
                .hour(timeAndDate.hours())
                .minute(timeAndDate.minutes())
                .add(timedifference, "minutes")
                .format("hh:mm A");

            value = theFutureTime;

            if (timedifference > 0) {
                timeAndDate.hours() > theTempTime.hours()
                    ? manageDate(key, +1)
                    : manageDate(key, 0);
            } else if (timedifference < 0) {
                timeAndDate.hours() < theTempTime.hours()
                    ? manageDate(key, -1)
                    : manageDate(key, 0);
            }
        }

        cookies.set(key, value, { path: "/" });
        sessionForm[key] = value;

        if (key === "start_time") {
            cookies.set("s_time", tempValue, { path: "/" });
        }

        if (key === "end_time") {
            cookies.set("e_time", tempValue, { path: "/" });
        }
        combineDateAndTime(cookies.get("start_date"), cookies.get("s_time"));
    };

    const manageDate = (type, value) => {
        type === "start_time"
            ? cookies.set("startDateDifference", value)
            : cookies.set("endDateDifference", value);
    };

    const changeDate = (type, value) => {
        var chooseDate = new Date(value);
        chooseDate.setDate(
            chooseDate.getDate() +
                (type === "start_date"
                    ? Number(cookies.get("startDateDifference"))
                    : Number(cookies.get("endDateDifference")))
        );
        var futureDate =
            chooseDate.getFullYear() +
            "-" +
            ("0" + (chooseDate.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + chooseDate.getDate()).slice(-2);
        // console.log("******************************11223344");
        // console.log(futureDate);
        // console.log("******************************11223344");
        return futureDate;
    };

    const combineDateAndTime = (date, time) => {
        // console.log(date);
        // console.log(time);

        const timeAndDate = moment(date + " " + time)
            .utcOffset("+00:00")
            .format();

        // console.log("haha==========================haha");
        // console.log(moment(timeAndDate).valueOf());
        // console.log(timeAndDate.unix());
        // console.log("haha==========================haha");

        return timeAndDate;
    };

    const getEpochs = (timeAndDate) => {
        return moment(timeAndDate).valueOf();
    };

    const getOptions = (data) => {
        if (categories.hasOwnProperty("data")) {
            let options = data.map((data, index) => {
                if (window.location.pathname === "/edit-session") {
                    let trainerAndCategory = props.location.trainerAndCategory;
                    let details = props.location.sessionDetailedId;

                    if (trainerAndCategory.categoryName === data.categoryName) {
                        addEditSessionData("category", details.catId);
                        return (
                            // <option value={data._id} key={index}>
                            <option selected value={data._id} key={index}>
                                {data.categoryName}
                            </option>
                        );
                    } else {
                        return (
                            // <option value={data._id} key={index}>
                            <option value={data._id} key={index}>
                                {data.categoryName}
                            </option>
                        );
                    }
                } else {
                    return (
                        <option value={data._id} key={index}>
                            {data.categoryName}
                        </option>
                    );
                }
            });
            return options;
        }
    };

    // if (document.getElementById("session-form")) {
    //     // console.log("=========================================");
    //     // console.log("reseted");
    //     // console.log("=========================================");
    //     // document.getElementById("session-form").reset();
    // }

    return (
        <div className="new-session">
            {popup.popUp ? (
                props.history.location.pathname === "/edit-session" ? (
                    <Popup
                        modalState={popup}
                        action_type={edit_session_modal}
                    />
                ) : (
                    <Popup modalState={popup} action_type={add_session_modal} />
                )
            ) : (
                <div>
                    <Header />
                    <div className="container-fluid">
                        <Row>
                            <Col className="left-container">
                                <Sidebar />
                            </Col>
                            <Col className="mt-3">
                                <div
                                    className="add-session-right-container"
                                    style={{ marginTop: "-50px" }}
                                >
                                    <Form
                                        id="session-form"
                                        onSubmit={() => dispatchAction()}
                                        className="tunnin-form mt-5"
                                    >
                                        {getSessionTop()}
                                        {getImages()}
                                        {getUploadedImages()}
                                        <Row style={{ marginTop: "50px" }}>
                                            {getForm()}
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withRouter(AddSession);
