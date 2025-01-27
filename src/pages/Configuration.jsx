import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const GiphyWrapper = styled.div`
  width: 320px;
  height: 0;
  padding-bottom: 51%;
  position: relative;
  margin-top: 32px;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none; /* Désactive les clics sur l'iframe */
  }
`;
// Définition de l'animation du défilement
const scroll = keyframes`
  0% {
    transform: translateY(80%);
  }
  100% {
    transform: translateY(-120%);
  }
`;

// Conteneur principal avec perspective
const StyledContainer = styled.div`
  perspective: 400px;
  overflow: hidden;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

// Texte stylisé avec animation
const StyledText = styled.div`
  transform-origin: 50% 100%;
  animation: ${scroll} 60s linear infinite;
  transform: rotateX(25deg);
  text-align: center;
  width: 80%;
  line-height: 1.6;

  p {
    color: #00ff00;
    font-family: 'Orbitron', sans-serif;
    font-size: 20px;
    margin: 0 auto; /* Assure le centrage horizontal */
    width: 100%; /* Les paragraphes prennent la largeur du parent */
  }
`;

const Configuration = () => (
  <>
    {' '}
    <Link to="/Adventure">
      <GiphyWrapper>
        <iframe
          src="https://giphy.com/embed/26FmQ6EOvLxp6cWyY"
          allowFullScreen
        ></iframe>
      </GiphyWrapper>
    </Link>
    <StyledContainer>
      <StyledText>
        <p>
          Jeune Padawan, un grand pouvoir sommeille dans les profondeurs de
          Firebase.
        </p>
        <p>
          Une force mystérieuse attend d’être maîtrisée. Ton apprentissage te
          mènera à explorer des territoires inconnus, où chaque ligne de code
          est une brique de ton futur savoir.
        </p>
        <p>
          Ta mission est simple : plonger dans cet univers, y chercher des
          réponses et y forger tes compétences.
        </p>
        <p>
          Tu découvriras des outils puissants, manipuleras des données et
          construiras des passerelles entre l’imaginaire et la réalité.
        </p>
        <p>
          Mais attention, chaque pas te rapprochera d’un nouveau défi. Chaque
          réussite sera un pas vers la maîtrise totale.
        </p>
        <p>
          Seras-tu prêt à suivre cette voie ? Le destin est entre tes mains.
        </p>
      </StyledText>
    </StyledContainer>
  </>
);

export default Configuration;
