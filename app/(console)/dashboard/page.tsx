'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { ApplyPage } from '@/app/apply/ApplyPage';

import { logger } from '@/lib/utils/logger/logger';

// Main dashboard content - the Application we're experimenting with
const DashboardPage = () => {
    const tDash = useTranslations('Dashboard');

    return (
       <ApplyPage />
    );
};

export default DashboardPage;
