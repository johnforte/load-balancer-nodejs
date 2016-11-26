module.exports ={
    name: "1-loadbalancer",
    routing_method: "round-robin",
    port:3000,
    domain:"localhost",
    headers: [
        {
          name: "x-forwarded-for",
          enabled :true
        },
        {
          name: "x-forwarded-proto",
          enabled :true
        },
        {
          name: "x-forwarded-port",
          enabled :true
        }
    ],
    sticky_sessions:{
        enabled:true,
        time:1800,
    },
    proxy_servers:[
      {
        name:"example-1",
        ip:"127.0.0.1",
      }
    ]

};
