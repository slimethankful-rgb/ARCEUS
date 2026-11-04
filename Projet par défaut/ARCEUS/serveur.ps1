# SERVEUR LOCAL ARCEUS — petit serveur HTTP pour tester le site
# Utilisation :  powershell -ExecutionPolicy Bypass -File serveur.ps1
# Puis ouvrir :  http://localhost:8765/index.html
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$prefix = "http://localhost:8765/"
$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".gif"  = "image/gif"
  ".webp" = "image/webp"
  ".pdf"  = "application/pdf"
  ".txt"  = "text/plain; charset=utf-8"
  ".md"   = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try { $listener.Start() } catch {
  Write-Host "Le port 8765 est déjà utilise. Changez le prefixe dans serveur.ps1" -ForegroundColor Red
  exit 1
}
Write-Host "Serveur ARCEUS pret -> $prefix" -ForegroundColor Green
Write-Host "Appuyez sur Ctrl+C pour arreter." -ForegroundColor Yellow

while ($true) {
  $ctx = $listener.GetContext()
  try {
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath).TrimStart('/')
    if ([string]::IsNullOrEmpty($rel)) { $rel = "index.html" }
    $file = Join-Path $root $rel
    if (Test-Path $file -PathType Leaf) {
      $bytes = [IO.File]::ReadAllBytes($file)
      $ext = [IO.Path]::GetExtension($file).ToLower()
      $ctx.Response.ContentType = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" })
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $msg = [Text.Encoding]::UTF8.GetBytes("404 - Fichier introuvable")
      $ctx.Response.StatusCode = 404
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
  } catch {
    try { $ctx.Response.StatusCode = 500 } catch {}
  } finally {
    $ctx.Response.Close()
  }
}
