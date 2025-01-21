import styled from 'styled-components';

// Wrapper pour le profil
const ProfilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05); // Effet au survol
  }

  img {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 4px solid ${({ theme }) => theme.colors.primary};
  }

  h1 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Composant ProfilCard
function ProfilCard({ user, onClick }) {
  return (
    <ProfilWrapper onClick={onClick}>
      <img src={user.avatar} alt={`Avatar de ${user.name}`} />
      <h1>{user.pseudo}</h1>
    </ProfilWrapper>
  );
}

export default ProfilCard;
