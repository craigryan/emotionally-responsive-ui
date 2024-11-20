'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import styles from './MenuHeader.module.scss';

function Logo(): JSX.Element {
    const tMain = useTranslations('Main');
    return (
        <Link href="/" className="hover:underline" data-testid="logo-link">
            <span className="flex cursor-pointer mt-3">
                <Image
                    className={styles.logo}
                    width="100"
                    height="100"
                    src="/images/primary_logo.svg"
                    alt={tMain('logo')}
                    priority={true}
                    unoptimized
                />
            </span>
        </Link>
    );
}

function SignOut(): JSX.Element {
    const tMain = useTranslations('Main');

    return (
        <Button
            size="small"
            data-testid="signout-button"
        >
            <Typography variant="body1">{tMain('signout')}</Typography>
        </Button>
    );
}

function ViewProfile(): JSX.Element {
    const tMain = useTranslations('Main');
    const viewProfileLink = '/profile'; // 404

    return (
        <Link href={viewProfileLink} className="text-black hover:underline mr-4" data-testid="profile-link">
            <Button variant="text">
              <Typography variant="body1">{tMain('profile')}</Typography>
            </Button>
        </Link>
    );
}

export const MenuHeader: React.FC = () => {
    return (
        <nav>
            <span className="flex items-center justify-between w-full mt-2 mb-2 px-4">
                <Logo />
                <span className="flex items-center justify-between">
                    <ViewProfile />
                    <SignOut />
                </span>
            </span>
        </nav>
    );
};
