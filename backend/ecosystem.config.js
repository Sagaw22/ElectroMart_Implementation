module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'dist/index.js',
      instances: 3,
      exec_mode: 'cluster',
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
