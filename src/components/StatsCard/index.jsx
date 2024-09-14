import React from 'react';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardContent}>
        <div>{icon}</div>
        <div>
          <h2>{title}</h2>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    width: 'calc(100% / 3 - 40px)',
    backgroundColor: '#f9f9f9',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default StatsCard;
