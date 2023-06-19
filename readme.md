WebXR Based Video Conferencing
==============================

# How to get started:
To start the application, follow these steps:
1. Run the command npm install to install the necessary dependencies.
2. Run the command npm start to start the application.

# Home Page
The home page consists of two individual components: the input box and the modal.

## Input Box
The input box is where you enter the room name. The search parameters will be created based on the room name.
## Modal
The modal component checks the availability of the camera and prompts you to enter the VR scene if it is available.

# Jitsi low level APIs
## Connection and Room
`connection` and `room` are established first in `useCoonect` custom hook.

***If you are familiar with React and React custom hooks, you can optimize the connection code here, as it may not be optimal.***

## Events
### events on conference
- `onConnectionSuccess`: This event is triggered when the connection is successfully established. It adds events to the room.

### events on room
- `onRemoteTrack`: This event is triggered when participants join the room and add their local tracks to the room. 
- `onConferenceJoined`: This event is triggered when you join the room. It adds your local tracks to the room.
- `onUserJoined*`: This event is triggered when participants join the room. It updates the list of users.
- `onMessageReceived`: This event is triggered when receiving a message from other users.

> For more information about Jitsi, please refer to the [Jitsi Low-Level APIs guide book](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api/) or [my Jitsi note](https://docs.google.com/document/d/1PUzzVqmlZemjqmkGzMaucf6FnlFY-_CexvMZAJ_Wbyg/edit).

# A-Frame
A-Frame is a framework built on top of Three.js that is used for creating VR scenes. If you need to utilize advanced features, it is recommended to install Three.js components.
## registor components
To add various features to a component, such as recording position or adding event listeners, you need to register the component. To write external methods and apply them to specific A-Frame elements, use `AFRAME.registerComponent("componentName", {})`. Then, include the componentName in the A-Frame code to add that method to the designated element using `getElementById()` or `useRef()`. However, A-Frame does not allow a component to be registered more than once, so the `registerComponent()` function is written within the `useEffect` hook. For features that need to be registered before the component is mounted, they should be registered outside the `useEffect` hook.

***Alternatively, you can import all the registerComponent functions from another module for a better approach.*** 

## Elements
To create a plane, use `<a-plane>`. For basic shapes, you can use `<a-box>` and `<a-sphere>`. To position models or custom objects, use the `<entity>` element. To display images, use `<a-img>`.


> The documentation for A-Frame can be found at [aframe.io](https://aframe.io/docs/1.4.0/introduction/). However, for some methods, you may need to search them in the browser's search bar, for example, "aframe getposition".

# Interaction
The websocket is implemented using Jitsi Video Bridge.
## Shared Position and Rotation
The position and rotation are shared using the `sendMessage` function. The camera's position and rotation are sent to other participants every time they change. The `onMessageReceived` event is triggered when a message is received. This function updates the position and rotation of other participants or their pointers.

## Pointer
Participants can click to point at an object.
