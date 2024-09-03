export const Summary = ({ children, title }) => {
    return (
        <details style={{
            cursor: 'pointer',
            backgroundColor: '#e6eff5',
            padding: '25px',
            borderRadius: '25px',
            border: '1px solid #9dd2f5',
            marginTop: '25px',
            marginBottom: '25px',
        }}>
            <summary style={{ fontWeight: 'bold' }}>{title}</summary>
            <p style={{
                marginTop: '25px',
            }}>{children}</p>
        </details>
    );
};