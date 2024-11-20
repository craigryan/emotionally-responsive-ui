'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';

import { MenuLayout } from '@/app/shared/menu-layout';

export const ApplyPage = () => {
    const tApply = useTranslations('Apply');

    // const emotion = useAppSelector(selectApplicationType);
    // const emotion = ??

    return (
        <MenuLayout>
            <div>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                    {tApply('header')}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'medium', mt: 4 }}>
                    Here's all you need before we begin!
                </Typography>

                <ul className="list-disc pl-5 py-4 text-lg">
                    <li>Passport</li>
                    <li>House bills</li>
                    <li>Last salary slip</li>
                    <li>Birth certificate</li>
                    <li>Bank statements for the last 6 months</li>
                    <li>Proof of address</li>
                    <li>Medical records</li>
                    <li>Tax returns</li>
                    <li>Employment contract</li>
                    <li>Letter of recommendation from your neighbor</li>
                </ul>

                <div className="flex justify-between items-center py-4">
                    <Button data-testid="apply-button" endIcon={<SendIcon />}>
                        {tApply('createApplication')}
                    </Button>
                </div>
            </div>
        </MenuLayout>
    );
};
