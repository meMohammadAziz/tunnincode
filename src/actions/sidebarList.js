import localData from '../Data/Data.json';

// Constants
import { trainer_user_type } from '../constants/constants';

export const getSideBarList=(type)=> {
    if(type == trainer_user_type) {        
        let data = JSON.parse(JSON.stringify(localData.sideBarList));
        console.log("Type: ", type);
        return {
            type: trainer_user_type,
            payload: data,
        }
    }
}
