Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\kanth\.gemini\antigravity\scratch\shreebalaji\logo.jpg")
$bmp = New-Object System.Drawing.Bitmap($img)
$c = $bmp.GetPixel(0, 0)
Write-Host "#$($c.R.ToString('X2'))$($c.G.ToString('X2'))$($c.B.ToString('X2'))"
