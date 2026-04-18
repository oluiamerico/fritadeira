<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(0);
ini_set('display_errors', 0);
ob_start();

$inputJSON = file_get_contents('php://input');
$payload = json_decode($inputJSON, true);

if (!$payload || !isset($payload['transactionId'], $payload['status'])) {
    ob_clean();
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload']);
    exit;
}

$transactionId = $payload['transactionId'];
$status        = $payload['status'];
$amount        = $payload['amount'] ?? 0;
$payerEmail    = $payload['payer']['email'] ?? '';

$logDir  = __DIR__ . '/logs';
$logFile = $logDir . '/transactions.json';

if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}

$transactions = [];
if (file_exists($logFile)) {
    $transactions = json_decode(file_get_contents($logFile), true) ?: [];
}

$found = false;
foreach ($transactions as &$tx) {
    if ($tx['transaction_id'] === $transactionId) {
        $tx['status']     = strtolower($status);
        $tx['updated_at'] = time();
        $found = true;
        break;
    }
}
unset($tx);

if (!$found) {
    $transactions[] = [
        'transaction_id' => $transactionId,
        'status'         => strtolower($status),
        'amount'         => $amount,
        'payer_email'    => $payerEmail,
        'created_at'     => time(),
        'updated_at'     => time(),
    ];
}

file_put_contents($logFile, json_encode($transactions, JSON_PRETTY_PRINT));

ob_clean();
http_response_code(200);
echo json_encode(['received' => true, 'status' => $status]);
?>
