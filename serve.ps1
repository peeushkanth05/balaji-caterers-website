$port = 3000
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host ""
Write-Host "Server running at http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".css"   = "text/css"
    ".js"    = "application/javascript"
    ".json"  = "application/json"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $resp = $context.Response

    $localPath = $req.Url.LocalPath -replace '/', '\'
    if ($localPath -eq '\') { $localPath = '\index.html' }
    $filePath = Join-Path $root $localPath.TrimStart('\')

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $resp.ContentType = $mime
        $resp.ContentLength64 = $bytes.Length
        $resp.StatusCode = 200
        $resp.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "200  $($req.Url.LocalPath)" -ForegroundColor Cyan
    }
    else {
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $($req.Url.LocalPath)")
        $resp.StatusCode = 404
        $resp.ContentType = "text/plain"
        $resp.ContentLength64 = $msg.Length
        $resp.OutputStream.Write($msg, 0, $msg.Length)
        Write-Host "404  $($req.Url.LocalPath)" -ForegroundColor Red
    }
    $resp.OutputStream.Close()
}
