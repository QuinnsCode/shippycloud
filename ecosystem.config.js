// module.exports = {
//   apps: [
//     {
//       name: 'serve',
//       cwd: 'current',
//       script: 'node_modules/.bin/rw',
//       args: 'serve',
//       instances: 'max',
//       exec_mode: 'cluster',
//       wait_ready: true,
//       listen_timeout: 10000,
//     },
//   ],
// }

module.exports = {
  apps: [
    {
      name: 'api',
      cwd: 'current',
      script: 'node_modules/.bin/rw',
      args: 'serve api',
      instances: 'max',
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
}
