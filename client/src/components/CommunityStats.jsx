import React, { useEffect, useState } from 'react';
import community from '../assets/community.webp'; 

const Counter = ({ target, duration = 3000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}+</span>;
};

const CommunityStats = () => {
  return (
    <div style={{ ...styles.statsSection, backgroundImage: `url(${community})` }}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Join Our Community Today And Get Notified</h2>

        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}><Counter target={250000} /></h3>
            <p style={styles.statLabel}>Followers</p>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.statItem}>
            <h3 style={styles.statNumber}><Counter target={80000} /></h3>
            <p style={styles.statLabel}>Active Users</p>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.statItem}>
            <h3 style={styles.statNumber}><Counter target={10} /></h3>
            <p style={styles.statLabel}>Cities</p>
          </div>
        </div>

        <button style={styles.infoButton}>More Info</button>
      </div>
    </div>
  );
};

const styles = {
  statsSection: {
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '60vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  content: {
    color: '#fff',
    padding: '20px',
    maxWidth: '1000px',
    width: '100%',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '50px',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  statItem: {
    minWidth: '140px',
  },
  statNumber: {
    fontSize: '3.2rem',
    fontWeight: '700',
    margin: 0,
  },
  statLabel: {
    fontSize: '1.2rem',
    marginTop: '10px',
    color: '#e0e0e0',
  },
  divider: {
    width: '1px',
    height: '60px',
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  infoButton: {
    padding: '12px 26px',
    backgroundColor: '#00c29e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default CommunityStats;
