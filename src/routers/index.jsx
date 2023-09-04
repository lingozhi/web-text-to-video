import Loadable from '@loadable/component';
import Loading from '@/components/loading';

const BasicLayout = Loadable(() => import('@/pages/BasicLayout'), {
    fallback: <Loading />,
});
const Home = Loadable(() => import('@/pages/Home'), {
    fallback: <Loading />,
});
const Setting = Loadable(() => import('@/pages/Setting'), {
    fallback: <Loading />,
});
const NotFound = Loadable(() => import('@/pages/404'), {
    fallback: <Loading />,
});
export const routes = [
    {
        path: '/*',
        element: <BasicLayout />,
        children: [
            {
                path: 'index',
                element: <Home />,
            },
            {
                path: 'setting',
                element: <Setting />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];
