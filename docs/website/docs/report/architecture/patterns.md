---
title: Microservices patterns
position: 3
---

# Microservices patterns

## Communication patterns

Having opted for a microservice architecture, that components weakly coupled in nature, it was necessary to reason 
about **inter-process communication** modes. Depending on the situation, different are the modes of interaction. 
Specifically, if a microservice needs to communicate with another component to obtain information essential for completing 
a business operation, the **Remote Procedure Invocation** (*request/response*) pattern will be preferred. 
It will therefore be a *one-to-one* communication. 
Whereas, the **Asynchronous messaging** pattern (*publish/subscribe*, *one-way notifications*) will be preferred in situations 
where a microservice needs to communicate with other components simply to notify the occurrence of an event, a new state, 
or action taken by a user, etc.  In this case it could be either *one-to-one* or *one-to-many* communication.

In case of RPC, the communication will be implemented using the **REST** mechanism, using the *HTTP* protocol.
In case of asynchronous messaging, the communication will be based on **events**.

In both cases the messages format will be **text-based** such as *JSON*.



## External API patterns

### API Gateway

## Deployment patterns

## Security patterns
