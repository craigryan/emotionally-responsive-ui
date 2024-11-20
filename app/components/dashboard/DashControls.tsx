import React from 'react';
import Typography from '@mui/material/Typography';

import { FaceControl } from './face/FaceControl';

const DashControls = () => {
    return (
        <div className="flex flex-col bg-gray-100 p-4">
            <div className="flex-1 bg-white mb-4 p-2 shadow">
                <FaceControl />
            </div>
            <div className="flex-1 bg-white mb-4 p-2 shadow">
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    Voice
                </Typography>
            </div>
            <div className="flex-1 bg-white mb-4 p-2 shadow">
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    Keyboard
                </Typography>
            </div>
        </div>
    );
};

export { DashControls };
