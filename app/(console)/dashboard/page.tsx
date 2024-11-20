'use client';

import React from 'react';

import { ApplyPage } from '@/app/apply/ApplyPage';

// Main dashboard content - the Application we're experimenting with
const DashboardPage = () => {
    return (
        <div className="border border-gray-300 rounded-lg h-full p-4">
            <ApplyPage />
        </div>
    );
};

export default DashboardPage;
