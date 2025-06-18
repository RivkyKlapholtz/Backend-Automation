import { describe, it, expect, test } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UserService } from '../services/UserService';
import { ignoredFieldsMap } from '../data/ignored-fields';
import { TestCaseRunner } from '../core/TestCaseRunner';
import { HttpClient } from '../core/HttpClient';

const service = new UserService();
const testCasesDir = join(__dirname, '../../test-cases/user');

describe('User API Tests', () => {
  const cases = [
    { name: 'create-user', useRunner: true, genCurl: true, ignore: true, status: 201 },
    { name: 'get-user', useRunner: true, genCurl: false, ignore: true, status: 200 },
    { name: 'get-user', useRunner: false, genCurl: false, ignore: false, status: 200 },
  ];

  for (const { name, useRunner, genCurl, ignore, status } of cases) {
    const input = JSON.parse(readFileSync(join(testCasesDir, `${name}.input.json`), 'utf-8'));
    const expected = JSON.parse(readFileSync(join(testCasesDir, `${name}.expected.json`), 'utf-8'));
    const request = service.prepareRequest(input);

    if (useRunner) {
      test(name, async () => {
        await TestCaseRunner.run({
          name,
          request,
          expected,
          ignoreFields: ignore ? ignoredFieldsMap.user : [],
          generateCurl: genCurl,
          expectedStatus: status
        }, service);
      });
    } else {
      test(`${name} (manual)`, async () => {
        const res = await HttpClient(request);
        expect(res.status).toBe(status);
        expect(res.data).toMatchObject(expected);
      });
    }
  }
});
