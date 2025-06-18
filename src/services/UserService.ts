import { ITestService } from '../types/ITestService';
import { HttpRequest } from '../types/HttpRequest';
import { endpoints } from '../data/endpoints';

export class UserService implements ITestService {
  prepareRequest(data: any): HttpRequest {
    if (data.method === 'GET') {
      const query = new URLSearchParams(data.query || {}).toString();
      return {
        method: 'GET',
        url: `${endpoints.user}${query ? `?${query}` : ''}`,
        headers: { 'Accept': 'application/json' }
      };
    }
    return {
      method: 'POST',
      url: endpoints.user,
      headers: { 'Content-Type': 'application/json' },
      body: data.body
    };
  }
}
