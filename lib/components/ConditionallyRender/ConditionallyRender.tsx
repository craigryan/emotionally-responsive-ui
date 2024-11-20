import React from 'react';

export type ConditionallyRenderProps = {
    condition: boolean;
    show: React.ReactNode;
    elseShow?: React.ReactNode;
};

export const ConditionallyRender: React.FC<ConditionallyRenderProps> = ({ condition, show, elseShow }) => {
    return <>{condition ? show : elseShow}</>;
};
