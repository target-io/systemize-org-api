import { create, list, get, update, cache } from './../../entities/Organisation/OrganisationBusiness';
import { Request, Response, NextFunction, Router } from 'express';
import { check, validationResult } from 'express-validator/check';

import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

const router = Router();
const checkEntityGet = [
  check('select').exists()
];

router.post('/', create);

router.get('/', checkEntityGet, (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new UnprocessableEntityException(errors.array()));
    return;
  }
  list(req, res, next);
});

router.get('/:orgId', get);

router.put('/:orgId', update);

router.param('orgId', cache);

export default router;