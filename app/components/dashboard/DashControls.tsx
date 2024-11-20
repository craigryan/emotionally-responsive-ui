import React from 'react';

import { FaceControl } from './face/FaceControl.tsx';

const DashControls = () => {
    return (
        <div className="flex flex-col h-1/3">
             <FaceControl />
             { /* 
             <VoiceControl />
             <KeyboardControl />
             <ThemeControl />
             */ }
        </div>
    );
};

export { DashControls };
