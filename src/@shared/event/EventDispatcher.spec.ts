import { CustomerCreatedEvent } from '../../../customer/events/CustomerCreatedEvent';
import { EventDispatcher } from '../EventDispatcher';
import { SendMessageToRabbitMQEventHandler } from '../../customer/domain/events/handler/SendMessageToRabbitMQEventHandler';
import { SendEmailEventHandler } from '../../customer/domain/events/handler/SendEmailEventHandler';

describe('Domain events unit test', () => {
  it('should register an event', () => {
    const eventName = 'CustomerCreatedEvent';
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageToRabbitMQEventHandler();
    eventDispatcher.register(eventName, eventHandler);
    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
  });

  it('should register two eventos', () => {
    const eventName = 'CustomerCreatedEvent';
    const eventDispatcher = new EventDispatcher();
    const sendMessageToRMQEventHandler =
      new SendMessageToRabbitMQEventHandler();
    const sendSmsSeventHandler = new SendEmailEventHandler();
    eventDispatcher.register(eventName, sendMessageToRMQEventHandler);
    eventDispatcher.register(eventName, sendSmsSeventHandler);
    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);
  });

  it('should nofify when event occured', () => {
    const eventName = 'CustomerCreatedEvent';
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageToRabbitMQEventHandler();
    const handleSpy = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register(eventName, eventHandler);
    const customerCreatedEvent = new CustomerCreatedEvent(eventName, {
      name: 'fistName',
      surName: 'surName',
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(handleSpy).toHaveBeenCalled();
  });

  it('should nofify all events occured', () => {
    const eventName = 'CustomerCreatedEvent';
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageToRabbitMQEventHandler();
    const sendSmsEventHandler = new SendEmailEventHandler();

    const handleSpy = jest.spyOn(eventHandler, 'handle');
    const sendSmsEventHandlerSpy = jest.spyOn(sendSmsEventHandler, 'handle');

    eventDispatcher.register(eventName, eventHandler);
    eventDispatcher.register(eventName, sendSmsEventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent(eventName, {
      name: 'fistName',
      surName: 'surName',
      email: 'fake@gmail.com',
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(handleSpy).toHaveBeenCalled();
    expect(sendSmsEventHandlerSpy).toHaveBeenCalled();
  });
});
