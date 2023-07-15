import { createApi } from '@vtj/utils';

export const ideConfig = createApi({
  url: '/vtj.json',
  method: 'get',
  settings: {
    validSuccess: false,
    originResponse: false
  }
});

export const ideBase = createApi({
  url: '/vtj/base.json',
  method: 'post',
  settings: {
    type: 'json',
    validSuccess: true,
    originResponse: false
  }
});
