import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const ErrorBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 600px;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  margin: 0 0 20px 0;
  font-size: 2.5rem;
`;

const ErrorMessage = styled.p`
  margin: 0 0 30px 0;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ErrorDetails = styled.pre`
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 20px 0;
`;

const ReloadButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorBox>
            <ErrorTitle>⚠️ Oups!</ErrorTitle>
            <ErrorMessage>
              Une erreur est survenue. Nos développeurs ont été notifiés.
            </ErrorMessage>
            {process.env.NODE_ENV === 'development' && (
              <>
                <ErrorDetails>
                  {this.state.error && this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </ErrorDetails>
              </>
            )}
            <ReloadButton onClick={this.handleReload}>
              Retour à l'accueil
            </ReloadButton>
          </ErrorBox>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
