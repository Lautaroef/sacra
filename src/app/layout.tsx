import "../styles/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Sacra</title>
        <meta
          name="description"
          content="Institución educativa para niños con capacidades diferentes"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
