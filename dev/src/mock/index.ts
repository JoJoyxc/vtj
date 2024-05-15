import Mock from 'mockjs';

Mock.setup({
  timeout: '500-3000'
});

Mock.mock(/\/mock-api\/image/, () => {
  return Mock.mock({
    code: 0,
    data: '@image'
  });
});

Mock.mock(/\/mock-api\/upload/, {
  code: 0,
  data: '@image',
  success: true
});

Mock.mock(/\/mock-api\/list/, {
  code: 0,
  success: true,
  'data|30': [
    {
      id: '@id',
      name: '@cname',
      'sex|1': ['男', '女'],
      age: '@integer(1,100)',
      year: '@datetime(yyyy)',
      month: '@datetime(MM)',
      date: '@datetime(dd)',
      province: '@province',
      city: '@city',
      county: '@county',
      intro: '@cparagraph(1,3)'
    }
  ]
});
