import { DM_Sans, DM_Serif_Display, Inter, Ranga, Roboto } from 'next/font/google';


// define your variable font
// define 2 weights of a non-variable font
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });
const ranga = Ranga({ weight: ['400', '700'], subsets: ['latin'], });
const dmSans = DM_Sans({ weight: ['400', '500', '700'], subsets: ['latin'], variable: "--font-dm-sans" })
const dmSerif = DM_Serif_Display({ weight: ['400'], subsets: ['latin'], variable: "--font-dm-serif" })
const inter = Inter({ subsets: ['latin'] })

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder



export { dmSans, dmSerif, inter, ranga, roboto };
