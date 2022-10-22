const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'http://192.168.3.30:5503';
// export const server = 'http://localhost:3000' ;

