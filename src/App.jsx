import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routers';

const App = () => {
    useEffect(() => {
        // loading chunk fail
        window.addEventListener('error', (e) => {
            const pattern = /Loading chunk (\d)+ failed/g;
            if (e.message.match(pattern)) {
                window.location.reload(true);
            }
        });
    }, []);
    return <>{useRoutes(routes)}</>;
};

export default App;
