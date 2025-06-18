import { HttpRequest } from './HttpRequest';

export interface ITestService {
  prepareRequest(data: any): HttpRequest;
}
