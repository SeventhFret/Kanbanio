import './Home.css';
import { LoginForm } from '../components/LoginForm';


export function LoginPage(props) {
    const { handleLoggedInChanged } = props;

    return (
        <div className='section flex f-c'>
            <LoginForm handleLoggedInChanged={handleLoggedInChanged} />
        </div>
    )
}