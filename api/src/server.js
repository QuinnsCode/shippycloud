import { createServer } from '@redwoodjs/api-server'

import { logger } from 'src/lib/logger'
import { realtime } from 'src/lib/realtime'

async function main() {
  const server = await createServer({
    logger,
    realtime,
  })

  await server.start()
}

main()
