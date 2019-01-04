import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from 'http-status-codes';

import OrganisationController from './OrganisationController';

import RedisController from '../../shared/class/RedisController';
import GenericException from '../../shared/exceptions/GenericException';

const redis = new RedisController();
const orgObj = new OrganisationController();


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const org = await orgObj.save(req.body);
    res.status(CREATED).send(org);
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orgs = await orgObj.find({});
    res.status(OK).send(orgs);
  }
  catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orgId } = req.params;
    const org = await redis.getCache(`${orgObj.cacheKey}${orgId}`);
    res.status(OK).send(org);
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orgId } = req.params;
    let org = await redis.getCache(`${orgObj.cacheKey}${orgId}`);
    org = { ...org, ...req.body };
    await orgObj.update(org);
    res.status(OK).send(org);
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }))
  }
};

export const cache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orgId } = req.params;
    // check org already in cache
    let org = await redis.getCache(`${orgObj.cacheKey}${orgId}`);
    if (org) {
      return next();
    }
    // get org from db & set cache
    org = await orgObj.findById(orgId);
    if (org) {
      await redis.setCache(`${orgObj.cacheKey}${orgId}`, org);
      return next();
    }
    throw new Error('Invalid org id');
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};
