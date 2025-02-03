import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 48px;
`;

export const ProfilSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
  padding: 16px;
`;

export const QuoteBloc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 240px;
  width: 320px;
  margin-top: 80px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundNeutral};
  border: 2px solid ${({ theme }) => theme.colors.borderBase};
  font-size: ${({ theme }) => theme.typography.fontSizeH2};
  font-weight: ${({ theme }) => theme.typography.fontWeightH2};
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
`;
