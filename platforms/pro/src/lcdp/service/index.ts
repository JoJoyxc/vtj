import * as controllers from './controllers';
import { type ApiRequest } from './shared';

export const router = async (req: any) => {
  const body: ApiRequest = req.body || {};
  const handler = (controllers as any)[body.type] || controllers.notMatch;
  return await handler(body);
};
