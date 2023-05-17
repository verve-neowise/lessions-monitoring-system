import adminsMock from "./admins.mock";
import directionsMock from "./directions.mock";
import organizationsMock from "./organizations.mock";

const bootstrap = async () => {
    // const organizationId = await organizationsMock()
    // const admins = await adminsMock(organizationId)
    const directions = await directionsMock(1)
}

bootstrap()