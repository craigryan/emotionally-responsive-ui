/**
 * @jest-environment node
 */

import { GET, GetResponse } from './route';

describe('Healthcheck API', () => {
    describe('GET', () => {
        it('should return a JSON response with status ok', async () => {
            const response = GET();
            const responseJSON: GetResponse = (await response.json()) as GetResponse;

            expect(response.status).toBe(200);
            expect(responseJSON).toEqual({ status: 'ok' });
        });
    });
});
