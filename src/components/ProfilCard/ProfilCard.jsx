import {
  ProfilWrapper,
  Avatar,
  UserName,
  StarArc,
  LevelBlock,
} from './profilCardStyles';

function ProfilCard({
  user,
  onClick,
  size = 'detailed',
  showName = true,
  isActiveUser,
  withGamification,
  niveau,
  etoilesActuelles,
}) {
  return (
    <ProfilWrapper onClick={onClick}>
      <Avatar
        src={user.avatar}
        alt={`Avatar de ${user.name}`}
        aria-label={`Avatar de ${user.name}`}
        $size={size}
        $isActive={isActiveUser}
      />
      {showName && <UserName $size={size}>{user.pseudo}</UserName>}

      {withGamification && (
        <>
          <LevelBlock>{niveau}</LevelBlock>
          <StarArc>
            {[...Array(3)].map((_, index) => (
              <i
                key={index}
                className={`fa fa-star ${
                  index < etoilesActuelles ? 'filled' : 'empty'
                }`}
              />
            ))}
          </StarArc>
        </>
      )}
    </ProfilWrapper>
  );
}

export default ProfilCard;
