// import { ThemeContext } from '../utils/context';
import styled from 'styled-components';

const Title = styled.h1`
  display: flex;
  width: 100%;
  justify-content: center;
`;

function PageTitle({ title }) {
  //   const { toggleTheme, theme } = useContext(ThemeContext);

  return <Title>{title}</Title>;
}

export default PageTitle;
