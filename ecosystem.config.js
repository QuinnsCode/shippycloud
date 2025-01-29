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
// If you follow our recommended config below, you could update this to only serve the api side,
// because the web side will be handled by nginx.

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
