import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '分析页',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
          },
          {
            name: '监控页',
            path: 'monitor',
            component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
          },
          {
            name: '工作台',
            path: 'workplace',
            component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
          },
        ],
      },
      {
        name: '表单页',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: '基础表单',
            path: 'basic-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm'))
          },
          {
            name: '分步表单',
            path: 'step-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
            children: [
              {
                path: 'confirm',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
              },
              {
                path: 'result',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
              },
            ],
          },
          {
            name: '高级表单',
            path: 'advanced-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm'))
          }
        ]
      },
      {
        name: '结果',
        path: 'result',
        icon: 'check-circle-o',
        children: [
          {
            name: '成功',
            path: 'success',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
          },
          {
            name: '失败',
            path: 'fail',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Error'))
          }
        ]
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BlankLayout')),
    layout: 'BlankLayout',
    children: {
      name: '使用文档',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },
];
