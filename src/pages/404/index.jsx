import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found">
            <Result
                status="404"
                title="404"
                subTitle="找不到该页面"
                extra={
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        回到首页
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;
