import Template from "./template";

import { headers } from "next/headers";

const getInfo = async () => {
  return headers();
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const info = await getInfo();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        list_layout
        <br />
        {/* {JSON.stringify(info)} */}
        {children}
      </body>
    </html>
  );
};

export default Layout;
