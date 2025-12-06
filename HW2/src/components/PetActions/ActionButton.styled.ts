import styled from 'styled-components';

interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const ActionButton = styled.button<ActionButtonProps>`
  background: ${props => {
    switch(props.variant) {
      case 'primary': return '#007bff';
      case 'secondary': return '#6c757d';
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      default: return '#007bff';
    }
  }};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;