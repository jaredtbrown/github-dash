import { LoggerError } from "@revolutionmortgage/rm-logger";
import { Handler, EventBridgeHandler, EventBridgeEvent } from "aws-lambda";
import get from 'lodash/get';
import { deactivateUDNOrder } from "../clients/creditPlus";

interface Detail {
  event: string;
  meta: {
    resourceId: string;
  }
}

// type Handler = EventBridgeHandler

type Event = EventBridgeEvent<'Loan', Detail>;

export class InvalidParamsError extends LoggerError {
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

/**
 * Hook handler
 * @param {CancelUDNOrderEventDetail} event
 * @returns {Promise<any>}
 */
export const handler: Handler<Event, boolean> = async (event: Event): Promise<any> => {
  const detail = get(event, 'detail') as Detail;

  if (!event.detail.meta || !event.detail.meta.resourceId) {
    throw new InvalidParamsError('Event missing required properties', event);
  }

  //TODO: GET udn order from DB
  const udnOrder = {
    firstName: '',
    lastName: '',
    socialSecurityNumber: '',
    orderId: ''
  }

  await deactivateUDNOrder(udnOrder)

  //TODO: Put an event on the CP event bus to say canceling this order has been requested
};