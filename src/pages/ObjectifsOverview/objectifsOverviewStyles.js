import styled from 'styled-components';

export const ObjectivesList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

export const ObjectiveItem = styled.div`
  margin-bottom: 16px;
  list-style-type: none;
`;

export const ObjectiveDescription = styled.p`
  margin-bottom: 8px;
  text-align: left;
  color: ${({ theme }) => theme.textSecondary};
`;

export const DeadlineText = styled.p`
  font-size: 0.9em;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 16px;
`;

export const CompletedObjectiveItem = styled.li`
  margin-bottom: 8px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.borderBase};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundHover};
  }
`;
export const TextAndStars = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center; /* Aligne le texte et les étoiles verticalement */
  width: 100%;
`;

export const StarDisplay = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 8px;
  i {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
