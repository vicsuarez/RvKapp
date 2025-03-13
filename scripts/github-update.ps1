# Simple script to update GitHub repository using curl
# You'll need to provide your GitHub Personal Access Token when prompted

# GitHub repository details
$owner = "vicsuarez"
$repo = "RvKapp"
$branch = "main"

# Prompt for GitHub token
$token = Read-Host -Prompt "Enter your GitHub Personal Access Token"

# Function to update a file on GitHub
function Update-GitHubFile {
    param (
        [string]$filePath,
        [string]$repoPath
    )
    
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath" -ForegroundColor Red
        return
    }
    
    # Get file content and encode as base64
    $fileContent = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Content -Path $filePath -Raw)))
    
    # Check if file exists in repo
    $apiUrl = "https://api.github.com/repos/$owner/$repo/contents/$repoPath"
    
    # Get current file (if exists)
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/vnd.github.v3+json"
        "User-Agent" = "PowerShell Script"
    }
    
    try {
        # Try to get the file to see if it exists
        $response = curl.exe -s -H "Authorization: Bearer $token" -H "Accept: application/vnd.github.v3+json" -H "User-Agent: PowerShell Script" $apiUrl
        $fileInfo = $response | ConvertFrom-Json
        $sha = $fileInfo.sha
        
        # File exists, update it
        $body = @{
            message = "Update $repoPath to version 1.2.0"
            content = $fileContent
            sha = $sha
            branch = $branch
        } | ConvertTo-Json -Compress
        
        $updateResponse = curl.exe -s -X PUT -H "Authorization: Bearer $token" -H "Accept: application/vnd.github.v3+json" -H "User-Agent: PowerShell Script" -d "$body" $apiUrl
        Write-Host "Updated $repoPath successfully" -ForegroundColor Green
    }
    catch {
        # File doesn't exist, create it
        $body = @{
            message = "Add $repoPath for version 1.2.0"
            content = $fileContent
            branch = $branch
        } | ConvertTo-Json -Compress
        
        $createResponse = curl.exe -s -X PUT -H "Authorization: Bearer $token" -H "Accept: application/vnd.github.v3+json" -H "User-Agent: PowerShell Script" -d "$body" $apiUrl
        Write-Host "Created $repoPath successfully" -ForegroundColor Green
    }
}

# Files to update
$filesToUpdate = @(
    @{ local = "app.json"; remote = "app.json" },
    @{ local = "package.json"; remote = "package.json" },
    @{ local = "README.md"; remote = "README.md" },
    @{ local = "CHANGELOG.md"; remote = "CHANGELOG.md" }
)

# Update each file
foreach ($file in $filesToUpdate) {
    Write-Host "Processing $($file.local) to $($file.remote)..." -ForegroundColor Yellow
    Update-GitHubFile -filePath $file.local -repoPath $file.remote
}

Write-Host "Basic files updated successfully!" -ForegroundColor Green
Write-Host "Repository updated to version 1.2.0" -ForegroundColor Green
Write-Host "Note: Binary files like images need to be uploaded through the GitHub web interface or GitHub Desktop" -ForegroundColor Yellow 