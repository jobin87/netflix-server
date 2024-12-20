// src/types/swagger-ui-express.d.ts
declare module 'swagger-ui-express' {
    import * as express from 'express';
  
    interface SwaggerOptions {
      swaggerDefinition: any;
      apis: string[];
    }
  
    function setup(swaggerDocs: any): express.RequestHandler;
    function serve(req: express.Request, res: express.Response, next: express.NextFunction): void;
  
    export { setup, serve };
  }
  