// @ts-nocheck

import { deactivateUDNOrder } from '../../../src/clients/creditPlus';
import { handler, InvalidParamsError } from '../../../src/functions/cancelUDNOrder';

jest.mock('../../../src/clients/creditPlus', () => ({
  deactivateUDNOrder: jest.fn()
}))

describe('cancelUDNOrder', () => {
  test('Throws an InvalidParams error if meta does not exist on event', async () => {
    await expect(handler({
      detail: {}
    }, {}, () => { })).rejects.toThrow(InvalidParamsError)
  });

  test('Throws an InvalidParams error if resourceId does not exist on event.meta', async () => {
    await expect(handler({
      detail: {
        meta: {}
      }
    }, {}, () => { })).rejects.toThrow(InvalidParamsError)
  });

  test('should fire the Cancel-UDN-Order-Requested event', async () => {
    deactivateUDNOrder.mockReturnValue(new Promise((resolve, reject) => {
      resolve({
        statusCode: 200
      })
    }))

    expect(() => handler({
      detail: {
        meta: {
          resourceId: '123'
        }
      }
    }, {}, () => { })).not.toThrow(InvalidParamsError)
  });
});
