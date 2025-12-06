import { ActionButton } from './ActionButton.styled';

interface PetActionsProps {
  onFeed: () => void;
  onLevelUp: () => void;
  onCheer: () => void;
  onReset: () => void;
  disabled: boolean;
}

const PetActions = ({ onFeed, onLevelUp, onCheer, onReset, disabled }: PetActionsProps) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <ActionButton variant="success" onClick={onFeed} disabled={disabled}>
        Feed
      </ActionButton>
      <ActionButton variant="primary" onClick={onLevelUp} disabled={disabled}>
        Level Up
      </ActionButton>
      <ActionButton variant="secondary" onClick={onCheer} disabled={disabled}>
        Cheer
      </ActionButton>
      <ActionButton variant="danger" onClick={onReset} disabled={disabled}>
        Reset
      </ActionButton>
    </div>
  );
};

export default PetActions;