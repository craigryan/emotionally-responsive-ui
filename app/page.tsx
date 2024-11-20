import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const HomePage = () => {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const isDesktop = !/Mobi|Android/i.test(userAgent); // demo only, too simplistic IRL

    if (isDesktop) {
        redirect('/dashboard');
    } else {
        redirect('/desktop-only');
    }
};

export default HomePage;
