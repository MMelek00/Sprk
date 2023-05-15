import handler from "@/pages/api/products/[id]";
import { RequestMethod, createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from "next";


describe("Get /api/products/[id]", () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const {
      req,
      res,
    }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
    req.headers = {
      'Content-Type': 'application/json',
    };
    req.query = { id: '4311527127771' };
    return { req, res };
  }
  it('returns a message with the specified product', async () => {
    const { req, res } = mockRequestResponse();
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });
});
//TODO cover all cases of API calls
