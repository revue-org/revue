---
title: Web of Things
position: 1
---

# Web of Things

## Introduction

Revue is born with the aim of being as much as possible a flexible and scalable system.
With this perspective, the system has been designed to be compliant with the **Web of Things** (WoT) standards.
WoT is a paradigm that standardizes the interactions between Internet of Things (IoT) devices, enabling them to integrate with the web, and in this case, with the Revue system. 

## Thing Descriptor

The Web of Things (WoT) architecture is based on the concept of "Thing" that can be accessed and controlled over the web.
A **Thing Description** (TD) is a core component of WoT, acting as a formal description of a "Thing" (IoT device or entity).

To be compliant with the WoT standards, Revue in his Device Management module contains a WoT Consumer that is able to consume TDs and interact with the devices described in them.
This interaction model has been possible thanks to the flexibility of the WoT standards that exploit the RESTful APIs at level 3 of the Richardson Maturity Model.
Interactions are based on the **Hypermedia As The Engine Of the Application State** (HATEOAS) principle.

## Fundamental Concepts 

### Affordance
Since the WoT standards are based on the RESTful APIs, on the Web, the interaction with the devices is based on the affordance concept.
Affordance is a property of an object that indicates how the object can be used and interacted with.
It is important to abstract in a way that the user can understand how to interact with the device without knowing other implementation details.
In Revue, all the possible interactions are kept easy to understand. 

### Data Schemas
The data schemas are a fundamental part of the WoT standards defining the structure of the data that can be exchanged between the system and the devices.
Like in all communication protocols, the data schemas are a key point to ensure the compatibility between devices and the system.

### Security
Defines the security mechanisms that can be used to interact with the devices.
In Revue, the sample thing descriptor uses the 'nosec' security scheme that is just a placeholder for the security definition,
but in a real scenario, it should be replaced with a real security scheme like a JWT token.
If no security scheme is defined, the Thing is considered as public and free to use.

### Protocol Bindings
The protocol bindings define the communication protocols that can be used to interact with the devices.
In Revue, the protocol binding used is the HTTP protocol for simple interactions, 
but in the case of sensor, the Kafka protocol (binary over TCP) is used to stream the data.

## Revue WoT Component

The Revue WoT Component is a core part of the system that allows the interaction with the devices described in the TDs.
To implement this component, Revue makes use of the [node-wot](https://github.com/eclipse-thingweb/node-wot) framework written in Node.js
that with a good level of abstraction simplifies the interaction with the devices.

<Summary title="Example: retrieving the status property of a device">

```javascript
const td = await this.wot.requestThingDescription(
  `http://${device.endpoint.ipAddress}:${device.endpoint.port}/device`
)
const thing = await this.wot.consume(td)
const data: any = await thing.readProperty('status')
const deviceStatus = await data.value()
```

</Summary>

Using this framework, all low-level details are abstracted, permitting to focus on the business logic of the system.

## Revue Sample Thing

With the Revue system, a [Sample Thing](https://github.com/revue-org/revue-sample-thing) has been created.
This sample thing is a device that can be managed by the Revue system and is compliant with the WoT standards.
In this case, the sample thing is a device with two capabilities: _Sensing_ and _VideoStreaming_.

### Static Metadata

Static metadata is the metadata not expected to change during the lifetime of the device and contains high-level information about the device and its TD.
In the sample thing, the static metadata contains the device id, the device type, the device title and a human-readable description.

<Summary title="Sample thing static metadata">

```javascript
{
    context: [
    'https://www.w3.org/2022/wot/td/v1.1',
    {
      cred: 'https://www.w3.org/2018/credentials#',
      sec: 'https://w3id.org/security#'
    }
  ], 
    id: 'urn:dev:wot:thing-1',
    type: 'Device',
    title: 'device',
    description: 'Thing Descriptor for a Revue Sample Device',
    securityDefinitions: {
      nosec_sc: {
        scheme: 'nosec'
      }
    },
    security: ['nosec_sc']
}
```

</Summary>

The **Context** field is important in JSON-LD documents to define the used vocabulary in the TD. 
In this case, the [WoT TD v1.1](https://www.w3.org/TR/wot-thing-description11/) has been used.

### Main Features

#### Properties
Properties represent dynamic attributes of the Thing.
In Revue, a fundamental property is the status of the device.

<Summary title="Example: properties of a device">

```javascript
properties: {
  status: {
    type: 'object',
      properties: {
      id: {
        type: 'string'
      },
      location: {
        type: 'string'
      },
      enabled: {
        type: 'boolean'
      },
      capabilities: {
        type: 'array',
          items: {
          type: 'object',
            scheme: {
            anyOf: [
              {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['sensor']
                  },
                  capturingInterval: {
                    type: 'number'
                  },
                  measure: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        enum: ['temperature', 'humidity', 'pressure']
                      },
                      unit: {
                        type: 'string',
                        enum: ['celsius', 'fahrenheit', 'percentage', 'pascal', 'bar']
                      } } } }
              },
              {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['camera']
                  },
                  resolution: {
                    type: 'string',
                    enum: ['576p', '720p', '1080p', '4k']
                  } } } ] }
        }
      }
    },
    observable: true,
      readOnly: true,
      forms: [
      {
        contentType: 'application/json',
        op: ['readproperty']
      }
    ]
  }
}
```

</Summary>

With the keyword *anyOf* it is possible to define a property that can have different but supported data schemas.

#### Actions
Actions represent operations that can be invoked on the Thing.

<Summary title="Example: actions of a device">

```javascript
actions: {
  toggle: {
    input: {
      type: 'object',
        properties: {
        enable: {
          type: 'boolean'
        }
      },
      required: ['enable']
    },
    output: {
      type: 'string'
    },
    forms: [
      {
        op: 'invokeaction',
        contentType: 'application/json'
      }
    ]
  }
}
```

</Summary>

In the sample thing, an action called *toggle* has been defined that allows enabling or disabling the device.

#### Events
Events represent asynchronous notifications that can be emitted by the Thing.

<Summary title="Example: events of a device">

```javascript
events: {
  produce: {
    data: { type: 'object' },
    forms: [
      {
        href: 'kafka://broker.kafka.example.com:9092/measurements.thing-1',
        subprotocol: 'kafka'
      }
    ]
  }
}
```

</Summary>

In the sample thing, an event called *produce* has been defined that emits the data produced by the sensors.
Note the protocol binding specifying that the data will be sent to a Kafka broker using the Kafka protocol, on a topic named *measurements.thing-1*.

## Conclusion

In conclusion, the Revue system is compliant with the Web of Things standards, allowing the interaction with the devices in a simple and flexible way.
The system for now is able to interact only with devices with a simple behavior and with limited capabilities.