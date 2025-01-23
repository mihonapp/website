---
title: Troubleshooting
titleTemplate: Guides
description: Facing source or app issues? Here's how to troubleshoot.
---

# Troubleshooting

Facing source or app issues? Here's how to troubleshoot.

Be sure to check the [Frequently Asked Questions](/docs/faq/general) for how to address common issues too.

## WebView

### Accessing websites via WebView
Once you've entered a source/series, go to <nav to="webview">, or simply press the <nav to="webview-single"> icon directly inside a series.

::: tabs
== From Browse
1. Open **Browse** from the bottom navbar.
2. Tap the desired source.
3. Tap the **WebView** icon in the top toolbar.
4. Complete a **CAPTCHA** if one is shown.
5. Close by tapping `X` at the top-left.
== From a Series
1. Open a series.
2. Tap the **WebView** icon button.
3. Complete a **CAPTCHA** if one is shown.
4. Close by tapping `X` at the top-left.
:::

### Clearing cookies and WebView data
This resets your **WebView** to a clean state, including any login states.

1. Navigate to <nav to="advanced">.
1. Tap **Clear cookies**.
1. Tap **Clear WebView data**.

### WebView update
To update **WebView**, you need to find what **WebView** implementation is used on your device.

Typical default implementation depends on the Android version as follows:

::: tabs
== Android 10 and above
[Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)
== Android 7 - 9
[Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome)
== Android 6 and below
[Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)
:::

::: tip **Android 7** and above
Newer Android users can check/change WebView in [Developer Options](https://developer.android.com/studio/debug/dev-options).
:::

::: warning Caution with Non-Standard WebView
Using non-standard **WebView** (like **Firefox**) might cause **Mihon** to malfunction or crash.

It's best to use the standard [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) or [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome).
:::

## Cloudflare

**Cloudflare**, an anti-bot mechanism, is used by some sources.
Some sources intentionally have higher **Cloudflare** protection to deter apps like **Mihon**.

### Dealing with Cloudflare looping
Certain sources may employ more advanced **Cloudflare** protection, leading to **WebView** continuously reloading when bypassing using the above solution.
If this occurs, try [Accessing the Website via WebView](#accessing-websites-via-webview).

### Changing your user agent
A user agent string shares requester information with websites, potentially affecting **Cloudflare**'s bot detection.
While some sources have specific user agent strings, most rely on the app's default.

::: info Changing your user agent
1. Navigate to <nav to="advanced">.
1. Replace the **Default user agent string** with a different user agent string.
   >    [Here's a reference site](https://www.whatismybrowser.com/guides/the-latest-user-agent/).
   * You can use any user agent strings available in the reference site or by searching online.
   * You may need to try different user agents from different devices, browsers, and/or operating systems.
1. After changing the user agent string, remember to restart the app & check WebView to see if it passes verification.
:::

::: tip Did these methods not work?
Wait for the source to lower its protection or switch to different sources.
:::

## General

### Obtaining crash/error logs
For crash investigations, navigate to <nav to="advanced"> and tap **Dump crash logs**.

![Dump crashlogs](/docs/guides/troubleshooting/dump-crash-logs.dark.webp =512x386)

### Obtaining more logs
To diagnose abnormal app behavior, record device logs using a [Logcat Reader](https://play.google.com/store/apps/details?id=com.dp.logcatapp).

### App or extension installation issues
Encountering problems while trying to install app or extension `.apk` files?
Follow these steps:

1. Install the latest version of [Split APK Installer](https://github.com/Aefyr/SAI/releases) from their GitHub Releases page.
1. Open Split APK Installer, then select and install the `.apk` file.

::: warning
Split APK Installer is not supported on Android 13+
:::

**Split APK Installer** helps show better error messages or may even successfully install your `.apk` without issue.
Common errors include:

::: details `INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package apk.file_name signatures do not match the previously installed version; ignoring!`
Seeing this error while installing means the `.apk` already exists on the device, indicating a mismatch in signatures.
* Backup any data, uninstall the existing app or extension, then attempt to install the `.apk` file again.
:::

::: details `DISPLAY_NAME column is null`
Seeing this error points to a corrupted `.apk`.
Try redownloading the `.apk`.
:::

::: details `INSTALL_FAILED_NO_MATCHING_ABIS`
Seeing this error suggests the `.apk` is incompatible with your CPU architecture.
Obtain the appropriate version or a universal `.apk` (i.e. the option with largest file size on GitHub).
:::
