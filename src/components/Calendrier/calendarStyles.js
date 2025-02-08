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

export const SessionDot = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;
