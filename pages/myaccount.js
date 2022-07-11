import * as React from 'react';
import { useRouter } from 'next/router';
import { kontenbase } from '../lib/kontenbase';

export default function Account() {
  const router = useRouter();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    (async function () {
      const { user, error } = await kontenbase.auth.user({
        lookup: '*',
      });

      if (error) {
        console.log(error);
        return;
      }

      setUser(user);
    })();
  }, []);

  async function handleLogout() {
    const { error } = await kontenbase.auth.logout();

    if (error) {
      console.log(error);
      return;
    }

    router.push('/');
  }

  function handleShareProfile(e) {
    e.preventDefault();
    navigator.clipboard.writeText('REACT_APP_URL/profile/' + user?.username);
    alert('Link Copied!');
  }

  function handleLogin() {
    router.push('/');
  }

  function handleEditAccount() {
    router.push('/edit-account');
  }

  return (
    <>
      {!user ? (
        <div className="not-autheticated">
          <p>Your Are not autheticated!</p>
          <button onClick={handleLogin} className="button button-primary">
            Login
          </button>
        </div>
      ) : (
        <div className="profile-page">
          <div className="button-top">
            <button onClick={handleEditAccount}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="profile-wrapper">
            <div className="profile-header">
              <img
                className="image-avatar"
                width={90}
                height={90}
                src={
                  user?.profile?.[0]?.image ?? 'https://via.placeholder.com/90'
                }
                alt=""
              />
              <h3 className="profile-title">
                <span>{user?.firstName}</span>{' '}
                <span>{user?.lastName ?? ''}</span>
              </h3>
              <p>{user?.profile?.[0]?.position ?? 'position is null'}</p>
            </div>
            <div className="card">
              <div className="share-contact">
                <button className="button-share" onClick={handleShareProfile}>
                  Share
                </button>
              </div>
              <h3>Contact</h3>
              <div className="card-field">
                <span>Name</span>
                <p>
                  {user?.firstName} {user?.lastName ?? ''}
                </p>
              </div>
              <div className="card-field">
                <span>Mobile</span>
                <p>{user?.phoneNumber ?? 'phone number is null'}</p>
              </div>
              <div className="card-field">
                <span>Email</span>
                <a className="link-email" href="mailto:name@email.com">
                  {user?.email}
                </a>
              </div>
              <div className="card-field">
                <span>Company</span>
                <p>{user?.profile?.[0]?.company ?? 'company is null'}</p>
              </div>
            </div>
            <div className="card">
              <h3>Location</h3>
              <p>{user?.profile?.[0]?.location ?? 'location is null'}</p>
            </div>
            <div className="card">
              <h3>Web Links</h3>
              <a
                className="website-link"
                href={user?.profile?.[0]?.website ?? ''}
              >
                Website
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}