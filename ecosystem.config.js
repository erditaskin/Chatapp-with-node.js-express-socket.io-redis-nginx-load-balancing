module.exports = {
    apps : [
        {
          name: "chatapp",
          script: "./server.js",
          instances: 4,
          exec_mode: "cluster",
          watch: true,
          increment_var : 'PORT',
          env: {
              "PORT": 3000,
              "NODE_ENV": "development"
          }
        }
    ]
  }