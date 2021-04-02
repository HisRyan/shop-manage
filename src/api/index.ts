import axios from "axios";
export function fetch(url:string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}