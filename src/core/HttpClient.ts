import axios from 'axios';
import { HttpRequest } from '../types/HttpRequest';

export const HttpClient = async (request: HttpRequest) => {
  const config = {
    method: request.method,
    url: request.url,
    headers: request.headers,
    data: request.body,
    validateStatus: () => true // מונע זריקת שגיאות אוטומטית
  };
  const res = await axios(config);
  return res;
};
