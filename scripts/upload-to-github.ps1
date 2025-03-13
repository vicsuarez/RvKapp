# GitHub repository details
$owner = "vicsuarez"
$repo = "RvKapp"
$branch = "main"

# GitHub Personal Access Token (you'll need to provide this when running the script)
$token = Read-Host -Prompt "Enter your GitHub Personal Access Token" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Function to upload a file to GitHub
function Upload-FileToGitHub {
    param (
        [string]$filePath,
        [string]$repoPath
    )
    
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath" -ForegroundColor Red
        return
    }
    
    # Get the file content and encode it as base64
    $content = Get-Content -Path $filePath -Raw
    $contentBytes = [System.Text.Encoding]::UTF8.GetBytes($content)
    $contentBase64 = [System.Convert]::ToBase64String($contentBytes)
    
    # Check if the file already exists in the repository
    $fileUrl = "https://api.github.com/repos/$owner/$repo/contents/$repoPath"
    $headers = @{
        "Authorization" = "token $plainToken"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    try {
        $existingFile = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get -ErrorAction SilentlyContinue
        $sha = $existingFile.sha
        
        # Update the file
        $body = @{
            message = "Update $repoPath to version 1.2.0"
            content = $contentBase64
            sha = $sha
            branch = $branch
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Put -Body $body
        Write-Host "Updated $repoPath successfully" -ForegroundColor Green
    }
    catch {
        # Create the file
        $body = @{
            message = "Add $repoPath for version 1.2.0"
            content = $contentBase64
            branch = $branch
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Put -Body $body
        Write-Host "Created $repoPath successfully" -ForegroundColor Green
    }
}

# Files to upload
$filesToUpload = @(
    @{ local = "app.json"; remote = "app.json" },
    @{ local = "package.json"; remote = "package.json" },
    @{ local = "README.md"; remote = "README.md" },
    @{ local = "CHANGELOG.md"; remote = "CHANGELOG.md" },
    @{ local = "assets/images/gold-coin.svg"; remote = "assets/images/gold-coin.svg" },
    @{ local = "assets/images/icon.png"; remote = "assets/images/icon.png" },
    @{ local = "assets/images/adaptive-icon.png"; remote = "assets/images/adaptive-icon.png" },
    @{ local = "assets/images/favicon.png"; remote = "assets/images/favicon.png" },
    @{ local = "assets/images/splash-icon.png"; remote = "assets/images/splash-icon.png" },
    @{ local = "scripts/generate-icons.js"; remote = "scripts/generate-icons.js" },
    @{ local = "app/components/ScanInterface.js"; remote = "app/components/ScanInterface.js" },
    @{ local = "app/(tabs)/scan.tsx"; remote = "app/(tabs)/scan.tsx" }
)

# Upload each file
foreach ($file in $filesToUpload) {
    Write-Host "Uploading $($file.local) to $($file.remote)..." -ForegroundColor Yellow
    Upload-FileToGitHub -filePath $file.local -repoPath $file.remote
}

Write-Host "All files uploaded successfully!" -ForegroundColor Green
Write-Host "Repository updated to version 1.2.0" -ForegroundColor Green 