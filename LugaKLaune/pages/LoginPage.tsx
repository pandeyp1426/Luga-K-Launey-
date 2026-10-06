import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  return <div className="account-entry shell"><div className="account-entry-photo"><img src="/images/editorial-blazer.jpg" alt="A relaxed take on everyday style" width="600" height="750"/></div><div className="account-entry-content"><p className="eyebrow">YOUR OWN LITTLE CORNER OF HIMA</p><h1>A little more<br/><em>personal.</em></h1><p>Keep your favorite pieces close and explore your order history.</p><div className="preview-notice"><p><strong>Account preview</strong><br/>Try the experience with a sample profile. No password or personal details needed.</p></div><button className="button button-red full-width" onClick={() => { login('guest@example.com'); navigate('/account'); }}>Explore your account <Icon name="arrow"/></button><button className="text-link" onClick={() => { login('studio@example.com'); navigate('/admin'); }}>Open the store management preview <Icon name="arrow" width="17" height="17"/></button><Link to="/shop" className="underlined-button">Continue browsing</Link></div></div>;
}

