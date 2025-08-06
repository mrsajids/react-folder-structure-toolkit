

import { Card, Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/login/LoginForm'

const LoginPage = () => {

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/';
      return true;
    }
    return 'Invalid username or password';
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <h2 className="mb-4 text-center">Login</h2>
              <LoginForm onLogin={handleLogin} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
