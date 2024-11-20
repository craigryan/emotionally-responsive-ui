import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarRateIcon from '@mui/icons-material/StarRate';
import ShareIcon from '@mui/icons-material/Share';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';

import { Divider, VerticalDivider } from '@/lib/components/Divider/Divider';
import { MenuHeader } from '@/app/components/MenuHeader/MenuHeader';

const MenuList = () => {
    const tMenu = useTranslations('Menu');

    return (
        <nav>
           <Stack direction="column" spacing={2}>
               <Button variant="outlined" startIcon={<LocalOfferIcon />}>
                   {tMenu('offers')}
               </Button>
               <Button variant="contained" endIcon={<StarRateIcon />}>
                   {tMenu('rating')}
               </Button>
               <Button variant="contained" endIcon={<ShareIcon />}>
                   {tMenu('share')}
               </Button>
               <Button variant="contained" endIcon={<HelpIcon />}>
                   {tMenu('help')}
               </Button>
           </Stack>
        </nav>
    );
};

// Shared menu layout for all page with a left Menu column
const MenuLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full">
            <MenuHeader />
            <Divider />
            <div className="flex flex-row">
                <div className="left-menu px-1 mt-0">
                    {/* Left menu items */}
                    <MenuList />
                </div>
                <VerticalDivider />
                <main className="main-content">{children}</main>
            </div>
        </div>
    );
};

export { MenuLayout };
