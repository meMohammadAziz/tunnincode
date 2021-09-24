import localData from '../Data/Data.json';

// Constants
import { listed_notification, trainer_user_type, get_sidebar_list } from '../constants/constants';

export const ListNotification=(type, userType)=> {
    if(type == get_sidebar_list) {
        let data = JSON.parse(JSON.stringify(localData.notification));
        console.log("Here User", userType);
        console.log("Data:,", data);
        let sideList = data.sideList;
        for(let i=0; i<sideList.length; i++) {
            sideList[i].active = false;
            if(userType.route === sideList[i].route) {
                sideList[i].active = true;
            }
        }
        data.sideList = sideList;
        console.log("Data: ", data);
        return {
            type: listed_notification,
            payload: data,
        }
    }
    if(type == "past") {
        let cards;
        let data = JSON.parse(JSON.stringify(localData.notification));
        if(userType === trainer_user_type) {
            cards = data.cards;
            for(let i=0; i<cards.length; i++) {
                cards[i].golive = cards[i].past;
            }
        }
        else {
            cards = data.userCards;
            for(let i=0; i<cards.length; i++) {
                cards[i].golive = cards[i].past;
            }
            data.cards = data.userCards;
        }
        return {
            type: listed_notification,
            payload: data,
        }
    }
    else {
        let cards;
        let data = JSON.parse(JSON.stringify(localData.notification));
        if(userType !== trainer_user_type) {
            cards = data.userCards;
            console.log("Users: ", cards);
            for(let i=0; i<cards.length; i++) {
                cards[i].golive = cards[i].past;
                cards[i].status="Booked";
                cards[i].statusDetail = "Booked";
            }
            data.cards = data.userCards;
        }
        return {
            type: listed_notification,
            payload: data,
        }
    }
}
