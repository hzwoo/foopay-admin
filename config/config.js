// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/workplace',
            },
            // {
            //   path: '/welcome',
            //   name: 'welcome',
            //   icon: 'smile',
            //   component: './Welcome',
            // },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/dashboard/analysis',
                  name: 'analysis',
                  icon: 'smile',
                  component: './dashboard/analysis',
                },
                {
                  path: '/dashboard/monitor',
                  name: 'monitor',
                  icon: 'smile',
                  component: './dashboard/monitor',
                },
                {
                  path: '/dashboard/workplace',
                  name: 'workplace',
                  icon: 'smile',
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              path: '/transaction',
              name: 'transaction',
              icon: 'transaction',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/transaction/payment',
                  name: 'payment',
                  icon: 'smile',
                  // component: './transaction/payment'
                  component: '404',
                },
                {
                  path: '/transaction/refund',
                  name: 'refund',
                  icon: 'smile',
                  component: '404',
                },
              ],
            },
            {
              path: '/paymentgateway',
              name: 'paymentgateway',
              icon: 'cluster',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/paymentgateway/product',
                  name: 'product',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/paymentgateway/channel',
                  name: 'channel',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/paymentgateway/handler',
                  name: 'handler',
                  icon: 'smile',
                  component: '404',
                },
              ],
            },
            {
              path: '/merchant',
              name: 'merchant',
              icon: 'team',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/merchant/register',
                  name: 'register',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/merchant/submission',
                  name: 'submission',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/merchant/payment',
                  name: 'payment',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/merchant/application',
                  name: 'application',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/merchant/profile',
                  name: 'profile',
                  icon: 'smile',
                  component: '404',
                },
              ],
            },
            {
              path: '/agent',
              name: 'agent',
              icon: 'cluster',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/agent/register',
                  name: 'register',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/agent/submission',
                  name: 'submission',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/agent/commission',
                  name: 'commission',
                  icon: 'smile',
                  component: '404',
                },
              ],
            },
            {
              path: '/system',
              name: 'system',
              icon: 'setting',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/system/account',
                  name: 'account',
                  icon: 'smile',
                  component: '404',
                },
                {
                  path: '/system/settings',
                  name: 'settings',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/system/settings/roles',
                      name: 'roles',
                      icon: 'smile',
                      component: '404',
                    },
                    {
                      path: '/sysetm/settings/config',
                      name: 'config',
                      icon: 'smile',
                      component: '404',
                    },
                  ],
                },
              ],
            },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
