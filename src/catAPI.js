import Axios from "axios";
var localhost = "https://api.thecatapi.com/v1/images/search?limit=";

export function GetCats(callback) {
    var limit = 1;
     Axios.get(localhost + limit).then(response => {    
     callback(response.data);
   });
   
 }