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
    font-family: 'caveat', sans-serif;
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

const ObjectifForm = () => (
  <Frame>
    <InputWrapper>
      <label htmlFor="title">Titre :</label>
      <input id="title" placeholder="Un titre qui nous inspire..." />
    </InputWrapper>
    <InputWrapper>
      <label htmlFor="description">Description :</label>
      <textarea
        id="description"
        placeholder="Qu'est-ce qui rend cet objectif motivant ? Pourquoi c'est une priorité ? "
        style={{ minHeight: '300px' }}
      />
    </InputWrapper>
    <InputWrapper>
      <label htmlFor="deadline">Deadline :</label>
      <input
        id="deadline"
        placeholder="À quelle date cet objectif sera atteint ?"
      />
    </InputWrapper>
    <ButtonWrapper>
      <Button variant="primary">Sauvegarder</Button>
      <Button variant="secondary">Annuler</Button>
      <Button variant="delete">Supprimer</Button>
    </ButtonWrapper>
  </Frame>
);

export default ObjectifForm;
