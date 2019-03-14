interface HttpRequestParams {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  timeout?: number;
  body?: string;
  headers?: {[key: string]: string};
}

interface HttpResponse {
  data: Bytes;
  headers: {[key: string]: string};
  status: string;
  statusCode: number;
}

interface HttpModule {
  simpleRequest(config: HttpRequestParams, callback: (err?: string, res?: HttpResponse) => void): void;
}
