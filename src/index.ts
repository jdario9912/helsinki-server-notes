import { PORT } from "./libs/config";
import logger from "./libs/logger";
import app from "./app";

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
