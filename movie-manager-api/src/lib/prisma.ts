import { PrismaClient } from '@prisma/client'
import { bold, cyan, dim, green, magenta, red, yellow } from 'colorette'

// Configuração de logging para monitorar performance
export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  const duration = typeof e.duration === 'number' ? e.duration : 0
  const durationStr = `${duration}ms`
  const coloredDuration = duration > 100 ? red(durationStr) : green(durationStr)

  console.log(bold(cyan('Prisma Query:')))
  console.log(dim(e.query))

  try {
    console.log(bold(magenta('Params:')), dim(JSON.stringify(e.params)))
  } catch {
    console.log(bold(magenta('Params:')), dim(String(e.params)))
  }

  console.log(bold(yellow('Duration:')), coloredDuration)

  if (duration > 100) {
    console.log(red('⚠️  Slow query detected (>100ms)'))
  }
})

// Monitorar queries lentas (> 100ms)
// if (process.env.NODE_ENV === 'development') {
//   prisma.$on('query', (e: any) => {
//     if (e.duration > 100) {
//       console.log('⚠️  Query lenta detectada:')
//       console.log('Query:', e.query)
//       console.log('Duração:', e.duration + 'ms')
//       console.log('Params:', e.params)
//       console.log('---')
//     }
//   })
// }
