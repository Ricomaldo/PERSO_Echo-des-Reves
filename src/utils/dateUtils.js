export const formatDate = (timestamp) => {
  if (!timestamp?.seconds) return 'Date inconnue';
  return new Date(timestamp.seconds * 1000).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
