import Organisation from './Organisation';
import HealthCheck from './HealthCheck';
import server from '../shared/server';

export default {
  /**
   * Start routes of server
   */
  initRoutes() {
    server.use('/organisation', Organisation);
    server.use('/health', HealthCheck);
    server.use('/', (req, res) => res.send({ status: 'success', message: 'Welcome to systemize-org-api!' }));
  }
}