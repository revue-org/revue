# Domain Driven Design

## Event Storming

------- immagine di noi alla lavagna -------

## Bounded Contexts

Discussioni che abbiamo fatto su quanti e quali Bounded context.
Business functionalities vs technical functionalities.
Metodo diverso per disaccoppiare.

### Device Monitoring

API OPERATIONS:

-   `GET /devices`

#### Ubiquitous Language

| Term                   | Meaning                                                                     | Synonyms                      |
| ---------------------- | --------------------------------------------------------------------------- | ----------------------------- |
| Camera                 | Device that records an environment and transmit the stream to the system    | Video Camera                  |
| Device                 | Device sensing data from an environment (e.g. temperature)                  | -                             |
| Device                 | Either a Camera or a Device                                                 | -                             |
| Device/Camera settings | User-modifiable configuration of data relative to a specific device         | -                             |
| Transmission interval  | The amount of time between to consecutive measurement transmission          | -                             |
| Capability             | What a sensor is able to perceive and transmit                              | -                             |
| Video Stream           | Stream of video data produced by a camera                                   | Stream, Transmission          |
| Measurement            | Data produced by a sensor                                                   | Environment data, Device data |
| Numerical measurment   | A `Measurement` with a single numerical value and a `Measurement Type`      | -                             |
| Measurement Type       | A physical dimension with its unit of measure (e.g. temperature in Celsius) | -                             |

### Alarm e recognition

#### Ubiquitous Language

| Term           | Meaning                                                                                                       | Synonyms         |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ---------------- |
| Security rule  | A condition that if not satisfied will trigger an anomaly                                                     | Rule             |
| Intrusion rule | A condition that specify that in a video stream no object of a specific object class can be recognized        | -                |
| Object class   | Type of object that the system is able to recognize                                                           | Category, Object |
| Range rule     | A condition that will trigger an Outlier if the value of a Numerical measurement is out of a determined range | -                |
| Anomaly        | Is either an intrusion or an outlier                                                                          | -                |
| Intrusion      | Detection of an unauthorized object                                                                           | -                |
| Outlier        | Numerical measurement with a value in contrast with a particular `Range rule`                                 | -                |

### Security

#### Ubiquitous Language

| Term       | Meaning                                                                                                      | Synonyms |
| ---------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| Role       | Role assigned to a specific user, only two values are admitted: Admin and Guardian                           | -        |
| Admin      | A user with the maximum level of authority, it can manage permissions of other Guardian users                | -        |
| Guardian   | A user that can only view the video stream and visualize the data produced by sensors to which he has access | Monitor  |
| User       | Either an admin or a guardian                                                                                | -        |
| Permission | A grant to view streams and data from devices in a particular location                                       | -        |

### Users

#### Ubiquitous Language

| Term         | Meaning                                                                      | Synonyms |
| ------------ | ---------------------------------------------------------------------------- | -------- |
| User         | Generic term to refer to anyone can access to the system                     | -        |
| Contact      | Contact on which the specific user will be notified when one anomaly occours | -        |
| Contact Type | Contact type of a single contact, two values are admitted: SMS and EMAIL     | -        |

### Location

#### Ubiquitous Language

| Term     | Meaning                                                                                         | Synonyms |
| -------- | ----------------------------------------------------------------------------------------------- | -------- |
| Building | Coarse grained concept of location referring to a structure (e.g. home, warehouse)              | -        |
| Room     | Fine grained concept of location referring to a single space (e.g. living room, entrance, exit) | -        |
| Location | Generic term to refer to a place                                                                | -        |

### Log

#### Ubiquitous Language

| Term       | Meaning | Synonyms |
| ---------- | ------- | -------- |
| Anomaly(?) |         |          |

### Notification

#### Ubiquitous Language

| Term                   | Meaning                                         | Synonyms |
| ---------------------- | ----------------------------------------------- | -------- |
| Notification           | Message sent to a `User` using its `Recipient`s | Alert    |
| Outlier Notification   | Notification reguarding an Outlier anomaly      | -        |
| Intrusion Notification | Notification reguarding an Intrusion anomaly    | -        |
| Recipient              | The notification target user's contact          |          |
