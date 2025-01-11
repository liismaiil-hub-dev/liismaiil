import { description, title } from "@/lib/next-seo-config";
import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }) {
    // Font
    const interSemiBold = fetch(
        new URL('./inter.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div>
                    {title}
                </div>
                <div style={{fontSize:32}}>

                    {description}
                </div>
            </div >
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: await interSemiBold,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}