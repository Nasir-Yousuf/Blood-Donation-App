export const getBloodTypeInfo = (bloodType) => {
  if (!bloodType) return 'Pending...';
  if (bloodType === 'O-') return 'Universal Donor';
  if (bloodType === 'AB+') return 'Universal Recipient';
  return 'High Demand';
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Available Now';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Available Now';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
