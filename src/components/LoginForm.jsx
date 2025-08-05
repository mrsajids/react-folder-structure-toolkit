import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      const result = onLogin(username, password);
      if (result !== true) {
        setError(result || 'Invalid username or password');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      {error && <div className="text-danger mb-3">{error}</div>}
      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
