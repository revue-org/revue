---
sidebar_position: 10
---

# Event Storming

[Event Storming](https://www.eventstorming.com/) is a workshop format for quickly exploring complex business domains.
It was created by Alberto Brandolini.
The goal of Event Storming is to create a shared understanding of a domain and to identify potential problems and
opportunities.

Event Storming is composed of a series of activities that are performed in a specific order.
In the following, are presented the results of these activities.
For conciseness, some steps have been collapsed into a single section.

## Unstructured Exploration

Firstly, the domain is explored in an unstructured way.
The goal is to identify the main events (<span style="color: orange;">orange notes</span>), without any particular
order.

![Unstructured Exploration](../img/event-storming/unstructured.png)

## Timeline

Then, the events are ordered in a timeline.

![Timeline](../img/event-storming/timeline.png)

## Pivotal Events and Pain Points

At this point, the team has discussed critical points that require attention (<span style="color: pink;">pink
notes</span>).

Also, the team reasoned about the pivotal events (<span style="color: orange;">orange notes</span> with black line),
which are events with a significant impact on the domain, they are a possible symptom of a bounded context division.

![Pivotal Events and Pain Points](../img/event-storming/pivotal-pain.png)

## Actors, Commands, Policies and Read Models

In these steps, the team has identified the following elements:
- **Commands** (<span style="color: blue;">blue notes</span>): actions that trigger events.
- **Actors** (<span style="color: yellow;">yellow notes</span>): entities that perform commands.
- **Policies** (<span style="color: purple;">purple notes</span>): rules that trigger events, no actor is involved.
- **Read Models** (<span style="color: green;">green notes</span>): data that is read in a particular context.

![Actors, Commands, Policies and Read Models](../img/event-storming/actors-commands-policies-read.png)

## Aggregates

The team collected related events and grouped them into aggregates.

![Aggregates](../img/event-storming/aggregates.png)

## Bounded Contexts

Finally, the team has identified the bounded contexts basing on the aggregates and interactions between them.

![Bounded Contexts](../img/event-storming/bounded-contexts.png)


