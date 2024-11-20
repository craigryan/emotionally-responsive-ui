import React from 'react';
import { useTranslations } from 'next-intl';
import Typography from '@mui/material/Typography';

const DesktopOnlyPage = () => {
    const t = useTranslations('DesktopOnly');
      const useDesktop = t.rich('useDesktop', {
        italic: (chunks) => <span className="font-h2 font-normal italic">{chunks}</span>,
    });

    return (
        <div className="flex flex-col justify-between items-center">
            <Typography variant="h1">{useDesktop}</Typography>
        </div>
    );
};

export default DesktopOnlyPage;
