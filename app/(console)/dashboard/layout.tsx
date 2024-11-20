import React from 'react';

import { Divider, VerticalDivider } from '@/lib/components/Divider/Divider';
import { DashControls } from '@/app/components/dashboard/DashControls';

const DashboardLayout: React.FC = ({ children }) => {
    return (
        <div className="flex h-full">
            <div className="w-1/3 h-full">
                <DashControls />
            </div>
            <VerticalDivider />
            <main className="flex-1 h-full ml-2">{children}</main>
        </div>
    );
};

export default DashboardLayout;
