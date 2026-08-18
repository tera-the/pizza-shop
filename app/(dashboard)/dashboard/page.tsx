import React from 'react';

interface DashboardProps {
    className?: string
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
    return (
        <div className={className}>
            Dashybaord
        </div>
    );
};

export default Dashboard;