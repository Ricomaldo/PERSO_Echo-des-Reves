import { useUser } from '../../utils/contexts/UserProvider';
import { Link } from 'react-router-dom';

import { ProfilCard } from '../../components/ProfilCard';
import { QuoteCarousel } from '../../components/QuoteCarousel';
import { PageTitle } from '../../layout';

import users from '../../mocks/users';
import { PageLayout, ProfilSelector, QuoteBloc } from './loginPageStyles';

const LoginPage = () => {
  const { changeUser } = useUser();

  return (
    <PageLayout>
      <PageTitle title="Sélection du héros" />
      <Link to="/dashboard">
        <ProfilSelector>
          {users.map((user) => (
            <ProfilCard
              key={user.name}
              user={user}
              size="large"
              showName={true}
              onClick={() => changeUser(user.name)} // Appelle `changeUser` au clic
            />
          ))}
        </ProfilSelector>
      </Link>
      <QuoteBloc>
        <QuoteCarousel />
      </QuoteBloc>
    </PageLayout>
  );
};

export default LoginPage;
