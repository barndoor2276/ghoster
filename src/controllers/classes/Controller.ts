import { Logger } from 'winston';
import logger from '../../util/logger';
import { IController } from './IController';

/**
 * Controller base class for custom controller
 */
export default abstract class Controller implements IController {
    logger: Logger;

    constructor() {
        this.logger = logger;
    }
}