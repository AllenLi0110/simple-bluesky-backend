import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import * as dotenv from 'dotenv';

dotenv.config();

const OTLP_ENDPOINT = process.env.OTLP_ENDPOINT || 'http://localhost:4318';
const SERVICE_NAME = process.env.SERVICE_NAME || 'simple-bluesky-backend';

console.log(`Initializing tracing with endpoint: ${OTLP_ENDPOINT}`);
console.log(`Service name: ${SERVICE_NAME}`);

const exporter = new OTLPTraceExporter({
  url: `${OTLP_ENDPOINT}/v1/traces`,
  headers: {},
});

const sdk = new NodeSDK({
  serviceName: SERVICE_NAME,
  traceExporter: exporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-http': {
        enabled: true,
        ignoreIncomingRequestHook: (req) => {
          console.log(`Tracing request: ${req.method} ${req.url}`);
          return false;
        },
      },
    }),
  ],
});

export const initTracing = async (): Promise<void> => {
  try {
    console.info('OpenTelemetry tracing initialized with service:', SERVICE_NAME);
    console.info('Tracing endpoint:', OTLP_ENDPOINT);
    await sdk.start();
    console.info('OpenTelemetry SDK started successfully');
  } catch (error) {
    console.error('Error initializing OpenTelemetry:', error);
  }
};

export const shutdownTracing = async (): Promise<void> => {
  try {
    await sdk.shutdown();
    console.info('OpenTelemetry tracing shut down successfully');
  } catch (error) {
    console.error('Error shutting down OpenTelemetry:', error);
  }
};

process.on('SIGTERM', async () => {
  console.info('SIGTERM received, shutting down tracing');
  await shutdownTracing();
});

process.on('SIGINT', async () => {
  console.info('SIGINT received, shutting down tracing');
  await shutdownTracing();
});
