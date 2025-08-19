import React from 'react';

const LogDetails = ({ title, data, isError }) => {
    return (
        <details className="mb-2">
            <summary className={`small ${isError ? 'text-danger' : 'text-muted'}`}>
                {title}
            </summary>
            <pre className="bg-white p-2 border rounded mt-1" style={{ overflowX: 'auto', fontSize: '0.8rem' }}>
                {typeof data === 'object' ? JSON.stringify(data, null, 2) : data}
            </pre>
        </details>
    );
};

export default LogDetails;