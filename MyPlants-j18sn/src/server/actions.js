import HttpError from '@wasp/core/HttpError.js'

export const createPlant = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Plant.create({
    data: {
      name: args.name,
      daysTillWatering: args.daysTillWatering,
      user: {
        connect: { id: context.user.id }
      }
    }
  })
}

export const waterPlant = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const plant = await context.entities.Plant.findUnique({
    where: { id: args.plantId }
  });
  if (plant.userId !== context.user.id) { throw new HttpError(403) };

  const updatedPlant = await context.entities.Plant.update({
    where: { id: args.plantId },
    data: { daysTillWatering: plant.daysTillWatering - 1 }
  });

  return updatedPlant;
}