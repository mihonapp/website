---
title: Common issues
titleTemplate: Troubleshooting - Guides
description: Facing issues with a source or the app? Here's how to tackle common challenges.
---

# Common issues

Facing issues with a source or the app?
Here's how to tackle common challenges.

## Basic issues

### `Cannot Access SD Card`
* Temporarily switch download location from SD card, then revert and restart the app.
* Long filenames trigger this. Android file manager doesn't support **>255** characters.
  * If known, shorten the file/folder name via computer when SD card is connected.
* Else, delete **Mihon** downloads folder on SD card.

### Storage issues with Android 11+
See [this](/docs/faq/storage) section of the FAQ to learn how Scoped Storage affects **Mihon** in **Android 11+** and how to fix it.

### Slow loading
Sources being slow could stem from site slowness, your internet, or source-imposed rate limits/IP bans.

### Reading is laggy
* Caused by oversized images in chapters.
* Free up RAM.
* Use sources with smaller images.

### App not installed
Refer to "[Unable to install the app or extensions](/docs/guides/troubleshooting/#app-or-extension-installation-issues)" section.

## Advanced errors

### `Java.lang Exception: Failed to bypass Cloudflare`
This error indicates the selected source is protected by **Cloudflare**.

Consult the [Cloudflare guide](/docs/guides/troubleshooting/#cloudflare) for solutions.
If issues persist, the source might have high **Cloudflare** protection.

### `Unable to resolve host` / `Connection failed` / `Failed to connect to` / `timeout` / `connection reset`
These errors indicate personal connection issues. Possible causes include:

* Your ISP or router has blocked the site.
* The site is down.
* Weak internet connection.
* App lacks internet access.

Try these solutions:

* Switch between networks (WiFi, mobile data) and try connecting with a VPN.
* Enable **DNS over HTTPS** under <nav to="advanced">.
  * If this is already enabled, change to a different option, or disable the setting for now.
  * Remember to restart the application after changing this setting.
* Check the router's protection settings if possible, otherwise, reboot your router.

::: warning Caution with changing router settings
If you don't understand how or what to change, contact your ISP & ask for assistance before adjusting any settings.
:::

### `java.security.cert.CertPathValidatorException` / `Chain validation failed`
Validation issue with source's certificate.

Try these solutions:

* Check expired certificate, use SSL checker.
* Set correct device date and time.
* In <nav to="advanced">, try **Clear cache** and **Clear cookies**.
* Change network (Wi-Fi, mobile data, VPN).
* Reboot device.

### `Attempt to invoke virtual method 'com.hippo.unifile...'`

Storage-related error causes:

* Storage full, check device/SD Card.
* Grant **Mihon** SD card access in Android settings.
* Download folder access issues, validate paths.
* Corrupted or inaccessible writing drive, verify using a file manager.

## HTTP errors
Encountering HTTP errors? Here's what they mean and how to address them.

### `HTTP Error: 403` - Forbidden
Possible reasons for this error:
* The selected source has Cloudflare protection. Check the [Cloudflare guide](/docs/guides/troubleshooting/#cloudflare) for solutions.
* The source might be down, removed the series, or banned your IP.
  > Open WebView to confirm.

### `HTTP Error: 404` - Not Found
This error likely indicates a down source or removed series.
* Use **WebView** to verify.
  > Consider switching to a different source for the series.

### `HTTP Error: 429` - Too Many Requests
This error suggests the source temporarily banned your IP due to fast downloads/reads.

### `HTTP Error: 5xx`
Errors like `500`, `502`, etc., indicate server-side issues on the source's end.

[Check the source in WebView](/docs/guides/troubleshooting/#accessing-websites-via-webview) to confirm if it's down.

### `HTTP Error: 1006`
This error means a temporary IP ban by the source.

### `HTTP Error: 1020`
This error points to violating a firewall rule set by the site owner.
The owner might raise Cloudflare protection or block IPs from outside their country.

::: warning
For unlisted errors or if instructions don't help, refer to [Diagnosis](/docs/guides/troubleshooting/diagnosis).
:::
