import styled from 'styled-components';

// Wrapper pour le profil
const ProfilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  text-align: center;
  justify-content: space-between;
  gap: 16px;

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
function ProfilCard({ user }) {
  return (
    <ProfilWrapper>
      <img src={user.avatar} alt={`Avatar de ${user.name}`} />
      <h1>{user.pseudo}</h1>
    </ProfilWrapper>
  );
}

export default ProfilCard;
