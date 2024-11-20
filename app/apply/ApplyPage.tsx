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
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{tApply('header')}</Typography>

                <div className="flex justify-between items-center py-4">
                        <Button
                            data-testid="apply-button"
                            endIcon={<SendIcon />}
                        >
                            {tApply('createApplication')}
                        </Button>
                </div>

            </div>
        </MenuLayout>
    );
};

