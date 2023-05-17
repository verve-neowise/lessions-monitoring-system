import { createDirection } from '../src/services/direction.service'

const directions = [
    "React Frontend",
    "Node Backend",
    "Foundation",
    "Python Frontend",
    "Python Backend",
    "Office"
]

export default async (organizationId: number) => {

    const ids: number[] = []

    for(let data of directions) {
        const dir = await createDirection(organizationId, data)
        ids.push(dir.id)
    }

    return ids
}