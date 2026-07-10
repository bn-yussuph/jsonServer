import axios from 'axios';

class StatsSrvc {
    async addWardState(payload){
        console.log(payload);
        return axios.post(`${process.env.BASE_URL}/states`, payload)
            .then((res) => {
                console.log("Ward State Added: ", res.data);
                return res.data;
            })
            .catch(err => console.log(err));
    }

    async addWardStates(file){
        if(!file){
            return "No file."
        }

        for(let state of file){
            // let jsonState = JSON.stringify(state, null);
            // console.log("Adding state: ", jsonState);
            await this.addWardState(state);
        }
        return {"success": true, "message": "All states added successfully."};
    }
}

const statsSrvc = new StatsSrvc();

export default statsSrvc;