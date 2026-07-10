import axios from "axios";

class WardsSrvc{
    async getWards(){
        return await axios.get(`${process.env.BASE_URL}/wards`)
            .then((res) => {
                // console.log("wardsSrvc: ", res.data);
                return res.data;
            })
            .catch(err => console.log(err));
    }
}

const wardsSrvc = new WardsSrvc();

export default wardsSrvc;