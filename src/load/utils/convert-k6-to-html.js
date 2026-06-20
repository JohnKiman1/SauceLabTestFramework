/**
 * Convert K6 JSON report to HTML
 * Run: node src/load/utils/convert-k6-to-html.js
 */

const fs = require('fs');
const path = require('path');

const jsonDir = 'reports/load/json';
const htmlDir = 'reports/load/html';

// Ensure HTML directory exists
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

// Read all JSON files
const jsonFiles = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));

if (jsonFiles.length === 0) {
  console.log('⚠️ No JSON reports found. Run a test first: pnpm run test:load:smoke');
  process.exit(1);
}

// Get the latest JSON file
const latestJsonFile = jsonFiles.sort().pop();
const jsonPath = path.join(jsonDir, latestJsonFile);
console.log(`📊 Processing: ${jsonPath}`);

// Read and parse NDJSON (one JSON object per line)
const fileContent = fs.readFileSync(jsonPath, 'utf8');
const lines = fileContent.split('\n').filter(line => line.trim() !== '');

let metrics = {};

for (const line of lines) {
  try {
    const data = JSON.parse(line);
    if (data.type === 'Metric' && data.metric) {
      metrics[data.metric] = data;
    } else if (data.type === 'Point' && data.metric) {
      if (!metrics[data.metric]) {
        metrics[data.metric] = { values: {} };
      }
      if (!metrics[data.metric].values) {
        metrics[data.metric].values = {};
      }
      if (typeof data.data.value === 'number') {
        if (!metrics[data.metric].values.count) {
          metrics[data.metric].values.count = 0;
        }
        metrics[data.metric].values.count += data.data.value;
      }
      metrics[data.metric].values.value = data.data.value;
    }
  } catch (e) {
    // Skip invalid JSON lines
  }
}

// Build a more complete metrics object
const completeMetrics = {
  http_reqs: { values: { count: getMetricValue('http_reqs', metrics) } },
  http_req_duration: { values: { avg: getMetricAvg('http_req_duration', metrics), p95: getMetricP95('http_req_duration', metrics) } },
  http_req_failed: { values: { rate: getMetricValue('http_req_failed', metrics) } },
  iterations: { values: { count: getMetricValue('iterations', metrics) } },
  iteration_duration: { values: { avg: getMetricAvg('iteration_duration', metrics) } },
  browser_data_received: { values: { count: getMetricValue('browser_data_received', metrics) } },
  browser_data_sent: { values: { count: getMetricValue('browser_data_sent', metrics) } },
  browser_http_req_duration: { values: { avg: getMetricAvg('browser_http_req_duration', metrics) } },
  browser_web_vital_lcp: { values: { avg: getMetricAvg('browser_web_vital_lcp', metrics) } },
  browser_web_vital_fcp: { values: { avg: getMetricAvg('browser_web_vital_fcp', metrics) } },
  browser_web_vital_cls: { values: { avg: getMetricAvg('browser_web_vital_cls', metrics) } },
  browser_web_vital_ttfb: { values: { avg: getMetricAvg('browser_web_vital_ttfb', metrics) } },
};

// Helper functions to extract metrics
function getMetricValue(name, metrics) {
  if (!metrics[name]) return 0;
  if (metrics[name].values && metrics[name].values.count) return metrics[name].values.count;
  if (metrics[name].values && metrics[name].values.value) return metrics[name].values.value;
  return 0;
}

function getMetricAvg(name, metrics) {
  if (!metrics[name]) return 0;
  if (metrics[name].values && metrics[name].values.avg) return metrics[name].values.avg;
  if (metrics[name].values && metrics[name].values.value) return metrics[name].values.value;
  return 0;
}

function getMetricP95(name, metrics) {
  if (!metrics[name]) return 0;
  if (metrics[name].values && metrics[name].values['p(95)']) return metrics[name].values['p(95)'];
  return 0;
}

// Generate HTML
const htmlContent = generateHTML(completeMetrics, latestJsonFile);

// ✅ FIX: Write as index.html instead of report.html
const htmlPath = path.join(htmlDir, 'index.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log(`✅ HTML report generated: ${htmlPath}`);
console.log(`📊 Open it: open ${htmlPath}`);

function generateHTML(data, filename) {
  const metrics = data || {};
  
  // Extract metrics
  const totalRequests = metrics.http_reqs?.values?.count || 0;
  const successRate = metrics.http_req_failed?.values?.rate !== undefined ? ((1 - metrics.http_req_failed.values.rate) * 100).toFixed(2) : 100;
  const avgResponse = metrics.http_req_duration?.values?.avg?.toFixed(2) || 0;
  const p95Response = metrics.http_req_duration?.values?.p95?.toFixed(2) || 0;
  const iterations = metrics.iterations?.values?.count || 0;
  const duration = metrics.iteration_duration?.values?.avg?.toFixed(2) || 0;
  
  // Web Vitals
  const lcp = metrics.browser_web_vital_lcp?.values?.avg?.toFixed(2) || 0;
  const fcp = metrics.browser_web_vital_fcp?.values?.avg?.toFixed(2) || 0;
  const cls = metrics.browser_web_vital_cls?.values?.avg?.toFixed(4) || 0;
  const ttfb = metrics.browser_web_vital_ttfb?.values?.avg?.toFixed(2) || 0;
  
  // Status
  const status = successRate >= 95 ? '✅ PASSED' : '❌ FAILED';
  const statusColor = successRate >= 95 ? '#4CAF50' : '#f44336';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>K6 Load Test Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f7fa; padding: 20px; }
    .container { max-width: 1100px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; }
    .header h1 { font-size: 28px; margin-bottom: 5px; }
    .header .subtitle { color: #8892b0; font-size: 14px; }
    .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; background: ${statusColor}; color: white; font-weight: bold; margin-top: 10px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 30px; }
    .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .card .label { font-size: 12px; color: #8892b0; text-transform: uppercase; letter-spacing: 0.5px; }
    .card .value { font-size: 28px; font-weight: bold; color: #1a1a2e; margin-top: 4px; }
    .card .value.small { font-size: 20px; }
    .card .value.green { color: #4CAF50; }
    .card .value.red { color: #f44336; }
    .section { background: white; padding: 24px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 20px; }
    .section h2 { font-size: 18px; color: #1a1a2e; margin-bottom: 16px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #f0f0f0; }
    th { background: #f8f9fa; font-weight: 600; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    td { font-size: 14px; }
    .pass { color: #4CAF50; font-weight: bold; }
    .fail { color: #f44336; font-weight: bold; }
    .footer { margin-top: 30px; text-align: center; color: #8892b0; font-size: 13px; }
    .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge.pass { background: #e8f5e9; color: #4CAF50; }
    .badge.fail { background: #ffebee; color: #f44336; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 K6 Load Test Report</h1>
      <div class="subtitle">File: ${filename} | Generated: ${new Date().toLocaleString()}</div>
      <div class="status-badge">${status}</div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="label">Total Requests</div>
        <div class="value">${totalRequests}</div>
      </div>
      <div class="card">
        <div class="label">Success Rate</div>
        <div class="value green">${successRate}%</div>
      </div>
      <div class="card">
        <div class="label">Avg Response Time</div>
        <div class="value small">${avgResponse}ms</div>
      </div>
      <div class="card">
        <div class="label">95th Percentile</div>
        <div class="value small">${p95Response}ms</div>
      </div>
      <div class="card">
        <div class="label">Iterations</div>
        <div class="value">${iterations}</div>
      </div>
      <div class="card">
        <div class="label">Avg Iteration Duration</div>
        <div class="value small">${duration}ms</div>
      </div>
    </div>

    <div class="section">
      <h2>🌐 Web Vitals</h2>
      <table>
        <tr><th>Metric</th><th>Value</th><th>Status</th></tr>
        <tr>
          <td>LCP (Largest Contentful Paint)</td>
          <td>${lcp}ms</td>
          <td><span class="badge ${lcp < 2500 ? 'pass' : 'fail'}">${lcp < 2500 ? '✅ Good' : '❌ Needs Improvement'}</span></td>
        </tr>
        <tr>
          <td>FCP (First Contentful Paint)</td>
          <td>${fcp}ms</td>
          <td><span class="badge ${fcp < 1800 ? 'pass' : 'fail'}">${fcp < 1800 ? '✅ Good' : '❌ Needs Improvement'}</span></td>
        </tr>
        <tr>
          <td>CLS (Cumulative Layout Shift)</td>
          <td>${cls}</td>
          <td><span class="badge ${cls < 0.1 ? 'pass' : 'fail'}">${cls < 0.1 ? '✅ Good' : '❌ Needs Improvement'}</span></td>
        </tr>
        <tr>
          <td>TTFB (Time to First Byte)</td>
          <td>${ttfb}ms</td>
          <td><span class="badge ${ttfb < 800 ? 'pass' : 'fail'}">${ttfb < 800 ? '✅ Good' : '❌ Needs Improvement'}</span></td>
        </tr>
      </table>
    </div>

    <div class="section">
      <h2>📈 Performance Metrics</h2>
      <table>
        <tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Total HTTP Requests</td><td>${totalRequests}</td></tr>
        <tr><td>Average Response Time</td><td>${avgResponse}ms</td></tr>
        <tr><td>95th Percentile Response Time</td><td>${p95Response}ms</td></tr>
        <tr><td>Average Iteration Duration</td><td>${duration}ms</td></tr>
        <tr><td>Total Iterations</td><td>${iterations}</td></tr>
        <tr><td>Success Rate</td><td>${successRate}%</td></tr>
      </table>
    </div>

    <div class="footer">
      Generated by K6 Load Testing Framework | SauceDemo Test Automation
    </div>
  </div>
</body>
</html>`;
}