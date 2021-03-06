import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://jobly-backend-sang.herokuapp.com/";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...
  static async getCompanies(params={}) {
    let res = await this.request(`companies`, params);
    return res.companies;
  }

  static async getJobs(params={}) {
    let res = await this.request("jobs", params);
    return res.jobs;
  }

  static async signUp(params) {
    let res = await this.request("auth/register", params, "POST");
    return res.token;
  }

  static async signIn(params) {
    let res = await this.request("auth/token", params, "POST");
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async apply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
    return res.applied;
  }

}

// for now, put token ("testuser" / "password" on class)

// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;