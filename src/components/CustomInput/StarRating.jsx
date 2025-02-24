import styled from 'styled-components';

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const Star = styled.span`
  color: #ffc107;
`;

const StarRating = ({ value, onChange }) => {
  const handleStarClick = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <StarsContainer>
      {[1, 2, 3].map((star) => (
        <i
          key={star}
          className={`fas fa-star ${star <= value ? 'checked' : ''}`}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: 'pointer',
            color: star <= value ? '#ffc107' : '#e4e5e9',
          }}
        ></i>
      ))}
    </StarsContainer>
  );
};

export default StarRating;
