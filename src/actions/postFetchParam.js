// Constants
import { url, fine_res } from '../constants/api_env';
// axios
import axios from 'axios';

// Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export const postFetchParams = (dataType, params, body) => {
    return async (dispatch) => {
        console.log("DataType: ", dataType);
        console.log("Params: ", params);
        console.log("Full: ", url+dataType+params+body);
        try {
            let res = await axios.post((url+dataType+params),body);
            if (res.status === fine_res) {
                let { data } = res.data;
                toast.success('Success', {position: toast.POSITION.BOTTOM_RIGHT});
                dispatch({
                    type: dataType,
                    payload: data,
                    status: res.status
                });
            }
        }
        catch (error) {
            console.log("Complete Err: ", error.response);
            toast.error(error.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: false});
            dispatch({
                type: dataType,
                payload: error.response,
            });
        }
    }
}
