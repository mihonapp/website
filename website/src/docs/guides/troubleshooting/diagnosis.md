---
title: Diagnosis
titleTemplate: Troubleshooting - Guides
description: Facing issues with a source or the app? Follow these steps to troubleshoot and find solutions.
---

# Diagnosis

Facing issues with a source or the app?
Follow these steps to troubleshoot and find solutions.

## Primary diagnosis

1. **Update Extensions**: Check <nav to="extensions"> for updates, no pending updates should be present.
1. **Update App**: Go to <nav to="about"> and tap **Check for updates**.
1. **Manual Series Refresh**: Drag down to manually refresh problematic series.
1. **Test Other Series**: Try different series from the same source.
1. **Update WebView**: Ensure your WebView is current.
1. **Public WebView**: Attempt opening series in public WebView. Wait for CAPTCHA or Cloudflare protection if needed.
1. **Change Connection**: Switch networks (Wi-Fi, mobile data, VPN) and confirm IP change.
1. **Collaborative Check**: Get others to replicate the error.
1. **Source Status**: Verify the source's status in a browser.
1. **Retry Button**: Look for a retry button on the series page.
1. **Advanced Settings**: Under <nav to="advanced">, try these options:
  - Clear Cache
  - Clear Cookies
  - Clear Database
  - DNS over HTTPS
1. **Download Issues**: Delete the queue and retry downloads.
1. **Restart Mihon**: Force close and reopen the app.

If any of these solutions help, go to [Personalized Issue](#personalized-issue).
If it is not just you, go to [Widespread Issue](#widespread-issue).

If none of these solutions help, try asking in our [Discord server](https://discord.gg/mihon).

State your app version and the source, series, and chapter with the problem if it is not listed.

::: tip An extension update may fix your issue
Wait or check for an extension update if you have not already.
There are no ETAs for updates.
:::

## Personalized issue
If you're the only one facing a problem, you might be encountering [Cloudflare](/docs/guides/troubleshooting/#cloudflare) protection, an IP ban, or other countermeasures set by website owners against programs like **Mihon**.

**To minimize future issues:**
- Avoid using downloads with the source.
- Reduce the number of series in your library from that source.

::: warning
These are general guidelines as each site has its specific undisclosed limits and triggers.
:::

## Widespread issue
When everyone experiences a problem, it could be with the extension or app:

1. Check [open issues](https://github.com/mihonapp/mihon/issues).
2. Check [closed issues](https://github.com/mihonapp/mihon/issues?q=is%3Aissue+is%3Aclosed) in case it's resolved but not yet released.
3. If not found, create a new issue.

::: warning
If the site itself is problematic, patience is the only solution until it becomes functional again.
:::
