Write-Host "Starting Recipe Book Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will start at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
node server.js
