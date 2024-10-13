export const getRandomColor = () => {
    const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };