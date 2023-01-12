// For CSS
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// declare module 'path/to/your/js/or/jsx';

declare module '*.png';

declare module '*.jpeg';
