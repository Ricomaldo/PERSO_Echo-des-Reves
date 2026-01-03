import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.textPrimary};

  .react-calendar {
    border: none;
    font-family: 'Inter';
    font-size: 16px;
    border-radius: 32px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.backgroundSurface};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .react-calendar__tile {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.linkHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colors.linkActive};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const SessionBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 8px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 2px;
  transition: all 0.2s ease;

  &:hover {
    width: 10px;
    height: 10px;
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;
