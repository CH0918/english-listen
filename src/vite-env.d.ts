/// <reference types="vite/client" />
declare module '*.lrc' {
  const content: string;
  export default content;
}

declare module '*.flac' {
  const content: string;
  export default content;
}
declare module 'virtual:icons/*' {
  import type { SVGProps } from 'react';
  import type React from 'react';
  const component: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  export default component;
}
declare module '~icons/*' {
  import type { SVGProps } from 'react';
  import type React from 'react';
  const component: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  export default component;
}
