"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[4128],{9938:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var s=n(4848),t=n(8453);const r={sidebar_position:40},a="Detailed Design",o={id:"report/design/detailed-design",title:"Detailed Design",description:"N.B. In the diagrams of this section, interface notation has been used to represent the main concepts, however this will",source:"@site/docs/report/design/detailed-design.mdx",sourceDirName:"report/design",slug:"/report/design/detailed-design",permalink:"/revue/docs/report/design/detailed-design",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Microservices patterns",permalink:"/revue/docs/report/design/architecture/patterns"},next:{title:"Implementation",permalink:"/revue/docs/category/implementation"}},c={},d=[{value:"Packages",id:"packages",level:2},{value:"Domain Events",id:"domain-events",level:2},{value:"Microservices",id:"microservices",level:2},{value:"Auth",id:"auth",level:3},{value:"User",id:"user",level:3},{value:"Device",id:"device",level:3},{value:"Monitoring",id:"monitoring",level:3},{value:"Alarm",id:"alarm",level:3},{value:"Recognition",id:"recognition",level:3},{value:"Notification",id:"notification",level:3},{value:"Log",id:"log",level:3}];function l(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",strong:"strong",...(0,t.R)(),...e.components},{Image:r}=i;return r||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Image",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"detailed-design",children:"Detailed Design"})}),"\n",(0,s.jsx)(i.p,{children:"N.B. In the diagrams of this section, interface notation has been used to represent the main concepts, however this will\nthen be encoded appropriately based on the microservice technology."}),"\n",(0,s.jsx)(i.h2,{id:"packages",children:"Packages"}),"\n",(0,s.jsx)(i.p,{children:"Each microservice has a package structure that is similar to the following:"}),"\n",(0,s.jsx)(r,{src:n(8486).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h2,{id:"domain-events",children:"Domain Events"}),"\n",(0,s.jsxs)(i.p,{children:["All domain events are part of the ",(0,s.jsx)(i.strong,{children:"Shared Kernel"})," and are used by all microservices.\nThe following diagram shows the domain events used in the system:"]}),"\n",(0,s.jsx)(r,{src:n(5183).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h2,{id:"microservices",children:"Microservices"}),"\n",(0,s.jsx)(i.h3,{id:"auth",children:"Auth"}),"\n",(0,s.jsxs)(i.p,{children:["The Auth microservice is responsible for managing the authentication and authorization of users.\n",(0,s.jsx)(i.strong,{children:"User"})," entity here, has a focus on the authentication and authorization mechanisms."]}),"\n",(0,s.jsx)(r,{src:n(9852).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h3,{id:"user",children:"User"}),"\n",(0,s.jsxs)(i.p,{children:["The User microservice is responsible for managing user data.\nThe vision of the ",(0,s.jsx)(i.strong,{children:"User"})," entity here is different from the Auth microservice, as it focuses on the user's personal\ndata."]}),"\n",(0,s.jsx)(r,{src:n(3).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h3,{id:"device",children:"Device"}),"\n",(0,s.jsxs)(i.p,{children:["The Device microservice is responsible for managing the devices.\nThe focus here is on the ",(0,s.jsx)(i.strong,{children:"Capability"})," concept, which allows the device to have multiple and flexible types of\nfunctionalities."]}),"\n",(0,s.jsxs)(i.p,{children:["Moreover, ",(0,s.jsx)(i.strong,{children:"DeviceService"})," has an important role because it encapsulates the business logic for the device management\nand connection using Web of Things (WoT) standard."]}),"\n",(0,s.jsx)(r,{src:n(5960).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h3,{id:"monitoring",children:"Monitoring"}),"\n",(0,s.jsx)(i.p,{children:"The Monitoring microservice has the responsibility of continuously listening to the devices and collecting the data."}),"\n",(0,s.jsx)(r,{src:n(1116).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h3,{id:"alarm",children:"Alarm"}),"\n",(0,s.jsx)(i.p,{children:"The Alarm microservice is responsible for managing security rules and for triggering anomalies when a rule is violated."}),"\n",(0,s.jsxs)(i.p,{children:["When a ",(0,s.jsx)(i.code,{children:"SecurityRule"})," is violated, an ",(0,s.jsx)(i.code,{children:"Anomaly"})," is created and published."]}),"\n",(0,s.jsx)(r,{src:n(2027).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h3,{id:"recognition",children:"Recognition"}),"\n",(0,s.jsx)(i.p,{children:"The Recognition microservice is an ad-hoc service used to perform object recognition on devices' video streams."}),"\n",(0,s.jsx)(r,{src:n(5793).A,align:"center",width:"50%"}),"\n",(0,s.jsx)(i.h3,{id:"notification",children:"Notification"}),"\n",(0,s.jsxs)(i.p,{children:["In the Notification microservice, the focus is on the ",(0,s.jsx)(i.code,{children:"Notification"})," entity, which is created whenever a ",(0,s.jsx)(i.code,{children:"DomainEvent"}),"\nis triggered.\nIn this way, the system can notify the user about all possible events that occur."]}),"\n",(0,s.jsx)(r,{src:n(1351).A,align:"center",width:"70%"}),"\n",(0,s.jsx)(i.h3,{id:"log",children:"Log"}),"\n",(0,s.jsxs)(i.p,{children:["Log microservice is an ad-hoc service used to store the major part of the system's data.\nIn particular, it stores all the ",(0,s.jsx)(i.code,{children:"Anomalies"})," detected by the Alarm microservice and all the ",(0,s.jsx)(i.code,{children:"Measurements"})," collected by\nthe physical devices."]}),"\n",(0,s.jsx)(r,{src:n(2138).A,align:"center",width:"70%"})]})}function h(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},5183:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/domain-events-a6ea68d025b5fcbcfd7641f881ad533e.png"},2027:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/alarm-73598dca14b2aadcb4a8ff5f9dd3c329.png"},9852:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/auth-7eb114998d041b65ea6aefa9e2e463e5.png"},5960:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/device-d431aaf3c2ac41d09762265d48ca396d.png"},2138:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/log-73235415e0a2bc51a3cf55fa2bb55200.png"},1116:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/monitoring-3726b61d2f81648bc041b4818739ba0d.png"},1351:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/notification-f4700fd14a97dc2542927bcf9486a961.png"},5793:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/recognition-8a245e6d8ec66df6af2d7b074a1ae0d1.png"},3:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/user-deb3eb007d2d73544f53447f452cfbce.png"},8486:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/packages-0e611f0a82cfc1ccfd17514a2249b1ea.png"},8453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>o});var s=n(6540);const t={},r=s.createContext(t);function a(e){const i=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(r.Provider,{value:i},e.children)}}}]);