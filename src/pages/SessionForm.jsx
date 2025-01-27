import styled from 'styled-components';
import Frame from '../layout/Frame';
import Button from '../components/Button';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }

  input,
  textarea {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundNeutral};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.borderNeutral};
    border-radius: 8px;
    padding: 8px;
    font-family: 'Caveat', sans-serif;
    font-size: 20px;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
      outline: none;
    }
  }

  textarea {
    height: 100px;
    resize: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const SessionForm = () => (
  <Frame>
    <InputWrapper>
      <label htmlFor="date">Date :</label>
      <input id="date" placeholder="À quelle date cette session a lieu ?" />
    </InputWrapper>
    <InputWrapper>
      <label htmlFor="notes">Prise de note :</label>
      <textarea
        id="notes"
        placeholder="Note ici les points essentiels de cet échange : les idées marquantes, les objectifs évoqués, les besoins ou attentes exprimées, ainsi que les actions concrètes envisagées. Identifie les obstacles ou freins, les émotions, et les moments de clarté ou de confusion. Capture les ressources ou atouts identifiéed, les engagements pris, et les solutions ou pistes qui sont explorées."
        style={{ minHeight: '300px' }}
      />
    </InputWrapper>
    <InputWrapper>
      <label htmlFor="vigilance">Vigilance :</label>
      <input
        id="vigilance"
        placeholder="Qu'est-ce qui mérite toute ton attention ?"
      />
    </InputWrapper>
    <ButtonWrapper>
      <Button variant="primary">Sauvegarder</Button>
      <Button variant="secondary">Annuler</Button>
      <Button variant="delete">Supprimer</Button>
    </ButtonWrapper>
  </Frame>
);

export default SessionForm;
