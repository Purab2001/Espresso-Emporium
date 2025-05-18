import React from 'react';

const LoadingSpinner = ({ size = 48, color = '#6B4F1D', label = 'Loading...', fullScreen = false }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: fullScreen ? '100vh' : size + 16,
                width: '100%',
            }}
            role="status"
            aria-live="polite"
            aria-label={label}
            className={fullScreen ? 'fixed inset-0 bg-white bg-opacity-80 z-50' : ''}
        >
            <span
                style={{
                    width: size,
                    height: size,
                    display: 'inline-block',
                    border: `${size * 0.12}px solid ${color}33`,
                    borderTop: `${size * 0.12}px solid ${color}`,
                    borderRadius: '50%',
                    animation: 'espresso-spin 1s linear infinite',
                    boxSizing: 'border-box',
                }}
            />
            <span style={{ marginTop: 12, color: '#444', fontSize: 14 }}>{label}</span>
            <style>{`
                @keyframes espresso-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;