module.exports = {
  apps: [{
    name: 'selfai-nextjs',
    script: 'npm',
    args: 'start',
    cwd: '/home/lili/selfai-nextjs',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/lili/logs/pm2/selfai-error.log',
    out_file: '/home/lili/logs/pm2/selfai-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};