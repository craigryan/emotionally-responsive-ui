import React from 'react';

import { Divider } from '@/lib/components/Divider/Divider';
import { MenuHeader } from '@/app/components/MenuHeader/MenuHeader';

// Shared menu layout for all page with a left Menu column
const DesktopOnlyLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full">
            <MenuHeader />
            <Divider />
            <div className="flex flex-row">
                <main className="main-content">{children}</main>
            </div>
        </div>
    );
};

export default DesktopOnlyLayout;
