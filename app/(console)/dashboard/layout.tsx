import React from 'react';

import { Divider, VerticalDivider } from '@/lib/components/Divider/Divider';
import { DashControls } from '@/app/components/dashboard/DashControls';

const DashboardLayout: React.FC = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-row">
                <div className="left-controls">
                    <DashControls />
                </div>
                <VerticalDivider />
                <main className="main-content">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
