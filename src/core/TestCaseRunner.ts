import { HttpClient } from './HttpClient';
import { diff } from 'deep-object-diff';
import { ITestService } from '../types/ITestService';
import { HttpRequest } from '../types/HttpRequest';

export class TestCaseRunner {
  static async run(
    {
      name,
      request,
      expected,
      ignoreFields = [],
      generateCurl = false,
      expectedStatus = 200
    }: {
      name: string;
      request: HttpRequest;
      expected: any;
      ignoreFields?: string[];
      generateCurl?: boolean;
      expectedStatus?: number;
    },
    service: ITestService
  ) {
    const res = await HttpClient(request);

    if (generateCurl) {
      const curl = this.generateCurl(request);
      console.log(`\n--- CURL for ${name} ---\n${curl}\n`);
    }

    if (res.status !== expectedStatus) {
      throw new Error(`❌ Test '${name}' failed. Expected status ${expectedStatus} but got ${res.status}`);
    }

    const actual = res.data;
    const cleanedActual = { ...actual };
    const cleanedExpected = { ...expected };
    for (const field of ignoreFields) {
      delete cleanedActual[field];
      delete cleanedExpected[field];
    }

    const difference = diff(cleanedExpected, cleanedActual);
    if (Object.keys(difference).length > 0) {
      throw new Error(`❌ Test '${name}' failed.\nDiff:\n${JSON.stringify(difference, null, 2)}`);
    }
  }

  static generateCurl(request: HttpRequest): string {
    const method = request.method;
    const url = request.url;
    const headers = request.headers || {};
    const body = request.body ? `--data '${JSON.stringify(request.body)}'` : '';
    const headerStr = Object.entries(headers)
      .map(([key, value]) => `-H '${key}: ${value}'`)
      .join(' ');
    return `curl -X ${method} ${headerStr} ${body} '${url}'`;
  }
}
