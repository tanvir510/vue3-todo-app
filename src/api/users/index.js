import { apiEndpoints } from "../apiEndpoints";

export class UserApi {
  static getUserDetails(userId) {
    // eslint-disable-next-line no-undef
    return axios.get(apiEndpoints.USER.USER_DETAILS(userId));
  }

  static getUserLists(payload) {
    // eslint-disable-next-line no-undef
    return axios.get(
      apiEndpoints.USER.GET_USERS,
      payload
        ? {
            params: payload,
          }
        : null
    );
  }
}
