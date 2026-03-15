import { Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
const logo = '/logo.webp';

export default function Home() {
  return (
    <Stack width={'100%'} height={'100%'} alignItems="center">
      <Image
        loading={'eager'}
        src={logo}
        alt="Dice Logo"
        width={500}
        height={500}
        className="fade-in-animation"
      />

      <Button variant="contained" className="slide-in-left-animation">
        <Link href={'/dice'}>Start Game</Link>
      </Button>
    </Stack>
  );
}
