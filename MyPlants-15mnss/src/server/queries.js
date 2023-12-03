import HttpError from '@wasp/core/HttpError.js'

export const getPlants = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Plant.findMany({
    where: {
      userId: context.user.id
    }
  })
}

export const getPlant = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const plant = await context.entities.Plant.findUnique({
    where: { id },
    include: { user: true }
  })

  if (!plant) { throw new HttpError(404, 'Plant does not exist') }

  if (plant.userId !== context.user.id) { throw new HttpError(400, 'Plant does not belong to user') }

  return plant
}
