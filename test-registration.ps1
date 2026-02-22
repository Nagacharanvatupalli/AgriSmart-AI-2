# Test Registration API
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$mobileNumber = "9876543210"

$body = @{
    mobile = $mobileNumber
    password = "TestPassword123"
    profile = @{
        firstName = "John"
        lastName = "Doe"
        age = 35
    }
    location = @{
        state = "Andhra Pradesh"
        district = "Visakhapatnam"
        mandal = "Gajuwaka"
    }
    cropDetails = @{
        cropName = "Paddy"
        startDate = "2026-01-15"
        endDate = "2026-06-15"
        soilReportUrl = ""
    }
} | ConvertTo-Json

Write-Host "Testing Registration API..."
Write-Host "URL: http://localhost:3000/api/auth/register"
Write-Host "Request Body: $body"
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/register" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -UseBasicParsing

    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Response: $($response.Content)"
    Write-Host "Registration test PASSED!"
}
catch {
    $errorResponse = $_.Exception.Response
    if ($errorResponse) {
        Write-Host "Status Code: $($errorResponse.StatusCode)"
        Write-Host "Error Response: $($errorResponse.Content)"
    }
    Write-Host "Registration test response captured"
}

# Test Login API
Write-Host ""
Write-Host "Testing Login API..."

$loginBody = @{
    mobile = $mobileNumber
    password = "TestPassword123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody `
        -UseBasicParsing

    Write-Host "Status Code: $($loginResponse.StatusCode)"
    Write-Host "Response: $($loginResponse.Content)"
    Write-Host "Login test PASSED!"
}
catch {
    $errorResponse = $_.Exception.Response
    if ($errorResponse) {
        Write-Host "Status Code: $($errorResponse.StatusCode)"
    }
    Write-Host "Login test response: $_"
}
