import "./styles.css";
export const metadata = { title: "AttestAI", description: "Verify First. Decide Second." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
