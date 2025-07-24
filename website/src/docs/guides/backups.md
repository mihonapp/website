---
title: Backups
titleTemplate: Guides
description: Backups helps you prevent losing your library if something happens.
---

# Backups

Backups can be created to save your library data and app settings.
You can transfer and restore backup files between devices and [endorsed forks](/forks/).

::: tip How to create a backup
1. Go to <nav to="data-and-storage">.
1. Select **Create backup** and choose a location to save it.

![Backup and Restore](/docs/guides/backups/backup.light.webp#light =414x194)

![Backup and Restore](/docs/guides/backups/backup.dark.webp#dark =414x194)
:::

## General backup details

### What is included in a backup?
Backups (with pre-selected items) will contain the following:

#### Library data
- **Library entries**
- **Chapters** - Chapter data for saved entries
- **Tracking** - Trackers added to individual saved entries
- **History** - Read history for saved entries
- **Categories**
- **All read entries** - Keeps unsaved entry data (not included in automatic backups)

#### Settings data
- **App settings**
- **Extension repos**
- **Source settings**
- **Include sensitive settings** - Tracker login tokens (not included by default)

### What is not included in a backup?
- **Extensions**
- **Downloaded chapter files** including [local source](/docs/guides/local-source/) chapters
- **Custom covers** applied to entries

::: tip
To convert your backups to JSON or to view and edit the information outside of the app, you can use [Mihon Backup Viewer](https://github.com/Animeboynz/Mihon-Backup-Viewer).
:::

## Restoring a backup
Restore a compatible backup file in <nav to="data-and-storage">.

::: tip
To ensure a smooth restoration process, remember to:

1. Log into the [Tracking services](/docs/guides/tracking) you previously used.
1. Download any extensions you've used in your backup.

The app will list any missing trackers and/or extensions in the Restore screen.
:::

### Transferring downloads to a new installation
During the setup or after restoring a backup to **Mihon**:
1. In <nav to="data-and-storage">, double-check your specified [Storage location](/docs/faq/storage) that **Mihon** has access to.
1. Transfer or move your previously downloaded chapters into the "downloads" folder of your set Storage location.
1. In <nav to="advanced">, tap on "Reindex downloads" to rescan your downloaded chapters.

## Suggestions for backups

### Enabling automatic backups
It is highly recommended to enable automatic backups to ensure you can recover in case of any issues.

::: tip How to enable automatic backups
1. Go to <nav to="data-and-storage">.
1. Set a **backup frequency** to schedule automatic backups.
- Automatic backup files can be found in your specified [Storage location](/docs/faq/storage)'s "autobackup" folder.
- In case of an error or issue, this allows you to retain a recent copy of your library data.

![Automatic Backups](/docs/guides/backups/automatic_backups.light.webp#light =414x402)

![Automatic Backups](/docs/guides/backups/automatic_backups.dark.webp#dark =414x402)
:::

### Syncing backups with external cloud services
Cross device sync in **Mihon** is not currently available, but users can use
[FolderSync](https://play.google.com/store/apps/details?id=dk.tacit.android.foldersync.lite)
in order to sync backup files to Drive automatically with the following steps:

1. Install the FolderSync app from the link above.
1. Enable [Automatic Backups](/docs/guides/backups#enabling-automatic-backups) and set it to your desired frequency.
1. In the FolderSync app, navigate and select the "autobackup" folder to begin syncing to your preferred cloud service.
1. On your second device, download the latest backup from your cloud service to restore into **Mihon**.

Users who are familiar with [Autosync for Google Drive](https://play.google.com/store/apps/details?id=com.ttxapps.drivesync)
or [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm) can setup auto sync of their backups similarly.

## Additional information for forks

::: warning
This section explores some extra details regarding restoring backups from [forks](/forks/).
:::

All **Mihon** (and **Tachiyomi**) [forks](/forks/) support the `.tachibk`/`.proto.gz` format to backup/restore your library.

### Fork-specific settings
All forks have fork-specific settings and changes that are saved in their Backups. There are some limitations when restoring fork-specific backups:
  > For example: [TachiyomiSY](/forks/TachiyomiSY/) has the option to backup/restore saved searches.
- Forks of forks (such as [TachiyomiJ2K](/forks/TachiyomiJ2K/) and [Yōkai](/forks/Yokai/)) could restore some if not all fork-specific settings, but it is not guaranteed.
- These fork-specific settings will not be restored in **Mihon** and will be lost after restoring.

Only [TachiyomiAZ](/forks/TachiyomiAZ/) supports creating/restoring both legacy `.json` backups and `.proto.gz` backups.
  > Users are recommended to update their `.json` backups to use the improved and efficient `.tachibk`/`.proto.gz` backups.

Be aware of these limitations when dealing with backups in different **Mihon** and **Tachiyomi** forks.
