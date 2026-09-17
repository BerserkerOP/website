import { ImageResponse } from 'next/og';

export const alt = 'HalftoneMotion';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        color: '#111111',
        fontSize: 96,
        fontWeight: 400,
        letterSpacing: '-4px',
      }}>
        HalftoneMotion
      </div>
    ),
    size,
  );
}
