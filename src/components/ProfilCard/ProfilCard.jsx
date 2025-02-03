import { ProfilWrapper, Avatar, UserName } from './profilCardStyles';

function ProfilCard({
  user,
  onClick,
  size = 'detailed',
  showName = true,
  isActiveUser,
}) {
  return (
    <ProfilWrapper onClick={onClick}>
      <Avatar
        src={user.avatar}
        alt={`Avatar de ${user.name}`}
        aria-label={`Avatar de ${user.name}`}
        $size={size}
        $isActive={isActiveUser} // Transmet l'état actif
      />
      {showName && <UserName $size={size}>{user.pseudo}</UserName>}
    </ProfilWrapper>
  );
}

export default ProfilCard;
