import { OrganisationInterface } from './OrganisationInterface';
import { AController } from '../../shared/class/AbstractController';

import OrganisationModel from './OrganisationModel';

export default class OrganisationController extends AController <OrganisationInterface> {
  public cacheKey: String = 'org-';

  constructor() {
    super(OrganisationModel);
  }
}