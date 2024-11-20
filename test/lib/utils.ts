export function isLocal(): boolean {
    return (process.env.E2E_ENV_NAME ?? 'local') === 'local';
}
