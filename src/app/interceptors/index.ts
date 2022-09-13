import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogResponseTimeInterceptor } from '@/interceptors/log-response-time.interceptor';
import { ErrorInterceptor } from '@/interceptors/error.interceptor';
import { ResponseLimitInterceptor } from '@/interceptors/response-limit.interceptor';

export * from '@/interceptors/log-response-time.interceptor';
export * from '@/interceptors/error.interceptor';
export * from '@/interceptors/response-limit.interceptor';

const provide = HTTP_INTERCEPTORS;
const multi = true;

export const httpInterceptorProviders = [
  { provide, useClass: LogResponseTimeInterceptor, multi },
  { provide, useClass: ErrorInterceptor, multi },
  { provide, useClass: ResponseLimitInterceptor, multi },
];
