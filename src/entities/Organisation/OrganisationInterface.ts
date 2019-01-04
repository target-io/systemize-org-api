import { IMongoModel } from '../../shared/interfaces/IMongoModel';
export interface OrganisationInterface extends IMongoModel {
  [name: string]: string;
}