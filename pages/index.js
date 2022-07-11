import * as React from 'react';
import { useRouter } from 'next/router';
import Login from '../components/Login';
import Register from '../components/Register';
import { kontenbase } from '../lib/kontenbase';

export default function Auth() {
  const router = useRouter();
  const [switchAuthForm, setSwitchAuthForm] = React.useState('login');

  React.useEffect(() => {
    (async function () {
      const { error } = await kontenbase.auth.user();

      if (error) {
        console.log(error);
        return;
      }

      router.push('/myaccount');
    })();
  }, []);

  function handleRegisterForm() {
    setSwitchAuthForm('register');
  }

  function handleLoginForm() {
    setSwitchAuthForm('login');
  }

  return (
    <div className="auth-page">
      <div className="auth-button">
        <button onClick={handleLoginForm}>Login</button>
        <button onClick={handleRegisterForm}>Register</button>
      </div>
      {switchAuthForm === 'register' ? <Register /> : <Login />}
    </div>
  );
}
