/**
 * Logger utility for K6 load tests
 */

export function logInfo(message) {
  console.log(`ℹ️ [${getTimestamp()}] ${message}`);
}

export function logSuccess(message) {
  console.log(`✅ [${getTimestamp()}] ${message}`);
}

export function logError(message) {
  console.error(`❌ [${getTimestamp()}] ${message}`);
}

export function logWarning(message) {
  console.warn(`⚠️ [${getTimestamp()}] ${message}`);
}

export function logSummary(stats) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`📈 Total Requests: ${stats.http_req_count || 0}`);
  console.log(`✅ Success Rate: ${stats.success_rate || 0}%`);
  console.log(`⏱️  Avg Response Time: ${stats.http_req_duration || 0}ms`);
  console.log(`⏱️  Max Response Time: ${stats.http_req_duration_max || 0}ms`);
  console.log(`📊 Error Rate: ${stats.http_req_failed || 0}%`);
  console.log('='.repeat(60) + '\n');
}

function getTimestamp() {
  return new Date().toISOString();
}