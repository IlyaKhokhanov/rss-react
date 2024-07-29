import { Providers } from '../redux/provider';
import './../index.scss';

export const metadata = {
  title: 'RSS App',
  description: 'RSS App Star Wars Heroes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
