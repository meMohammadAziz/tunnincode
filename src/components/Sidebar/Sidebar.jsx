import React, { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from "react-redux";

// Action
import { ListNotification } from '../../actions/notification';
import { getSideBarList } from '../../actions/sidebarList';

// Router
import { withRouter } from 'react-router-dom';

// Constants
import { listed_notification, get_sidebar_list } from '../../constants/constants';

// Styles
import '../../styles/notifications.scss';

function Sidebar(props) {

    const [userType, setUserType] = useState('');

    const dispatch = useDispatch();
    const getNotification = useSelector(state => state.notification);
    const userInfo = useSelector(state => state.postFetch);

    useEffect(() => {
        dispatchNotification();
        dispatchCheckUser();
    }, []);

    const dispatchNotification=()=> {
        dispatch(ListNotification(listed_notification));
    }

    const dispatchCheckUser=()=> {
        if (userInfo.hasOwnProperty('userLogged')) {
            setUserType(userInfo.userLogged.userType);
        }
    }



    const routeTo=(location, data)=> {
        props.history.push(location);
    }


    if(getNotification.hasOwnProperty('data')) {
        let lists = getNotification.data.sideList;
        if(props.location.pathname === "/my-earnings") {
            lists[1].active = true;
        } 
        else
        if(props.location.pathname === "/notification" || props.location.pathname.includes("session")) {
            lists[0].active = true;
        }
        else 
        if(props.location.pathname === "/payouts") {
            lists[2].active = true;
        } 
        else
        if(props.location.pathname === "/ratings") {
            lists[3].active = true;
        }
        else {
            lists[4].active = true;
        }
    }

    const getSidebar=()=> {
        if(getNotification.hasOwnProperty('data')) {
            let lists = getNotification.data.sideList;
            let sidebar = lists.map((data, index)=> {
                return(
                    <li key={index} className={data.active ? "list active": "list"} onClick={()=>routeTo(data.route, data)}>
                        <i className={data.icon}></i>{data.name}
                    </li>
                )
            })
            return sidebar;
        }       
    }

    return(
        <ul>
            {userType === "user" ?
                        '' :
                getSidebar()
            }
        </ul>
    )

}

export default withRouter(Sidebar);